-- create_emails_table.sql
-- Run this in the Supabase SQL editor (SQL -> New query)

-- 1) Create table
CREATE TABLE IF NOT EXISTS public.emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- 2) Enable Row Level Security (RLS)
ALTER TABLE public.emails ENABLE ROW LEVEL SECURITY;

-- 3) Permissive policy to allow anonymous inserts from the client
-- WARNING: this allows anyone (including unauthenticated users) to insert rows.
-- Use only for simple public waitlists. For production, restrict with auth checks.
CREATE POLICY "Allow public inserts" ON public.emails
  FOR INSERT
  USING (true)
  WITH CHECK (true);

-- 4) Example of a safer policy allowing only authenticated users to insert:
-- CREATE POLICY "Allow authenticated inserts" ON public.emails
--   FOR INSERT
--   USING (auth.uid() IS NOT NULL)
--   WITH CHECK (auth.uid() IS NOT NULL);

-- 5) Optional: Grant the anon role explicit INSERT permission (usually not needed when policy exists)
-- GRANT INSERT ON public.emails TO anon;
