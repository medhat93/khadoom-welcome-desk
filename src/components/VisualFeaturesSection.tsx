import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const VisualFeaturesSection = () => {
  const { language, t } = useLanguage();

  const handleWaitlistClick = () => {
    window.open('https://forms.gle/DVCABenddWdus3hi7', '_blank');
  };

  const features = [
    {
      title: t('visual1Title'),
      description: t('visual1Desc'),
      mockup: (
        <div className="bg-gradient-to-br from-primary/10 to-primary-light/20 rounded-2xl p-6 h-64 flex flex-col justify-center items-center space-y-4">
          <div className="w-full h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-medium">
              {language === 'ar' ? 'خدوم - تسجيل دخول سريع' : 'Khadoom - Quick Check-in'}
            </span>
          </div>
          <div className="space-y-2 w-full">
            <div className="h-6 bg-white/80 rounded"></div>
            <div className="h-6 bg-white/60 rounded w-3/4"></div>
            <div className="h-6 bg-white/40 rounded w-1/2"></div>
          </div>
          <div className="w-full h-10 bg-primary/80 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">✓ {language === 'ar' ? 'تم' : 'Done'}</span>
          </div>
        </div>
      )
    },
    {
      title: t('visual2Title'),
      description: t('visual2Desc'),
      mockup: (
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 h-64 flex flex-col justify-center items-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl">
            ✓
          </div>
          <div className="text-center space-y-2">
            <div className="font-semibold text-green-800">
              {language === 'ar' ? 'تم التحقق من الهوية' : 'Identity Verified'}
            </div>
            <div className="text-sm text-green-600">
              {language === 'ar' ? 'وثيقة صالحة ومعتمدة' : 'Valid & Certified Document'}
            </div>
          </div>
        </div>
      )
    },
    {
      title: t('visual3Title'),
      description: t('visual3Desc'),
      mockup: (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 h-64 flex flex-col justify-center space-y-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-blue-900">
              {language === 'ar' ? 'التقارير' : 'Reports'}
            </span>
            <span className="text-xs text-blue-600">
              {language === 'ar' ? 'هذا الشهر' : 'This Month'}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-blue-700">{language === 'ar' ? 'إجمالي الضيوف' : 'Total Guests'}</span>
              <span className="text-xs font-bold text-blue-900">247</span>
            </div>
            <div className="w-full h-2 bg-blue-200 rounded-full">
              <div className="w-3/4 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-blue-700">{language === 'ar' ? 'معدل الرضا' : 'Satisfaction'}</span>
              <span className="text-xs font-bold text-blue-900">98%</span>
            </div>
            <div className="w-full h-2 bg-blue-200 rounded-full">
              <div className="w-[98%] h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('visualTitle')}
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleWaitlistClick}
                  className="group border-primary/20 hover:border-primary hover:bg-primary/5"
                >
                  {t('joinWaitlist')}
                  {language === 'ar' ? (
                    <ArrowLeft className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </div>
              
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                {feature.mockup}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualFeaturesSection;