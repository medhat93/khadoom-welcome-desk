import { useLanguage } from '@/hooks/useLanguage';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SettingsPage = () => {
  const { language } = useLanguage();

  const translations = {
    ar: {
      title: 'الإعدادات',
      description: 'إدارة إعدادات الحساب والنظام',
      comingSoon: 'قريباً...'
    },
    en: {
      title: 'Settings',
      description: 'Manage account and system settings',
      comingSoon: 'Coming Soon...'
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
        
        <Card>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8 text-muted-foreground">{t('comingSoon')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;