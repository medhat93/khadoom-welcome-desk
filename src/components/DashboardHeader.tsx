import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Home, Building, Users, Settings, LogOut, Languages } from "lucide-react";

const DashboardHeader = () => {
  const { language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const translations = {
    ar: {
      dashboard: 'لوحة التحكم',
      properties: 'العقارات',
      guests: 'الضيوف',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج'
    },
    en: {
      dashboard: 'Dashboard',
      properties: 'Properties',
      guests: 'Guests',
      settings: 'Settings',
      logout: 'Logout'
    }
  };

  const t = (key: keyof typeof translations.ar) => translations[language][key];

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img 
            src="/lovable-uploads/0021118a-4c14-4f0c-816f-352a1afb1196.png" 
            alt="Khadoom Logo" 
            className="h-8 w-auto"
          />
          <div className="text-xl font-bold text-primary">خدوم</div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/host/dashboard')}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Home className="h-4 w-4" />
            <span>{t('dashboard')}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/host/properties')}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Building className="h-4 w-4" />
            <span>{t('properties')}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/host/guests')}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Users className="h-4 w-4" />
            <span>{t('guests')}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/host/settings')}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Settings className="h-4 w-4" />
            <span>{t('settings')}</span>
          </Button>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Languages className="h-4 w-4" />
            <span>{language === 'ar' ? 'EN' : 'العربية'}</span>
          </Button>

          <div className="text-sm text-muted-foreground">
            {user?.name}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <LogOut className="h-4 w-4" />
            <span>{t('logout')}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;