import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DollarSign, 
  Shield, 
  Building2, 
  Scan, 
  Smartphone, 
  FileCheck 
} from "lucide-react";

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: DollarSign,
      title: t('feature1Title'),
      description: t('feature1Desc'),
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: t('feature2Title'),
      description: t('feature2Desc'),
      color: 'text-blue-600'
    },
    {
      icon: Building2,
      title: t('feature3Title'),
      description: t('feature3Desc'),
      color: 'text-purple-600'
    },
    {
      icon: Scan,
      title: t('feature4Title'),
      description: t('feature4Desc'),
      color: 'text-orange-600'
    },
    {
      icon: Smartphone,
      title: t('feature5Title'),
      description: t('feature5Desc'),
      color: 'text-cyan-600'
    },
    {
      icon: FileCheck,
      title: t('feature6Title'),
      description: t('feature6Desc'),
      color: 'text-indigo-600'
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('featuresTitle')}
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-0 shadow-soft bg-card"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-light/10 group-hover:from-primary/20 group-hover:to-primary-light/20 transition-all duration-300">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;