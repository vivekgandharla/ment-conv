-- Insert dummy data for categories
INSERT INTO public.categories (id, name, description, color) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Anxiety & Stress', 'Discussions about managing anxiety and stress in daily life', '#3B82F6'),
('550e8400-e29b-41d4-a716-446655440002', 'Depression Support', 'Safe space for sharing experiences with depression', '#8B5CF6'),
('550e8400-e29b-41d4-a716-446655440003', 'Relationship & Social', 'Discussions about relationships and social connections', '#EC4899'),
('550e8400-e29b-41d4-a716-446655440004', 'Self Care', 'Tips and discussions about self-care practices', '#10B981'),
('550e8400-e29b-41d4-a716-446655440005', 'Therapy & Treatment', 'Discussions about therapy experiences and treatments', '#F59E0B'),
('550e8400-e29b-41d4-a716-446655440006', 'Work & Study Stress', 'Managing mental health in work and academic environments', '#EF4444');

-- Insert dummy data for discussions
INSERT INTO public.discussions (id, title, content, author_id, category_id, is_anonymous, anonymous_name, view_count, comment_count, upvote_count, downvote_count) VALUES
('550e8400-e29b-41d4-a716-446655440011', 'How do you cope with overwhelming anxiety?', 'I''ve been struggling with anxiety lately and wondering what techniques work best for others. I''ve tried breathing exercises but looking for more strategies.', NULL, '550e8400-e29b-41d4-a716-446655440001', true, 'AnxiousButHopeful', 45, 8, 12, 1),
('550e8400-e29b-41d4-a716-446655440012', 'Daily meditation practice - sharing my journey', 'Started meditating 30 days ago and wanted to share how it''s been helping with my mental health. The changes have been subtle but meaningful.', NULL, '550e8400-e29b-41d4-a716-446655440004', true, 'MindfulSeeker', 67, 15, 23, 2),
('550e8400-e29b-41d4-a716-446655440013', 'Feeling isolated at work - anyone else?', 'Working remotely has been tough for my social connections. Feeling more isolated than ever. How do others handle this?', NULL, '550e8400-e29b-41d4-a716-446655440006', true, 'RemoteWorker123', 38, 6, 9, 0),
('550e8400-e29b-41d4-a716-446655440014', 'First therapy session - what to expect?', 'I''ve finally decided to start therapy but feeling nervous about the first session. Any advice from those who''ve been through this?', NULL, '550e8400-e29b-41d4-a716-446655440005', true, 'NewToTherapy', 92, 12, 18, 1),
('550e8400-e29b-41d4-a716-446655440015', 'Small wins in depression recovery', 'Wanted to share some small victories I''ve had this week. Sometimes the little things matter most in recovery.', NULL, '550e8400-e29b-41d4-a716-446655440002', true, 'ProgressMaker', 156, 24, 34, 3),
('550e8400-e29b-41d4-a716-446655440016', 'Setting boundaries with family', 'Learning to set healthy boundaries has been challenging but necessary for my mental health. Sharing my experience.', NULL, '550e8400-e29b-41d4-a716-446655440003', true, 'BoundaryBuilder', 78, 18, 21, 2);

-- Insert dummy data for comments
INSERT INTO public.comments (id, discussion_id, content, author_id, is_anonymous, anonymous_name, upvote_count, downvote_count, parent_comment_id) VALUES
('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440011', 'Have you tried the 4-7-8 breathing technique? It really helps me during panic attacks.', NULL, true, 'BreathingHelper', 5, 0, NULL),
('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440011', 'Grounding exercises work well for me - naming 5 things you can see, 4 you can touch, etc.', NULL, true, 'GroundedMind', 8, 0, NULL),
('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440011', 'This is exactly what I needed to hear today. Thank you for sharing!', NULL, true, 'GratefulReader', 3, 0, '550e8400-e29b-41d4-a716-446655440021'),
('550e8400-e29b-41d4-a716-446655440024', '550e8400-e29b-41d4-a716-446655440012', 'Your progress is inspiring! I''ve been thinking about starting meditation myself.', NULL, true, 'Inspired123', 4, 0, NULL),
('550e8400-e29b-41d4-a716-446655440025', '550e8400-e29b-41d4-a716-446655440015', 'Every small step counts! Proud of you for sharing your wins.', NULL, true, 'CheerleaderSpirit', 6, 0, NULL),
('550e8400-e29b-41d4-a716-446655440026', '550e8400-e29b-41d4-a716-446655440015', 'This gives me hope for my own journey. Thank you for the positivity!', NULL, true, 'HopefulHeart', 4, 0, NULL);

-- Insert dummy data for resources
INSERT INTO public.resources (id, title, description, url, resource_type, category_id, author_id, rating, rating_count, view_count, is_approved, difficulty_level, tags) VALUES
('550e8400-e29b-41d4-a716-446655440031', 'Understanding Anxiety: A Comprehensive Guide', 'An in-depth article about the science behind anxiety and practical coping strategies.', 'https://example.com/anxiety-guide', 'article', '550e8400-e29b-41d4-a716-446655440001', NULL, 4.5, 23, 145, true, 'beginner', ARRAY['anxiety', 'coping', 'mental health']),
('550e8400-e29b-41d4-a716-446655440032', 'Meditation for Beginners - 10 Minute Practice', 'A guided meditation video perfect for those starting their mindfulness journey.', 'https://example.com/meditation-video', 'video', '550e8400-e29b-41d4-a716-446655440004', NULL, 4.8, 67, 234, true, 'beginner', ARRAY['meditation', 'mindfulness', 'self-care']),
('550e8400-e29b-41d4-a716-446655440033', 'The Happiness Podcast Episode 15', 'Discussion about finding joy in small moments during difficult times.', 'https://example.com/happiness-podcast', 'podcast', '550e8400-e29b-41d4-a716-446655440002', NULL, 4.2, 34, 189, true, 'intermediate', ARRAY['happiness', 'depression', 'recovery']),
('550e8400-e29b-41d4-a716-446655440034', 'Daily Gratitude Journal Exercise', 'A simple but powerful exercise to cultivate gratitude and positive thinking.', 'https://example.com/gratitude-exercise', 'exercise', '550e8400-e29b-41d4-a716-446655440004', NULL, 4.6, 45, 178, true, 'beginner', ARRAY['gratitude', 'journaling', 'positivity']),
('550e8400-e29b-41d4-a716-446655440035', 'Feeling Good: The New Mood Therapy', 'A classic book on cognitive behavioral therapy techniques for depression and anxiety.', 'https://example.com/feeling-good-book', 'book', '550e8400-e29b-41d4-a716-446655440005', NULL, 4.7, 89, 267, true, 'intermediate', ARRAY['CBT', 'therapy', 'self-help']),
('550e8400-e29b-41d4-a716-446655440036', 'Mental Health First Aid Guidelines', 'Official guidelines for providing mental health first aid to someone in crisis.', 'https://example.com/mental-health-first-aid', 'link', '550e8400-e29b-41d4-a716-446655440005', NULL, 4.4, 56, 203, true, 'advanced', ARRAY['crisis', 'support', 'emergency']);

-- Insert dummy data for FAQs
INSERT INTO public.faqs (id, question, answer, category, display_order) VALUES
('550e8400-e29b-41d4-a716-446655440041', 'Is my information kept private and secure?', 'Yes, we take privacy very seriously. All discussions can be anonymous, and we never share personal information without consent. Our platform uses end-to-end encryption for all communications.', 'privacy', 1),
('550e8400-e29b-41d4-a716-446655440042', 'How do I post anonymously?', 'When creating a discussion or comment, simply toggle the "Post Anonymously" option. You can choose an anonymous username that will be displayed instead of your real name.', 'posting', 2),
('550e8400-e29b-41d4-a716-446655440043', 'What should I do if I''m having a mental health crisis?', 'If you''re in immediate danger, please contact emergency services (911) or a crisis hotline. Our platform is for peer support and should not replace professional mental health care.', 'crisis', 3),
('550e8400-e29b-41d4-a716-446655440044', 'How do I find a therapist in my area?', 'While we don''t provide direct therapy services, our Resources section includes links to therapist directories and mental health services. Always consult with qualified professionals for treatment.', 'therapy', 4),
('550e8400-e29b-41d4-a716-446655440045', 'Can I delete my posts and comments?', 'Yes, you can delete your own posts and comments at any time. Once deleted, they cannot be recovered, so please be sure before removing content.', 'posting', 5),
('550e8400-e29b-41d4-a716-446655440046', 'How does the expert verification system work?', 'Mental health professionals can apply for verification by submitting their credentials. Verified experts have a special badge and can provide professional insights while following our community guidelines.', 'experts', 6);