
import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Index from "./pages/Index";
import Discussions from "./pages/Discussions";
import Resources from "./pages/Resources";
import Trending from "./pages/Trending";
import Support from "./pages/Support";
import Auth from "./pages/Auth";
import Waitlist from "./pages/Waitlist";
import Profile from "./pages/Profile";
import ExpertVerification from "./pages/ExpertVerification";
import ModeratorApplication from "./pages/ModeratorApplication";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/support" element={<Support />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/expert-verification" element={<ExpertVerification />} />
        <Route path="/moderator-application" element={<ModeratorApplication />} />
        <Route path="/test" element={<Test />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
