import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthHeader = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
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

        {/* Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">
            {t('home')}
          </a>
          <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
            {t('features')}
          </a>
          <a href="#packages" className="text-muted-foreground hover:text-primary transition-colors">
            {t('packages')}
          </a>
        </nav>

        {/* Actions */}
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
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/login')}
          >
            {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </Button>
          
          <Button 
            variant="cta" 
            size="lg"
            onClick={() => navigate('/signup')}
            className="font-semibold"
          >
            {language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;