/*
  # Create Three Administrator Auth Accounts

  ## Purpose
  The auth.users table is empty. Three administrator accounts are required
  for Phase 1.5. This migration creates them with bcrypt-encrypted temporary
  passwords. The users should change their passwords on first login.

  ## Accounts Created
  1. ashiwajueventmanagement@gmail.com
  2. yourcustomerflowguy@gmail.com
  3. emmanuelsamereburu@gmail.com

  ## Security
  - Passwords are bcrypt-hashed using crypt() from pgcrypto
  - email_confirmed_at is set to now() (email confirmation is OFF per project config)
  - aud is set to 'authenticated'
  - role is set to 'authenticated'
  - is_sso_user is false
  - is_anonymous is false
  - Each user gets a random UUID via gen_random_uuid()
  - confirmed_at is a generated column (derived from email_confirmed_at), not set directly
*/

INSERT INTO auth.users (
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  is_sso_user,
  is_anonymous
)
SELECT
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  email,
  crypt(password, gen_salt('bf', 10)),
  now(),
  '{}'::jsonb,
  '{}'::jsonb,
  false,
  now(),
  now(),
  false,
  false
FROM (VALUES
  ('ashiwajueventmanagement@gmail.com', 'Ashiwaju@Admin2026!'),
  ('yourcustomerflowguy@gmail.com', 'CustomerFlow@2026!'),
  ('emmanuelsamereburu@gmail.com', 'Emmanuel@Admin2026!')
) AS t(email, password)
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users au WHERE au.email = t.email
);
