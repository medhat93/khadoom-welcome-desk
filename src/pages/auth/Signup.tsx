import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Shield, Check } from 'lucide-react';

const Signup = () => {
  const { language } = useLanguage();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [nafathVerified, setNafathVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }

    if (!nafathVerified) {
      toast({
        title: language === 'ar' ? 'مطلوب التحقق' : 'Verification Required',
        description: language === 'ar' ? 'يرجى التحقق عبر نفاذ أولاً' : 'Please verify with Nafath first',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      const success = await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: 'host',
        nafathVerified: true
      }, formData.password);
      
      if (success) {
        toast({
          title: language === 'ar' ? 'تم إنشاء الحساب بنجاح' : 'Account created successfully',
          description: language === 'ar' ? 'مرحباً بك في خدوم' : 'Welcome to Khadom'
        });
        
        // Navigate to host dashboard
        navigate('/host/dashboard');
      }
    } catch (error) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'حدث خطأ أثناء إنشاء الحساب' : 'An error occurred during signup',
        variant: 'destructive'
      });
    }
    
    setLoading(false);
  };

  const handleNafathVerification = () => {
    // Mock Nafath verification
    setTimeout(() => {
      setNafathVerified(true);
      toast({
        title: language === 'ar' ? 'تم التحقق بنجاح' : 'Verification Successful',
        description: language === 'ar' ? 'تم التحقق من هويتك عبر نفاذ' : 'Your identity has been verified via Nafath'
      });
    }, 2000);
  };

  const translations = {
    ar: {
      title: 'إنشاء حساب جديد',
      subtitle: 'للمالكين والمضيفين',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      signup: 'إنشاء الحساب',
      haveAccount: 'لديك حساب بالفعل؟',
      login: 'تسجيل الدخول',
      nafathVerify: 'التحقق عبر نفاذ',
      nafathRequired: 'مطلوب للتسجيل',
      verified: 'تم التحقق'
    },
    en: {
      title: 'Create New Account',
      subtitle: 'For Property Owners & Hosts',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone Number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      signup: 'Create Account',
      haveAccount: 'Already have an account?',
      login: 'Sign in',
      nafathVerify: 'Verify with Nafath',
      nafathRequired: 'Required for registration',
      verified: 'Verified'
    }
  };

  const t_local = (key: keyof typeof translations.ar) => translations[language][key];

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

              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t_local('name')}</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

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

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t_local('phone')}</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+966"
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t_local('confirmPassword')}</label>
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>

              {/* Nafath Verification */}
              <div className="space-y-2">
                <Button 
                  type="button" 
                  variant={nafathVerified ? "default" : "outline"}
                  className="w-full"
                  onClick={handleNafathVerification}
                  disabled={nafathVerified}
                >
                  {nafathVerified ? <Check className="mr-2 h-4 w-4" /> : <Shield className="mr-2 h-4 w-4" />}
                  {nafathVerified ? t_local('verified') : t_local('nafathVerify')}
                </Button>
                <p className="text-xs text-muted-foreground">{t_local('nafathRequired')}</p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || !nafathVerified}
                variant="cta"
              >
                {loading ? 
                  (language === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating account...') : 
                  t_local('signup')
                }
              </Button>
            </form>

            {/* Login link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">{t_local('haveAccount')} </span>
              <Link to="/login" className="text-primary hover:underline font-medium">
                {t_local('login')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;