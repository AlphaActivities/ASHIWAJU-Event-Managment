/*
# Webhook secrets table for netlify-webhook edge function

## Purpose
Stores a shared secret used to authenticate incoming Netlify webhook requests.
The edge function reads this using the service role key (which bypasses RLS).
No other role can read this table — only the service role / postgres.

## Tables Created
- `webhook_secrets`
  - `id` (int, primary key, always 1 — singleton)
  - `secret` (text, not null — the shared secret value)
  - `label` (text — human-readable description)
  - `is_active` (boolean, default true — allows rotation without deletion)
  - `created_at` (timestamptz)

## Security
- RLS enabled, no policies — no role (anon, authenticated) can read or write.
- Only the service role (used by the edge function) bypasses RLS.
- No PII stored — just a cryptographic secret.

## Important Notes
- This table is separate from the CRM schema's nine tables — it doesn't modify them.
- The secret is generated cryptographically and inserted by this migration.
- To rotate: insert a new row with is_active=true, set old row is_active=false.
*/

CREATE TABLE IF NOT EXISTS webhook_secrets (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  secret text NOT NULL,
  label text NOT NULL DEFAULT 'netlify_webhook',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE webhook_secrets ENABLE ROW LEVEL SECURITY;

-- No policies — only service role can access (bypasses RLS)

REVOKE ALL ON webhook_secrets FROM anon;
REVOKE ALL ON webhook_secrets FROM authenticated;

INSERT INTO webhook_secrets (id, secret, label, is_active)
VALUES (1, '7562c90b5a3da0774a46e3f57cbae10c77c0f8842ae10d7e177f3d1307ac53d7', 'netlify_webhook', true)
ON CONFLICT (id) DO NOTHING;
