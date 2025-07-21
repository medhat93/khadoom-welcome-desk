import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const { language, t } = useLanguage();

  const handleWaitlistClick = () => {
    window.open('https://forms.gle/DVCABenddWdus3hi7', '_blank');
  };

  return (
    <section 
      id="home" 
      className="min-h-screen bg-gradient-hero flex items-center pt-16"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-start">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {t('heroTitle')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                {t('heroSubtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="cta" 
                size="xl"
                onClick={handleWaitlistClick}
                className="min-w-[200px] group"
              >
                {t('joinWaitlist')}
                {language === 'ar' ? (
                  <ArrowLeft className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 rtl:space-x-reverse pt-8">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <img 
                  src="/lovable-uploads/44b9db56-e7c4-4848-9600-e65db685cbd8.png" 
                  alt="Shomoos Logo" 
                  className="h-12 w-auto"
                />
                <span className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'متكامل مع شموس' : 'Integrated with Shomoos'}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile App Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative bg-foreground rounded-[2.5rem] p-3 shadow-2xl">
                <div className="bg-background rounded-[2rem] p-8 h-[600px] w-[300px] flex flex-col items-center justify-center space-y-6">
                  {/* App Header */}
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img 
                      src="/lovable-uploads/0021118a-4c14-4f0c-816f-352a1afb1196.png" 
                      alt="Khadoom Logo" 
                      className="h-8 w-auto"
                    />
                    <div className="text-lg font-bold text-primary">خدوم</div>
                  </div>
                  
                  {/* Mock Interface */}
                  <div className="w-full space-y-4">
                    <div className="h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-medium">
                        {language === 'ar' ? 'مرحباً بك' : 'Welcome'}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-8 bg-muted rounded"></div>
                      <div className="h-8 bg-muted rounded"></div>
                      <div className="h-8 bg-muted rounded w-3/4"></div>
                    </div>
                    <div className="h-12 bg-secondary rounded-lg flex items-center justify-center">
                      <span className="text-secondary-foreground">
                        {language === 'ar' ? 'تسجيل الدخول' : 'Check In'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground p-3 rounded-full shadow-medium animate-pulse">
                ⚡
              </div>
              <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground p-3 rounded-full shadow-medium animate-pulse delay-1000">
                ✨
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;