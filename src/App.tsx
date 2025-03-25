
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Discussions from "./pages/Discussions";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import Trending from "./pages/Trending";
import Support from "./pages/Support";
import SignIn from "./pages/SignIn";
import Waitlist from "./pages/Waitlist";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/support" element={<Support />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/waitlist" element={<Waitlist />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
