-- Add motivation toggle preference to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS motivation_enabled boolean NOT NULL DEFAULT true;

-- Quiz attempts log (for stats + heatmap)
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  department_id text NOT NULL,
  specialty_name text NOT NULL,
  total_questions integer NOT NULL DEFAULT 0,
  correct_answers integer NOT NULL DEFAULT 0,
  score_percentage integer NOT NULL DEFAULT 0,
  duration_seconds integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Quiz attempts selectable by owner"
  ON public.quiz_attempts FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Quiz attempts insertable by owner"
  ON public.quiz_attempts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Quiz attempts deletable by owner"
  ON public.quiz_attempts FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_date
  ON public.quiz_attempts(user_id, created_at DESC);
