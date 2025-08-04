
-- Insert dummy profiles
INSERT INTO public.profiles (id, user_id, display_name, email, is_anonymous) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Alice Smith', 'alice.smith@example.com', FALSE),
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'Bob Johnson', 'bob.johnson@example.com', FALSE),
('c2d3e4f5-a6b7-c8d9-e0f1-2a3b4c5d6e7f', 'c2d3e4f5-a6b7-c8d9-e0f1-2a3b4c5d6e7f', 'Charlie Brown', 'charlie.brown@example.com', FALSE),
('d3e4f5a6-b7c8-d9e0-f1a2-3b4c5d6e7f8a', 'd3e4f5a6-b7c8-d9e0-f1a2-3b4c5d6e7f8a', 'Anonymous User', NULL, TRUE);

-- Insert dummy discussions
INSERT INTO public.discussions (id, title, content, author_id, category_id, is_anonymous, anonymous_name, view_count, comment_count, upvote_count, downvote_count, created_at, updated_at) VALUES
('disc1-1234-5678-90ab-cdef12345678', 'How to manage daily stress?', 'I often feel overwhelmed by daily stress. What are some effective coping mechanisms you use?', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', (SELECT id FROM public.categories WHERE name = 'Anxiety'), FALSE, NULL, 150, 5, 20, 1, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
('disc2-1234-5678-90ab-cdef12345678', 'My journey with depression', 'Sharing my story in hopes of helping others. It''s been a long road, but there''s light.', 'b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', (SELECT id FROM public.categories WHERE name = 'Depression'), FALSE, NULL, 300, 12, 50, 2, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
('disc3-1234-5678-90ab-cdef12345678', 'Anonymous: Seeking self-care tips', 'Feeling burnt out. Any simple self-care routines that actually work?', 'd3e4f5a6-b7c8-d9e0-f1a2-3b4c5d6e7f8a', (SELECT id FROM public.categories WHERE name = 'Self-Care'), TRUE, 'Anonymous Helper', 80, 3, 10, 0, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
('disc4-1234-5678-90ab-cdef12345678', 'The importance of mindfulness', 'Mindfulness has transformed my perspective. What are your favorite mindfulness exercises?', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', (SELECT id FROM public.categories WHERE name = 'Mindfulness'), FALSE, NULL, 200, 8, 35, 0, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
('disc5-1234-5678-90ab-cdef12345678', 'Building healthy relationships', 'Struggling with communication in my relationships. Any advice on building stronger bonds?', 'c2d3e4f5-a6b7-c8d9-e0f1-2a3b4c5d6e7f', (SELECT id FROM public.categories WHERE name = 'Relationships'), FALSE, NULL, 120, 6, 18, 1, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days');

-- Insert dummy comments (including nested comments for infinite hierarchy)
INSERT INTO public.comments (id, discussion_id, author_id, parent_comment_id, content, is_anonymous, anonymous_name, upvote_count, downvote_count, created_at, updated_at) VALUES
('comm1-1234-5678-90ab-cdef12345678', 'disc1-1234-5678-90ab-cdef12345678', 'b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', NULL, 'Deep breathing exercises help me a lot!', FALSE, NULL, 5, 0, NOW() - INTERVAL '4 days 2 hours', NOW() - INTERVAL '4 days 2 hours'),
('comm2-1234-5678-90ab-cdef12345678', 'disc1-1234-5678-90ab-cdef12345678', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'comm1-1234-5678-90ab-cdef12345678', 'I''ll try that! Thanks for the suggestion.', FALSE, NULL, 2, 0, NOW() - INTERVAL '4 days 1 hour', NOW() - INTERVAL '4 days 1 hour'),
('comm3-1234-5678-90ab-cdef12345678', 'disc1-1234-5678-90ab-cdef12345678', 'c2d3e4f5-a6b7-c8d9-e0f1-2a3b4c5d6e7f', NULL, 'Mindfulness meditation is a game-changer for stress.', FALSE, NULL, 8, 1, NOW() - INTERVAL '3 days 10 hours', NOW() - INTERVAL '3 days 10 hours'),
('comm4-1234-5678-90ab-cdef12345678', 'disc1-1234-5678-90ab-cdef12345678', 'd3e4f5a6-b7c8-d9e0-f1a2-3b4c5d6e7f8a', 'comm3-1234-5678-90ab-cdef12345678', 'Anonymous: I agree! Even 5 minutes helps.', TRUE, 'Anonymous Supporter', 3, 0, NOW() - INTERVAL '3 days 8 hours', NOW() - INTERVAL '3 days 8 hours'),
('comm5-1234-5678-90ab-cdef12345678', 'disc2-1234-5678-90ab-cdef12345678', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NULL, 'Your story is inspiring. Thank you for sharing.', FALSE, NULL, 10, 0, NOW() - INTERVAL '6 days 5 hours', NOW() - INTERVAL '6 days 5 hours');

-- Insert dummy votes
INSERT INTO public.votes (user_id, target_id, target_type, vote_type) VALUES
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'disc1-1234-5678-90ab-cdef12345678', 'discussion', 'upvote'),
('c2d3e4f5-a6b7-c8d9-e0f1-2a3b4c5d6e7f', 'disc1-1234-5678-90ab-cdef12345678', 'discussion', 'upvote'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'disc2-1234-5678-90ab-cdef12345678', 'discussion', 'upvote'),
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'comm1-1234-5678-90ab-cdef12345678', 'comment', 'upvote');
