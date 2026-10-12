/*
  # Ashiwaju CRM Schema — Phase 1 Database Foundation

  ## Purpose
  Create the complete normalized CRM schema for Ashiwaju Event Management.
  This migration creates nine tables, one view, four SECURITY DEFINER functions,
  triggers, indexes, RLS policies, and column-level privilege restrictions.

  ## Tables Created

  1. admin_profiles — Server-enforced allowlist of authorized administrator user IDs
  2. brides — Central CRM entity, one per real person, with soft-delete support
  3. form_submissions — Immutable original form submissions, linkable to brides
  4. lead_status_history — Write-once status transition audit trail
  5. lead_notes — Append-only private notes with author identification
  6. clarity_sessions — Appointments with reschedule/cancel history
  7. follow_ups — Task tracking with due dates and completion state
  8. activity_events — Shared audit log for every CRM change
  9. sync_events — Webhook and import deduplication ledger (no PII)

  ## View Created
  - active_clients — Filters brides where current_status = 'converted_to_client'

  ## Functions Created (all SECURITY DEFINER, SET search_path = public)
  - is_crm_admin() — Checks if auth.uid() exists in admin_profiles
  - update_bride_status() — Atomic status change with history and activity log
  - link_submission_to_bride() — Audited linking/relinking of submissions to brides
  - complete_follow_up() — Marks a follow-up complete with authorship from session

  ## Security
  - RLS enabled on all nine tables
  - All CRM table policies use is_crm_admin() — no anon access
  - Authorship columns (created_by, changed_by, completed_by) defaulted to auth.uid()
    and protected by column-level INSERT/UPDATE revocation
  - brides.current_status UPDATE revoked — only update_bride_status() can change it
  - form_submissions: no UPDATE, no DELETE — truly immutable
  - lead_notes: no UPDATE, no DELETE — append-only
  - lead_status_history: no UPDATE, no DELETE — write-once
  - activity_events: no UPDATE, no DELETE — write-once
  - sync_events: no DELETE — ledger is permanent (cleanup via future scheduled function)
  - All SECURITY DEFINER functions: REVOKE EXECUTE FROM PUBLIC and FROM anon,
    GRANT EXECUTE TO authenticated only

  ## Important Notes
  - guide_downloads table is NOT modified in any way
  - No admin accounts are created — admin_profiles starts empty
  - With admin_profiles empty, all CRM tables return zero rows to everyone (secure default)
  - Service-role ingestion (future Edge Function) bypasses RLS and does not need auth.uid()
  - form_submissions includes both original_submitted_at and created_at to distinguish
    historical submission time from CRM insertion time
  - sync_events stores no PII — no payload column, only metadata and linkage
*/

-- ============================================================
-- 1. SEQUENCE for bride codes (ASH-00001 format)
-- ============================================================
CREATE SEQUENCE IF NOT EXISTS bride_code_seq START 1;

-- ============================================================
-- 2. TABLES
-- ============================================================

-- 2a. admin_profiles — allowlist of authorized administrators
CREATE TABLE IF NOT EXISTS admin_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  display_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2b. brides — central CRM entity
CREATE TABLE IF NOT EXISTS brides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bride_code text UNIQUE NOT NULL DEFAULT ('ASH-' || lpad(nextval('bride_code_seq')::text, 5, '0')),
  first_name text,
  last_name text,
  email text,
  phone text,
  wedding_date date,
  current_status text NOT NULL DEFAULT 'new'
    CHECK (current_status IN ('new', 'contacted', 'session_booked', 'session_completed', 'converted_to_client', 'closed_not_proceeding')),
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

-- 2c. form_submissions — immutable original submissions
CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bride_id uuid REFERENCES brides(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  preferred_contact_method text,
  preferred_session_date date,
  wedding_date date,
  planned_budget text,
  guest_size text,
  source text NOT NULL DEFAULT 'netlify_form',
  source_id text,
  original_submitted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(source, source_id)
);

-- 2d. lead_status_history — write-once status transitions
CREATE TABLE IF NOT EXISTS lead_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bride_id uuid NOT NULL REFERENCES brides(id) ON DELETE RESTRICT,
  old_status text CHECK (old_status IN ('new', 'contacted', 'session_booked', 'session_completed', 'converted_to_client', 'closed_not_proceeding')),
  new_status text NOT NULL CHECK (new_status IN ('new', 'contacted', 'session_booked', 'session_completed', 'converted_to_client', 'closed_not_proceeding')),
  changed_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id),
  changed_at timestamptz NOT NULL DEFAULT now()
);

-- 2e. lead_notes — append-only private notes
CREATE TABLE IF NOT EXISTS lead_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bride_id uuid NOT NULL REFERENCES brides(id) ON DELETE RESTRICT,
  note text NOT NULL,
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2f. clarity_sessions — appointments with reschedule history
CREATE TABLE IF NOT EXISTS clarity_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bride_id uuid NOT NULL REFERENCES brides(id) ON DELETE RESTRICT,
  scheduled_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'scheduled'
    CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  method text CHECK (method IN ('phone', 'video', 'in_person')),
  location text,
  notes text,
  replaces_session_id uuid REFERENCES clarity_sessions(id) ON DELETE SET NULL,
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2g. follow_ups — task tracking
CREATE TABLE IF NOT EXISTS follow_ups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bride_id uuid NOT NULL REFERENCES brides(id) ON DELETE RESTRICT,
  description text NOT NULL,
  due_date timestamptz NOT NULL,
  completed_at timestamptz,
  completed_by uuid REFERENCES auth.users(id),
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2h. activity_events — shared audit log
CREATE TABLE IF NOT EXISTS activity_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bride_id uuid REFERENCES brides(id) ON DELETE RESTRICT,
  event_type text NOT NULL,
  description text,
  metadata jsonb,
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2i. sync_events — webhook/import deduplication ledger (no PII)
CREATE TABLE IF NOT EXISTS sync_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL,
  source_id text NOT NULL,
  status text NOT NULL DEFAULT 'received'
    CHECK (status IN ('received', 'processed', 'failed', 'duplicate')),
  form_submission_id uuid REFERENCES form_submissions(id) ON DELETE SET NULL,
  error_message text,
  processed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(source, source_id)
);

-- ============================================================
-- 3. INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_brides_email ON brides(email);
CREATE INDEX IF NOT EXISTS idx_brides_phone ON brides(phone);
CREATE INDEX IF NOT EXISTS idx_brides_current_status ON brides(current_status);
CREATE INDEX IF NOT EXISTS idx_brides_created_at ON brides(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_brides_deleted_at ON brides(deleted_at);

CREATE INDEX IF NOT EXISTS idx_form_submissions_bride_id ON form_submissions(bride_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_original_submitted_at ON form_submissions(original_submitted_at DESC);

CREATE INDEX IF NOT EXISTS idx_lead_status_history_bride_id ON lead_status_history(bride_id);
CREATE INDEX IF NOT EXISTS idx_lead_status_history_changed_at ON lead_status_history(changed_at DESC);

CREATE INDEX IF NOT EXISTS idx_lead_notes_bride_id ON lead_notes(bride_id);
CREATE INDEX IF NOT EXISTS idx_lead_notes_created_at ON lead_notes(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_clarity_sessions_bride_id ON clarity_sessions(bride_id);
CREATE INDEX IF NOT EXISTS idx_clarity_sessions_scheduled_at ON clarity_sessions(scheduled_at DESC);

CREATE INDEX IF NOT EXISTS idx_follow_ups_bride_id ON follow_ups(bride_id);
CREATE INDEX IF NOT EXISTS idx_follow_ups_due_date ON follow_ups(due_date);
CREATE INDEX IF NOT EXISTS idx_follow_ups_completed_at ON follow_ups(completed_at);

CREATE INDEX IF NOT EXISTS idx_activity_events_bride_id ON activity_events(bride_id);
CREATE INDEX IF NOT EXISTS idx_activity_events_created_at ON activity_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_events_event_type ON activity_events(event_type);

CREATE INDEX IF NOT EXISTS idx_sync_events_source ON sync_events(source);
CREATE INDEX IF NOT EXISTS idx_sync_events_created_at ON sync_events(created_at DESC);

-- ============================================================
-- 4. TRIGGER — auto-update updated_at on brides and clarity_sessions
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_brides_updated_at ON brides;
CREATE TRIGGER trg_brides_updated_at
  BEFORE UPDATE ON brides
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS trg_clarity_sessions_updated_at ON clarity_sessions;
CREATE TRIGGER trg_clarity_sessions_updated_at
  BEFORE UPDATE ON clarity_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- 5. SECURITY DEFINER FUNCTIONS
-- ============================================================

-- 5a. is_crm_admin() — checks if the current authenticated user is in admin_profiles
CREATE OR REPLACE FUNCTION public.is_crm_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE admin_profiles.user_id = auth.uid()
  );
$$;

REVOKE EXECUTE ON FUNCTION public.is_crm_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_crm_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_crm_admin() TO authenticated;

-- 5b. update_bride_status() — atomic status change with history and activity log
CREATE OR REPLACE FUNCTION public.update_bride_status(
  p_bride_id uuid,
  p_new_status text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_old_status text;
  v_admin_id uuid := auth.uid();
BEGIN
  -- Authorize the caller
  IF NOT public.is_crm_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  -- Validate the new status
  IF p_new_status NOT IN ('new', 'contacted', 'session_booked', 'session_completed', 'converted_to_client', 'closed_not_proceeding') THEN
    RAISE EXCEPTION 'Invalid status value';
  END IF;

  -- Read current status
  SELECT current_status INTO v_old_status
  FROM public.brides
  WHERE id = p_bride_id AND deleted_at IS NULL;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Bride not found';
  END IF;

  -- Skip if no change
  IF v_old_status = p_new_status THEN
    RETURN;
  END IF;

  -- Update the bride's status
  UPDATE public.brides
  SET current_status = p_new_status
  WHERE id = p_bride_id;

  -- Insert status history
  INSERT INTO public.lead_status_history (bride_id, old_status, new_status, changed_by)
  VALUES (p_bride_id, v_old_status, p_new_status, v_admin_id);

  -- Insert activity event
  INSERT INTO public.activity_events (bride_id, event_type, description, metadata, created_by)
  VALUES (
    p_bride_id,
    'status_change',
    'Status changed from ' || COALESCE(v_old_status, '(none)') || ' to ' || p_new_status,
    jsonb_build_object('old_status', v_old_status, 'new_status', p_new_status),
    v_admin_id
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.update_bride_status(uuid, text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_bride_status(uuid, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.update_bride_status(uuid, text) TO authenticated;

-- 5c. link_submission_to_bride() — audited linking/relinking of submissions
CREATE OR REPLACE FUNCTION public.link_submission_to_bride(
  p_submission_id uuid,
  p_bride_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_old_bride_id uuid;
  v_new_bride_id uuid := NULL;
  v_admin_id uuid := auth.uid();
BEGIN
  -- Authorize the caller
  IF NOT public.is_crm_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  -- Validate bride exists and is not deleted (if p_bride_id is not null)
  IF p_bride_id IS NOT NULL THEN
    SELECT id INTO v_new_bride_id
    FROM public.brides
    WHERE id = p_bride_id AND deleted_at IS NULL;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Bride not found or deleted';
    END IF;
  END IF;

  -- Read current bride_id
  SELECT bride_id INTO v_old_bride_id
  FROM public.form_submissions
  WHERE id = p_submission_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Submission not found';
  END IF;

  -- Update only the bride_id column — no other field is touched
  UPDATE public.form_submissions
  SET bride_id = p_bride_id
  WHERE id = p_submission_id;

  -- Insert activity event for audit trail
  INSERT INTO public.activity_events (bride_id, event_type, description, metadata, created_by)
  VALUES (
    COALESCE(p_bride_id, v_old_bride_id),
    'submission_linked',
    'Submission linked to bride profile',
    jsonb_build_object(
      'submission_id', p_submission_id,
      'old_bride_id', v_old_bride_id,
      'new_bride_id', p_bride_id
    ),
    v_admin_id
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.link_submission_to_bride(uuid, uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.link_submission_to_bride(uuid, uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.link_submission_to_bride(uuid, uuid) TO authenticated;

-- 5d. complete_follow_up() — marks a follow-up as complete
CREATE OR REPLACE FUNCTION public.complete_follow_up(
  p_follow_up_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_bride_id uuid;
  v_admin_id uuid := auth.uid();
BEGIN
  -- Authorize the caller
  IF NOT public.is_crm_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  -- Read the follow-up
  SELECT bride_id INTO v_bride_id
  FROM public.follow_ups
  WHERE id = p_follow_up_id AND completed_at IS NULL;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Follow-up not found or already completed';
  END IF;

  -- Mark as complete
  UPDATE public.follow_ups
  SET completed_at = now(), completed_by = v_admin_id
  WHERE id = p_follow_up_id;

  -- Insert activity event
  INSERT INTO public.activity_events (bride_id, event_type, description, metadata, created_by)
  VALUES (
    v_bride_id,
    'follow_up_completed',
    'Follow-up marked as complete',
    jsonb_build_object('follow_up_id', p_follow_up_id),
    v_admin_id
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.complete_follow_up(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.complete_follow_up(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.complete_follow_up(uuid) TO authenticated;

-- ============================================================
-- 6. ENABLE RLS ON ALL TABLES
-- ============================================================
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brides ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE clarity_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_events ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 7. RLS POLICIES
-- All CRM tables: authenticated admins only, no anon access.
-- Only brides has deleted_at; SELECT policies on brides filter it.
-- Other tables do not reference deleted_at.
-- ============================================================

-- 7a. admin_profiles — admins can read the allowlist; no one can write via API
-- (rows are inserted via SQL by the project owner, not through the data API)
DROP POLICY IF EXISTS "admin_profiles_select" ON admin_profiles;
CREATE POLICY "admin_profiles_select"
  ON admin_profiles FOR SELECT
  TO authenticated
  USING (public.is_crm_admin());

-- 7b. brides — full CRUD for admins, soft-deleted excluded from SELECT
DROP POLICY IF EXISTS "brides_select" ON brides;
CREATE POLICY "brides_select"
  ON brides FOR SELECT
  TO authenticated
  USING (public.is_crm_admin() AND deleted_at IS NULL);

DROP POLICY IF EXISTS "brides_insert" ON brides;
CREATE POLICY "brides_insert"
  ON brides FOR INSERT
  TO authenticated
  WITH CHECK (public.is_crm_admin());

DROP POLICY IF EXISTS "brides_update" ON brides;
CREATE POLICY "brides_update"
  ON brides FOR UPDATE
  TO authenticated
  USING (public.is_crm_admin())
  WITH CHECK (public.is_crm_admin());

-- No DELETE policy on brides — no deletes through the data API

-- 7c. form_submissions — read and insert for admins; no UPDATE, no DELETE
DROP POLICY IF EXISTS "form_submissions_select" ON form_submissions;
CREATE POLICY "form_submissions_select"
  ON form_submissions FOR SELECT
  TO authenticated
  USING (public.is_crm_admin());

DROP POLICY IF EXISTS "form_submissions_insert" ON form_submissions;
CREATE POLICY "form_submissions_insert"
  ON form_submissions FOR INSERT
  TO authenticated
  WITH CHECK (public.is_crm_admin());

-- No UPDATE policy — immutable
-- No DELETE policy — immutable

-- 7d. lead_status_history — read for admins; insert only via update_bride_status()
-- No direct INSERT policy — history is written by the SECURITY DEFINER function only
DROP POLICY IF EXISTS "lead_status_history_select" ON lead_status_history;
CREATE POLICY "lead_status_history_select"
  ON lead_status_history FOR SELECT
  TO authenticated
  USING (public.is_crm_admin());

-- No INSERT policy (function writes via SECURITY DEFINER, bypassing RLS)
-- No UPDATE policy — write-once
-- No DELETE policy — write-once

-- 7e. lead_notes — read and insert for admins; no UPDATE, no DELETE
DROP POLICY IF EXISTS "lead_notes_select" ON lead_notes;
CREATE POLICY "lead_notes_select"
  ON lead_notes FOR SELECT
  TO authenticated
  USING (public.is_crm_admin());

DROP POLICY IF EXISTS "lead_notes_insert" ON lead_notes;
CREATE POLICY "lead_notes_insert"
  ON lead_notes FOR INSERT
  TO authenticated
  WITH CHECK (public.is_crm_admin());

-- No UPDATE policy — append-only
-- No DELETE policy — append-only

-- 7f. clarity_sessions — read, insert, limited update for admins
DROP POLICY IF EXISTS "clarity_sessions_select" ON clarity_sessions;
CREATE POLICY "clarity_sessions_select"
  ON clarity_sessions FOR SELECT
  TO authenticated
  USING (public.is_crm_admin());

DROP POLICY IF EXISTS "clarity_sessions_insert" ON clarity_sessions;
CREATE POLICY "clarity_sessions_insert"
  ON clarity_sessions FOR INSERT
  TO authenticated
  WITH CHECK (public.is_crm_admin());

DROP POLICY IF EXISTS "clarity_sessions_update" ON clarity_sessions;
CREATE POLICY "clarity_sessions_update"
  ON clarity_sessions FOR UPDATE
  TO authenticated
  USING (public.is_crm_admin())
  WITH CHECK (public.is_crm_admin());

-- No DELETE policy

-- 7g. follow_ups — read, insert, limited update for admins
DROP POLICY IF EXISTS "follow_ups_select" ON follow_ups;
CREATE POLICY "follow_ups_select"
  ON follow_ups FOR SELECT
  TO authenticated
  USING (public.is_crm_admin());

DROP POLICY IF EXISTS "follow_ups_insert" ON follow_ups;
CREATE POLICY "follow_ups_insert"
  ON follow_ups FOR INSERT
  TO authenticated
  WITH CHECK (public.is_crm_admin());

DROP POLICY IF EXISTS "follow_ups_update" ON follow_ups;
CREATE POLICY "follow_ups_update"
  ON follow_ups FOR UPDATE
  TO authenticated
  USING (public.is_crm_admin())
  WITH CHECK (public.is_crm_admin());

-- No DELETE policy

-- 7h. activity_events — read for admins; insert via SECURITY DEFINER functions
DROP POLICY IF EXISTS "activity_events_select" ON activity_events;
CREATE POLICY "activity_events_select"
  ON activity_events FOR SELECT
  TO authenticated
  USING (public.is_crm_admin());

DROP POLICY IF EXISTS "activity_events_insert" ON activity_events;
CREATE POLICY "activity_events_insert"
  ON activity_events FOR INSERT
  TO authenticated
  WITH CHECK (public.is_crm_admin());

-- No UPDATE policy — write-once
-- No DELETE policy — write-once

-- 7i. sync_events — read for admins; insert for admins; no DELETE
DROP POLICY IF EXISTS "sync_events_select" ON sync_events;
CREATE POLICY "sync_events_select"
  ON sync_events FOR SELECT
  TO authenticated
  USING (public.is_crm_admin());

DROP POLICY IF EXISTS "sync_events_insert" ON sync_events;
CREATE POLICY "sync_events_insert"
  ON sync_events FOR INSERT
  TO authenticated
  WITH CHECK (public.is_crm_admin());

DROP POLICY IF EXISTS "sync_events_update" ON sync_events;
CREATE POLICY "sync_events_update"
  ON sync_events FOR UPDATE
  TO authenticated
  USING (public.is_crm_admin())
  WITH CHECK (public.is_crm_admin());

-- No DELETE policy — ledger is permanent

-- ============================================================
-- 8. COLUMN-LEVEL PRIVILEGE RESTRICTIONS
-- Prevent forging of authorship columns and status bypass.
-- ============================================================

-- brides: revoke direct UPDATE on current_status and created_by
-- (current_status changes only via update_bride_status())
REVOKE UPDATE ON brides FROM authenticated;
GRANT UPDATE (first_name, last_name, email, phone, wedding_date, deleted_at) ON brides TO authenticated;

-- form_submissions: no UPDATE at all (RLS already blocks it, but revoke as belt-and-suspenders)
REVOKE UPDATE ON form_submissions FROM authenticated;
REVOKE DELETE ON form_submissions FROM authenticated;

-- lead_status_history: no INSERT/UPDATE/DELETE from clients (function writes via SECURITY DEFINER)
REVOKE INSERT ON lead_status_history FROM authenticated;
REVOKE UPDATE ON lead_status_history FROM authenticated;
REVOKE DELETE ON lead_status_history FROM authenticated;

-- lead_notes: revoke INSERT on created_by (database fills it from auth.uid())
REVOKE INSERT ON lead_notes FROM authenticated;
GRANT INSERT (bride_id, note) ON lead_notes TO authenticated;
REVOKE UPDATE ON lead_notes FROM authenticated;
REVOKE DELETE ON lead_notes FROM authenticated;

-- clarity_sessions: revoke INSERT on created_by; limit UPDATE to non-authorship columns
REVOKE INSERT ON clarity_sessions FROM authenticated;
GRANT INSERT (bride_id, scheduled_at, status, method, location, notes, replaces_session_id) ON clarity_sessions TO authenticated;
REVOKE UPDATE ON clarity_sessions FROM authenticated;
GRANT UPDATE (scheduled_at, status, method, location, notes) ON clarity_sessions TO authenticated;

-- follow_ups: revoke INSERT on created_by and completed_by; limit UPDATE
REVOKE INSERT ON follow_ups FROM authenticated;
GRANT INSERT (bride_id, description, due_date) ON follow_ups TO authenticated;
REVOKE UPDATE ON follow_ups FROM authenticated;
-- completed_at and completed_by are set only via complete_follow_up() function
-- No direct UPDATE grant on follow_ups — admins use the function

-- activity_events: revoke direct INSERT/UPDATE/DELETE (functions write via SECURITY DEFINER)
-- But allow INSERT for events that admins might log directly (e.g., custom notes)
REVOKE INSERT ON activity_events FROM authenticated;
GRANT INSERT (bride_id, event_type, description, metadata) ON activity_events TO authenticated;
REVOKE UPDATE ON activity_events FROM authenticated;
REVOKE DELETE ON activity_events FROM authenticated;

-- sync_events: revoke DELETE (ledger is permanent); limit UPDATE to status fields
REVOKE DELETE ON sync_events FROM authenticated;
REVOKE UPDATE ON sync_events FROM authenticated;
GRANT UPDATE (status, form_submission_id, error_message, processed_at) ON sync_events TO authenticated;

-- ============================================================
-- 9. ACTIVE CLIENTS VIEW
-- ============================================================
CREATE OR REPLACE VIEW active_clients AS
SELECT
  id,
  bride_code,
  first_name,
  last_name,
  email,
  phone,
  wedding_date,
  current_status,
  created_at,
  updated_at
FROM brides
WHERE current_status = 'converted_to_client' AND deleted_at IS NULL;

ALTER VIEW active_clients SET (security_invoker = true);

-- ============================================================
-- 10. GRANT SELECT ON VIEW
-- ============================================================
GRANT SELECT ON active_clients TO authenticated;