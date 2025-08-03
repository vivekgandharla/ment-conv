-- Create waitlist table
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  phone TEXT,
  interest TEXT,
  source TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on waitlist
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create support tickets table
CREATE TABLE public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('technical', 'billing', 'general', 'bug', 'feature')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on support_tickets
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Create support responses table
CREATE TABLE public.support_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  is_staff_response BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on support_responses
ALTER TABLE public.support_responses ENABLE ROW LEVEL SECURITY;

-- Create expert verification table
CREATE TABLE public.expert_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  profession TEXT NOT NULL,
  credentials TEXT NOT NULL,
  experience_years INTEGER NOT NULL,
  license_number TEXT,
  organization TEXT,
  website TEXT,
  linkedin_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on expert_verifications
ALTER TABLE public.expert_verifications ENABLE ROW LEVEL SECURITY;

-- Create moderator applications table
CREATE TABLE public.moderator_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  experience TEXT NOT NULL,
  motivation TEXT NOT NULL,
  availability_hours INTEGER NOT NULL,
  previous_moderation_experience BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on moderator_applications
ALTER TABLE public.moderator_applications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for waitlist
CREATE POLICY "Waitlist entries are viewable by authenticated users" 
ON public.waitlist FOR SELECT 
TO authenticated USING (true);

CREATE POLICY "Anyone can join waitlist" 
ON public.waitlist FOR INSERT 
WITH CHECK (true);

-- Create RLS policies for support_tickets
CREATE POLICY "Users can view their own tickets" 
ON public.support_tickets FOR SELECT 
TO authenticated
USING (auth.uid() = user_id OR auth.uid() IN (
  SELECT user_id FROM public.profiles WHERE display_name = 'admin'
));

CREATE POLICY "Users can create support tickets" 
ON public.support_tickets FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own tickets" 
ON public.support_tickets FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Create RLS policies for support_responses
CREATE POLICY "Users can view responses to their tickets" 
ON public.support_responses FOR SELECT 
TO authenticated
USING (ticket_id IN (
  SELECT id FROM public.support_tickets WHERE user_id = auth.uid()
) OR auth.uid() IN (
  SELECT user_id FROM public.profiles WHERE display_name = 'admin'
));

CREATE POLICY "Users can create responses to their tickets" 
ON public.support_responses FOR INSERT 
TO authenticated
WITH CHECK (ticket_id IN (
  SELECT id FROM public.support_tickets WHERE user_id = auth.uid()
));

-- Create RLS policies for expert_verifications
CREATE POLICY "Users can view their own verification" 
ON public.expert_verifications FOR SELECT 
TO authenticated
USING (auth.uid() = user_id OR auth.uid() IN (
  SELECT user_id FROM public.profiles WHERE display_name = 'admin'
));

CREATE POLICY "Users can create verification requests" 
ON public.expert_verifications FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own verification" 
ON public.expert_verifications FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Create RLS policies for moderator_applications
CREATE POLICY "Users can view their own application" 
ON public.moderator_applications FOR SELECT 
TO authenticated
USING (auth.uid() = user_id OR auth.uid() IN (
  SELECT user_id FROM public.profiles WHERE display_name = 'admin'
));

CREATE POLICY "Users can create moderator applications" 
ON public.moderator_applications FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own application" 
ON public.moderator_applications FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_waitlist_updated_at
  BEFORE UPDATE ON public.waitlist
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at
  BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_expert_verifications_updated_at
  BEFORE UPDATE ON public.expert_verifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_moderator_applications_updated_at
  BEFORE UPDATE ON public.moderator_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create increment and decrement functions for vote counting
CREATE OR REPLACE FUNCTION public.increment(value INTEGER DEFAULT 1)
RETURNS INTEGER
LANGUAGE SQL
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT value;
$$;

CREATE OR REPLACE FUNCTION public.decrement(value INTEGER DEFAULT 1)
RETURNS INTEGER
LANGUAGE SQL
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT -value;
$$;

-- Create function to increment view count
CREATE OR REPLACE FUNCTION public.increment_view_count(discussion_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.discussions 
  SET view_count = view_count + 1 
  WHERE id = discussion_id;
END;
$$; 