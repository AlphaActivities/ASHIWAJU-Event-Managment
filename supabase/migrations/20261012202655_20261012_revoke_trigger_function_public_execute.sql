/*
  # Revoke PUBLIC EXECUTE on update_updated_at trigger function

  ## Purpose
  The update_updated_at() trigger function was created with default PUBLIC
  EXECUTE grants (Supabase auto-grants these). While the function is NOT
  SECURITY DEFINER (it runs as the caller, not the owner) and only sets
  NEW.updated_at = now(), it's best practice to restrict execution to
  authenticated only. The trigger fires on table UPDATE operations which
  already require authenticated access via RLS.

  ## Function Affected
  - public.update_updated_at() — trigger function, NOT SECURITY DEFINER

  ## Security Changes
  - REVOKE EXECUTE FROM PUBLIC and anon
  - GRANT EXECUTE TO authenticated (already had it, but explicit)
*/

REVOKE EXECUTE ON FUNCTION public.update_updated_at() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_updated_at() FROM anon;
GRANT EXECUTE ON FUNCTION public.update_updated_at() TO authenticated;
