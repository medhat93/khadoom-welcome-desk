import { useLanguage } from '@/hooks/useLanguage';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Key, Bell, Globe, Shield, CreditCard, FileText, Save, Camera } from 'lucide-react';
import { useState } from 'react';

const SettingsPage = () => {
  const { language, toggleLanguage } = useLanguage();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });

  const translations = {
    ar: {
      title: 'الإعدادات',
      description: 'إدارة إعدادات الحساب والنظام',
      profile: 'الملف الشخصي',
      profileDesc: 'إدارة معلومات الحساب الشخصية',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      changePhoto: 'تغيير الصورة',
      verified: 'موثق',
      security: 'الأمان',
      securityDesc: 'إدارة كلمة المرور والأمان',
      changePassword: 'تغيير كلمة المرور',
      twoFactor: 'المصادقة الثنائية',
      twoFactorDesc: 'حماية إضافية لحسابك',
      enable: 'تفعيل',
      notifications: 'الإشعارات',
      notificationsDesc: 'إدارة تفضيلات الإشعارات',
      emailNotifications: 'إشعارات البريد الإلكتروني',
      smsNotifications: 'إشعارات الرسائل النصية',
      pushNotifications: 'الإشعارات المرئية',
      marketingEmails: 'رسائل تسويقية',
      language: 'اللغة',
      languageDesc: 'تغيير لغة النظام',
      arabic: 'العربية',
      english: 'الإنجليزية',
      billing: 'الفواتير',
      billingDesc: 'إدارة المدفوعات والفواتير',
      paymentMethods: 'طرق الدفع',
      addPaymentMethod: 'إضافة طريقة دفع',
      subscriptionPlan: 'خطة الاشتراك',
      basic: 'أساسية',
      pro: 'احترافية',
      legal: 'قانوني',
      legalDesc: 'الشروط والأحكام وسياسة الخصوصية',
      termsOfService: 'شروط الخدمة',
      privacyPolicy: 'سياسة الخصوصية',
      dataExport: 'تصدير البيانات',
      deleteAccount: 'حذف الحساب',
      save: 'حفظ التغييرات'
    },
    en: {
      title: 'Settings',
      description: 'Manage account and system settings',
      profile: 'Profile',
      profileDesc: 'Manage your personal account information',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      changePhoto: 'Change Photo',
      verified: 'Verified',
      security: 'Security',
      securityDesc: 'Manage password and security settings',
      changePassword: 'Change Password',
      twoFactor: 'Two-Factor Authentication',
      twoFactorDesc: 'Add extra security to your account',
      enable: 'Enable',
      notifications: 'Notifications',
      notificationsDesc: 'Manage your notification preferences',
      emailNotifications: 'Email Notifications',
      smsNotifications: 'SMS Notifications',
      pushNotifications: 'Push Notifications',
      marketingEmails: 'Marketing Emails',
      language: 'Language',
      languageDesc: 'Change system language',
      arabic: 'Arabic',
      english: 'English',
      billing: 'Billing',
      billingDesc: 'Manage payments and billing',
      paymentMethods: 'Payment Methods',
      addPaymentMethod: 'Add Payment Method',
      subscriptionPlan: 'Subscription Plan',
      basic: 'Basic',
      pro: 'Pro',
      legal: 'Legal',
      legalDesc: 'Terms and conditions, privacy policy',
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      dataExport: 'Export Data',
      deleteAccount: 'Delete Account',
      save: 'Save Changes'
    }
  };

  const t = (key: keyof typeof translations.ar) => translations[language][key];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>

        <div className="grid gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <div>
                  <CardTitle>{t('profile')}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t('profileDesc')}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" className="gap-2">
                  <Camera className="h-4 w-4" />
                  {t('changePhoto')}
                </Button>
              </div>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">{t('fullName')}</Label>
                  <Input id="fullName" defaultValue={language === 'ar' ? 'محمد أحمد السعيد' : 'Mohammed Ahmed Al-Saeed'} />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    {t('email')}
                    <Badge variant="secondary" className="text-xs">
                      {t('verified')}
                    </Badge>
                  </Label>
                  <Input id="email" type="email" defaultValue="mohammed@example.com" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    {t('phone')}
                    <Badge variant="secondary" className="text-xs">
                      {t('verified')}
                    </Badge>
                  </Label>
                  <Input id="phone" defaultValue="+966501234567" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <div>
                  <CardTitle>{t('security')}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t('securityDesc')}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  <span>{t('changePassword')}</span>
                </div>
                <Button variant="outline">{t('changePassword')}</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>{t('twoFactor')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t('twoFactorDesc')}</p>
                </div>
                <Button variant="outline">{t('enable')}</Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <div>
                  <CardTitle>{t('notifications')}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t('notificationsDesc')}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{t('emailNotifications')}</span>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{t('smsNotifications')}</span>
                </div>
                <Switch 
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>{t('pushNotifications')}</span>
                </div>
                <Switch 
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{t('marketingEmails')}</span>
                </div>
                <Switch 
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <div>
                  <CardTitle>{t('language')}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t('languageDesc')}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span>{language === 'ar' ? t('arabic') : t('english')}</span>
                <Button onClick={toggleLanguage} variant="outline">
                  {language === 'ar' ? t('english') : t('arabic')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Billing Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <div>
                  <CardTitle>{t('billing')}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t('billingDesc')}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>{t('subscriptionPlan')}</span>
                <Badge variant="default">{t('pro')}</Badge>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <span>{t('paymentMethods')}</span>
                <Button variant="outline">{t('addPaymentMethod')}</Button>
              </div>
            </CardContent>
          </Card>

          {/* Legal */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <div>
                  <CardTitle>{t('legal')}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t('legalDesc')}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                {t('termsOfService')}
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                {t('privacyPolicy')}
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                {t('dataExport')}
              </Button>
              <Button variant="ghost" className="w-full justify-start text-destructive">
                {t('deleteAccount')}
              </Button>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              {t('save')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;