/*
  # Revoke Default Anon Grants on CRM Tables

  ## Purpose
  Supabase automatically grants SELECT, INSERT, UPDATE, DELETE to the anon role
  when tables are created. Although RLS policies block anon from accessing any
  rows (no anon policies exist on CRM tables), the table structure is still
  discoverable via the GraphQL schema. This migration revokes all anon
  privileges on the nine CRM tables and the active_clients view to eliminate
  that discoverability.

  Also revokes unnecessary INSERT/UPDATE/DELETE grants from authenticated on
  admin_profiles (only SELECT is needed — admin rows are inserted via SQL,
  not through the data API).

  ## Tables Affected
  - admin_profiles, brides, form_submissions, lead_status_history,
    lead_notes, clarity_sessions, follow_ups, activity_events, sync_events
  - active_clients (view)

  ## Security Changes
  - REVOKE all privileges FROM anon on all CRM tables and the view
  - REVOKE INSERT, UPDATE, DELETE FROM authenticated on admin_profiles
  - No changes to guide_downloads

  ## Important Notes
  - This does NOT affect any RLS policies — policies remain as-is
  - This does NOT affect any column-level grants — those remain as-is
  - guide_downloads is NOT touched
  - The service role (used by future Edge Functions) bypasses all grants
*/

-- Revoke all anon privileges on CRM tables
REVOKE ALL ON admin_profiles FROM anon;
REVOKE ALL ON brides FROM anon;
REVOKE ALL ON form_submissions FROM anon;
REVOKE ALL ON lead_status_history FROM anon;
REVOKE ALL ON lead_notes FROM anon;
REVOKE ALL ON clarity_sessions FROM anon;
REVOKE ALL ON follow_ups FROM anon;
REVOKE ALL ON activity_events FROM anon;
REVOKE ALL ON sync_events FROM anon;

-- Revoke all anon privileges on the active_clients view
REVOKE ALL ON active_clients FROM anon;

-- Revoke unnecessary authenticated write privileges on admin_profiles
-- (only SELECT is needed — admin rows are inserted via SQL by the project owner)
REVOKE INSERT ON admin_profiles FROM authenticated;
REVOKE UPDATE ON admin_profiles FROM authenticated;
REVOKE DELETE ON admin_profiles FROM authenticated;

-- Revoke unnecessary authenticated DELETE on brides, clarity_sessions, follow_ups
-- (no DELETE policies exist, but revoke the grant as belt-and-suspenders)
REVOKE DELETE ON brides FROM authenticated;
REVOKE DELETE ON clarity_sessions FROM authenticated;
REVOKE DELETE ON follow_ups FROM authenticated;
