import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and Branding */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse justify-center md:justify-start">
            <img 
              src="/lovable-uploads/0021118a-4c14-4f0c-816f-352a1afb1196.png" 
              alt="Khadoom Logo" 
              className="h-8 w-auto filter invert"
            />
            <div className="text-xl font-bold">خدوم</div>
          </div>

          {/* Government Integration */}
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
            <span className="text-sm text-background/70">
              {useLanguage().language === 'ar' ? 'متكامل مع:' : 'Integrated with:'}
            </span>
            <img 
              src="/lovable-uploads/44b9db56-e7c4-4848-9600-e65db685cbd8.png" 
              alt="Shomoos Logo" 
              className="h-10 w-auto filter invert"
            />
          </div>

          {/* Copyright */}
          <div className="text-center md:text-end">
            <p className="text-sm text-background/70">
              {t('copyright')}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="text-center">
            <p className="text-xs text-background/50">
              {useLanguage().language === 'ar' 
                ? 'خدوم - موظف الاستقبال الرقمي للمستقبل'
                : 'Khadoom - The Digital Receptionist of the Future'
              }
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;