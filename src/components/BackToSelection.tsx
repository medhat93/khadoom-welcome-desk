import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BackToSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on the role selection page itself
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => navigate('/')}
        variant="default"
        size="icon"
        className="w-12 h-12 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 border-2 border-blue-600 hover:scale-110 transition-all duration-200 text-white"
        title="Back to Role Selection"
      >
        <Home className="w-5 h-5 text-white" />
      </Button>
    </div>
  );
};

export default BackToSelection;