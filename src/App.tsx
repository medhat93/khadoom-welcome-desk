import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/hooks/useLanguage";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import HostDashboard from "./pages/host/Dashboard";
import AddProperty from "./pages/host/AddProperty";
import PropertyDetails from "./pages/host/PropertyDetails";
import UnitDetails from "./pages/host/UnitDetails";
import GuestCheckIn from "./pages/guest/CheckIn";
import GuestDashboard from "./pages/guest/Dashboard";
import GuestCheckOut from "./pages/guest/CheckOut";
import AdminDashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Host Routes */}
              <Route path="/host/dashboard" element={<HostDashboard />} />
              <Route path="/host/add-property" element={<AddProperty />} />
              <Route path="/host/property/:id" element={<PropertyDetails />} />
              <Route path="/host/unit/:id" element={<UnitDetails />} />
              
              {/* Guest Routes */}
              <Route path="/guest/checkin/:unitId" element={<GuestCheckIn />} />
              <Route path="/guest/dashboard" element={<GuestDashboard />} />
              <Route path="/guest/checkout" element={<GuestCheckOut />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
