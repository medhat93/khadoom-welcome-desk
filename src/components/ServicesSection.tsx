import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Upload, 
  CreditCard,
  Smartphone,
  User, 
  Shield, 
  Clock
} from "lucide-react";

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Upload,
      title: t('service1Title'),
      description: t('service1Desc'),
      available: true,
      color: 'text-primary'
    },
    {
      icons: [CreditCard, Smartphone],
      title: t('service2Title'),
      description: t('service2Desc'),
      available: true,
      color: 'text-primary',
      isPayment: true
    },
    {
      icon: Smartphone,
      title: t('service3Title'),
      description: t('service3Desc'),
      available: true,
      color: 'text-primary'
    },
    {
      icon: User,
      title: t('service4Title'),
      description: t('service4Desc'),
      available: false,
      color: 'text-muted-foreground'
    },
    {
      icon: Shield,
      title: t('service5Title'),
      description: t('service5Desc'),
      available: false,
      color: 'text-muted-foreground'
    },
    {
      icon: Clock,
      title: t('service6Title'),
      description: t('service6Desc'),
      available: false,
      color: 'text-muted-foreground'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('servicesTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            {t('servicesSubtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`group transition-all duration-300 hover:shadow-medium hover:-translate-y-1 border-0 shadow-soft relative overflow-hidden ${
                service.available 
                  ? 'bg-card hover:bg-card/80' 
                  : 'bg-muted/50 hover:bg-muted/60'
              }`}
            >
              {!service.available && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {t('comingSoon')}
                </div>
              )}
              
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className={`p-4 rounded-2xl transition-all duration-300 flex items-center gap-2 ${
                    service.available 
                      ? 'bg-gradient-to-br from-primary/10 to-primary-light/10 group-hover:from-primary/20 group-hover:to-primary-light/20'
                      : 'bg-muted/30 group-hover:bg-muted/40'
                  }`}>
                    {service.isPayment ? (
                      (service.icons ?? []).map((Icon, iconIndex) => (
                        <Icon key={iconIndex} className={`h-6 w-6 ${service.color}`} />
                      ))
                    ) : (
                      <service.icon className={`h-8 w-8 ${service.color}`} />
                    )}
                  </div>
                </div>
                
                <h3 className={`text-xl font-semibold mb-4 ${
                  service.available ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {service.title}
                </h3>
                
                <p className={`leading-relaxed ${
                  service.available ? 'text-muted-foreground' : 'text-muted-foreground/80'
                }`}>
                  {service.description}
                </p>
                
                {service.isPayment && service.available && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
                      <span className="font-medium">مدعوم:</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">مدى</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">Apple Pay</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">Visa/MC</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-primary/10 rounded-full px-6 py-3">
            <div className="flex space-x-1 rtl:space-x-reverse">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
              <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
              <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
            </div>
            <span className="text-sm text-primary font-medium">
              {useLanguage().language === 'ar' ? '3 من 6 مميزات متاحة' : '3 of 6 features available'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;