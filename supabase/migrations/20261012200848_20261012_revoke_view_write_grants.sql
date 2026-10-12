/*
  # Revoke Unnecessary Write Grants on active_clients View

  ## Purpose
  Supabase auto-grants INSERT, UPDATE, DELETE on views to the authenticated role.
  The active_clients view is read-only — it filters brides by status.
  Revoke all privileges except SELECT from authenticated.

  ## View Affected
  - active_clients

  ## Security Changes
  - REVOKE INSERT, UPDATE, DELETE ON active_clients FROM authenticated
*/

REVOKE INSERT ON active_clients FROM authenticated;
REVOKE UPDATE ON active_clients FROM authenticated;
REVOKE DELETE ON active_clients FROM authenticated;
