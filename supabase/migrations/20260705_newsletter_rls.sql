-- Allow public newsletter signups from the frontend
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'newsletter_subscribers'
      AND policyname = 'Allow public newsletter subscription'
  ) THEN
    CREATE POLICY "Allow public newsletter subscription"
      ON public.newsletter_subscribers
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'newsletter_subscribers'
      AND policyname = 'Allow admins to manage newsletter subscribers'
  ) THEN
    CREATE POLICY "Allow admins to manage newsletter subscribers"
      ON public.newsletter_subscribers
      FOR ALL
      TO authenticated
      USING (auth.role() = 'authenticated')
      WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;
