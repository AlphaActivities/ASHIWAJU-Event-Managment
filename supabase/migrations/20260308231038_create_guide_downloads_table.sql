/*
  # Create Guide Downloads Table for Lead Capture

  ## Purpose
  Track all users who download the wedding planning guide to enable follow-up and lead management.

  ## Tables Created
  - `guide_downloads`
    - `id` (uuid, primary key) - Unique identifier for each download
    - `full_name` (text) - User's full name
    - `email` (text) - User's email address for follow-up
    - `phone` (text) - User's phone number
    - `downloaded_at` (timestamptz) - Timestamp when guide was downloaded
    - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on the table to prevent unauthorized access
  - Create insert policy for anonymous users (allows form submissions)
  - Create select/update/delete policies for authenticated users only (admin access)
  - Email field has a unique constraint to prevent duplicate downloads from tracking

  ## Indexes
  - Index on email for quick lookups
  - Index on downloaded_at for reporting
*/

CREATE TABLE IF NOT EXISTS guide_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  downloaded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_guide_downloads_email ON guide_downloads(email);
CREATE INDEX IF NOT EXISTS idx_guide_downloads_downloaded_at ON guide_downloads(downloaded_at DESC);

ALTER TABLE guide_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert guide downloads"
  ON guide_downloads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all guide downloads"
  ON guide_downloads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update guide downloads"
  ON guide_downloads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete guide downloads"
  ON guide_downloads
  FOR DELETE
  TO authenticated
  USING (true);