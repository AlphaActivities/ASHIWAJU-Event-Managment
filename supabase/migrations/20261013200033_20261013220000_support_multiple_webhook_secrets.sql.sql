ALTER TABLE webhook_secrets DROP CONSTRAINT webhook_secrets_id_check;
ALTER TABLE webhook_secrets DROP CONSTRAINT webhook_secrets_pkey;
ALTER TABLE webhook_secrets ADD COLUMN IF NOT EXISTS new_id uuid PRIMARY KEY DEFAULT gen_random_uuid();
ALTER TABLE webhook_secrets DROP COLUMN id;
ALTER TABLE webhook_secrets RENAME COLUMN new_id TO id;
