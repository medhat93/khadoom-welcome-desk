import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Shield } from 'lucide-react';

const Login = () => {
  const { t, language } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(formData.email, formData.password, 'host');
      
      if (success) {
        toast({
          title: language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Login successful',
          description: language === 'ar' ? 'مرحباً بك في خدوم' : 'Welcome to Khadom'
        });
        
        // Navigate to host dashboard
        navigate('/host/dashboard');
      } else {
        toast({
          title: language === 'ar' ? 'خطأ في تسجيل الدخول' : 'Login failed',
          description: language === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'حدث خطأ أثناء تسجيل الدخول' : 'An error occurred during login',
        variant: 'destructive'
      });
    }
    
    setLoading(false);
  };

  const translations = {
    ar: {
      title: 'تسجيل الدخول',
      subtitle: 'للمالكين والمضيفين',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      login: 'تسجيل الدخول',
      noAccount: 'ليس لديك حساب؟',
      signup: 'إنشاء حساب جديد',
      nafathVerify: 'التحقق عبر نفاذ',
      demoCredentials: 'بيانات تجريبية'
    },
    en: {
      title: 'Sign In',
      subtitle: 'For Property Owners & Hosts',
      email: 'Email',
      password: 'Password',
      login: 'Sign In',
      noAccount: "Don't have an account?",
      signup: 'Sign up',
      nafathVerify: 'Verify with Nafath',
      demoCredentials: 'Demo Credentials'
    }
  };

  const t_local = (key: keyof typeof translations.ar) => translations[language][key];

  // Demo credentials for easy testing
  const demoCredentials = [
    { email: 'ahmed@example.com', label: 'Host Demo Account' }
  ];

  const fillDemo = (creds: typeof demoCredentials[0]) => {
    setFormData({
      email: creds.email,
      password: 'demo123'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <img 
            src="/lovable-uploads/WhatsApp_Image_2025-07-21_at_22.28.31-removebg-preview.png" 
            alt="Khadom" 
            className="h-16 mx-auto mb-4"
          />
        </div>

        <Card className="border-soft shadow-soft">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              {t_local('title')}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              {t_local('subtitle')}
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t_local('email')}</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t_local('password')}</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
                variant="cta"
              >
                {loading ? 
                  (language === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing in...') : 
                  t_local('login')
                }
              </Button>

              {/* Nafath Verification */}
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => toast({ title: language === 'ar' ? 'قريباً' : 'Coming Soon' })}
              >
                <Shield className="mr-2 h-4 w-4" />
                {t_local('nafathVerify')}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-medium mb-2">{t_local('demoCredentials')}:</h4>
              <div className="space-y-2">
                {demoCredentials.map((creds, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs"
                    onClick={() => fillDemo(creds)}
                  >
                    {creds.label}: {creds.email}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sign up link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">{t_local('noAccount')} </span>
              <Link to="/signup" className="text-primary hover:underline font-medium">
                {t_local('signup')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;