# MentConv — Mental Health Community Platform

MentConv is a web-based mental health discussion platform that aims to connect individuals across the globe to talk about their mental health challenges, share experiences, seek support, and access reliable resources. It empowers users through anonymity, organized discussion, moderation, and expert involvement — fostering a safe, inclusive, and informative environment for mental wellness.

---

## 🌟 Project Vision

* **Tagline**: "Your voice. Your space. Mental health matters."
* **Mission**: Build a supportive, community-driven hub where people can freely express their struggles and connect with others facing similar experiences.
* **Target Audience**: Teens, adults, and professionals looking for mental health support, peer interaction, and verified information.
* **Key Differentiators**:

  * Reddit-like voting and threads
  * Anonymity options
  * Mental health resource sharing
  * Expert & moderator verification workflows

---

## 🏗️ Technical Architecture

* **Frontend**: React + TypeScript + Tailwind CSS (UI framework)
* **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
* **State Management**: React Query / Zustand (planned)
* **Routing**: React Router
* **Font**: Noto Sans
* **Design Aesthetic**: Minimalist, mental-health friendly, green-screen color palette

---

## 🎨 Design System

* **Primary Color**: #6DD56E, #A5D6A7 (calm, green tones)
* **Typography**: Noto Sans Serif (clarity + accessibility)
* **UI Components**: Custom-designed using Tailwind, motion components
* **Animations**: Framer Motion planned for smooth transitions
* **Mobile Responsive**: Yes, using Tailwind's grid and flex utilities

---

## ⚙️ Feature Overview

### ✅ Completed Features

* Landing page & routing
* Supabase auth integration
* User profiles table (editable)

### 🔄 In Progress

* Discussion system with:

  * Upvotes / Downvotes
  * Nested comments
  * Categories (e.g., anxiety, burnout, relationships)

### 🧩 Planned

* Anonymous posting toggle
* Resource library with curated mental health articles/videos
* Mood tracker with AI suggestions
* Expert/Moderator application & verification
* Support ticket system

---

## 🗃️ Database Schema (Supabase)

### Tables:

1. `profiles`: Stores user info, bios, image, roles (user, mod, expert)
2. `discussions`: Title, body, created\_by, category\_id, timestamp
3. `comments`: Parent-child threaded comments, author\_id, discussion\_id
4. `votes`: Handles upvotes/downvotes for posts and comments
5. `categories`: Anxiety, Depression, Burnout, etc.
6. `resources`: Mental health articles, links, videos
7. `applications`: For moderator or expert role applications
8. `tickets`: Support requests from users

### RLS (Row-Level Security)

* Enabled for all tables
* Authenticated users can read/write their data
* Moderators & experts have scoped access

---

## 🧪 Dev Environment Setup

```bash
# 1. Clone repository
https://github.com/your-org/mentconv.git

# 2. Install dependencies
yarn install

# 3. Set up `.env`
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# 4. Run dev server
yarn dev
```

---

## 🧭 Execution Plan & Development Flow

### 📌 Phase 1: Setup & Auth ✅

* Project scaffolding
* Supabase integration & roles
* Auth UI + onboarding screen

### 📌 Phase 2: Community Threads (WIP)

* Create discussions
* Upvote/downvote logic
* Commenting with nesting

### 📌 Phase 3: User Profiles & Verification

* Editable profiles with avatars
* Apply for moderator/expert role

### 📌 Phase 4: Support & Resources

* Submit support tickets
* Add verified resources (blogs, YouTube, PDFs)

### 📌 Phase 5: Mood & Mental State Tracking

* Mood input, emoji chart, simple analysis
* (Optional) AI-generated tips based on input

### 📌 Phase 6: UI Polish & Mobile View

* Animation, responsiveness, dark/light mode

---

## 🔐 Privacy & Safety

* RLS policies prevent data leakage
* Anonymous threads protected from user tracing
* Reporting system for harmful content (planned)
* Moderator escalation workflows

---

## 🚀 Future Roadmap

* Native mobile app (Flutter or Expo + Supabase)
* AI integrations for smart moderation + therapy suggestions
* Language translation support (for global users)
* Community health analytics dashboard

---

## 🤝 Contributing

Contributions are welcome! Please fork, commit, and raise PRs. For discussions, check the `/discussions` section in GitHub.

---

## 📬 Contact & Support

For ideas, suggestions, or mental health resources you’d like to share, contact the team via [support@mentconv.org](mailto:support@mentconv.org)

---

This `README.md` was designed to help developers, designers, and stakeholders understand the entire vision, architecture, and plan for the **MentConv** platform. Let's build a safe, empowering space together. 💚
