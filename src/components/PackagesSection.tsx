import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";

const PackagesSection = () => {
  const { language, t } = useLanguage();

  const handleWaitlistClick = () => {
    window.open('https://forms.gle/DVCABenddWdus3hi7', '_blank');
  };

  const packages = [
    {
      name: t('basicPackage'),
      nameEn: 'Khadoom Basic',
      features: [
        language === 'ar' ? 'تسجيل دخول أساسي للضيوف' : 'Basic guest check-in',
        language === 'ar' ? 'مسح وثائق الهوية' : 'ID document scanning',
        language === 'ar' ? 'تكامل مع شموس' : 'Shomoos integration',
        language === 'ar' ? 'دعم فني أساسي' : 'Basic technical support',
        language === 'ar' ? 'تقارير شهرية' : 'Monthly reports'
      ],
      highlight: false
    },
    {
      name: t('plusPackage'),
      nameEn: 'Khadoom Plus',
      features: [
        language === 'ar' ? 'جميع مميزات الباقة الأساسية' : 'All Basic features',
        language === 'ar' ? 'تحقق متقدم من الهوية' : 'Advanced identity verification',
        language === 'ar' ? 'خيارات تأمين متعددة' : 'Multiple insurance options',
        language === 'ar' ? 'تقارير مفصلة ولحظية' : 'Detailed real-time reports',
        language === 'ar' ? 'دعم فني أولوية 24/7' : '24/7 priority technical support',
        language === 'ar' ? 'تخصيص واجهة المستخدم' : 'Custom UI branding'
      ],
      highlight: true
    }
  ];

  return (
    <section id="packages" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('packagesTitle')}
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packages.map((pkg, index) => (
            <Card 
              key={index}
              className={`relative transition-all duration-300 hover:shadow-medium hover:-translate-y-2 ${
                pkg.highlight 
                  ? 'border-primary shadow-medium scale-105' 
                  : 'border-border shadow-soft'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                    {language === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {pkg.name}
                </CardTitle>
                <p className="text-muted-foreground">{pkg.nameEn}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3 rtl:space-x-reverse">
                      <div className="flex-shrink-0 w-5 h-5 bg-gradient-primary rounded-full flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                      <span className="text-foreground leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant={pkg.highlight ? "cta" : "outline"}
                  size="lg"
                  onClick={handleWaitlistClick} 
                  className="w-full group"
                >
                  {t('joinWaitlist')}
                  {language === 'ar' ? (
                    <ArrowLeft className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary-foreground mb-4">
              {language === 'ar' 
                ? 'جاهز لتحويل تجربة ضيوفك؟' 
                : 'Ready to transform your guest experience?'
              }
            </h3>
            <p className="text-primary-foreground/90 mb-6">
              {language === 'ar'
                ? 'انضم إلى قائمة الانتظار واحصل على وصول مبكر وخصومات حصرية'
                : 'Join the waitlist for early access and exclusive discounts'
              }
            </p>
            <Button 
              variant="secondary" 
              size="xl"
              onClick={handleWaitlistClick}
              className="bg-white text-primary hover:bg-white/90 font-semibold group"
            >
              {t('joinWaitlist')}
              {language === 'ar' ? (
                <ArrowLeft className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;