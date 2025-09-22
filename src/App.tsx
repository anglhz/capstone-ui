import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/ui/app-shell";
import Index from "./pages/Index";
import Accounts from "./pages/Accounts";
import Snapshots from "./pages/Snapshots";
import NewSnapshot from "./pages/NewSnapshot";
import Reports from "./pages/Reports";
import YearReport from "./pages/YearReport";
import MonthReport from "./pages/MonthReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/snapshots" element={<Snapshots />} />
            <Route path="/snapshots/new" element={<NewSnapshot />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/:year" element={<YearReport />} />
            <Route path="/reports/:year/:month" element={<MonthReport />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
