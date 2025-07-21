import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations.ar) => string;
}

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    features: 'المميزات',
    packages: 'الباقات',
    contact: 'تواصل معنا',
    
    // Hero Section
    heroTitle: 'موظف استقبال في خدمتك 24/7',
    heroSubtitle: 'رحب بضيوفك في أي وقت، ومن أي مكان',
    joinWaitlist: 'انضم إلى قائمة الانتظار',
    
    // Features
    featuresTitle: 'لماذا خدوم؟',
    feature1Title: 'تكلفة أقل لعملك',
    feature1Desc: 'وفر على تكاليف موظفي الاستقبال التقليديين',
    feature2Title: 'حماية أكبر لضيوفك',
    feature2Desc: 'تحقق آمن من الهوية والوثائق',
    feature3Title: 'تكامل حكومي سلس',
    feature3Desc: 'اتصال مباشر مع منصة شموس الحكومية',
    feature4Title: 'مسح سهل للوثائق',
    feature4Desc: 'تقنية متقدمة لمسح وحفظ الوثائق',
    feature5Title: 'لا حاجة لأجهزة إضافية',
    feature5Desc: 'يعمل بالكامل عبر الهاتف المحمول',
    feature6Title: 'خيارات تأمين متعددة',
    feature6Desc: 'حلول تأمين مرنة لجميع احتياجاتك',
    
    // Packages
    packagesTitle: 'اختر الباقة المناسبة',
    basicPackage: 'خدوم بيسك',
    plusPackage: 'خدوم بلس',
    
    // Footer
    copyright: '© 2024 MVP City - Innovation Ventures. جميع الحقوق محفوظة.',
    
    // Visual Features
    visualTitle: 'تجربة ضيوف استثنائية',
    visual1Title: 'واجهة سهلة الاستخدام',
    visual1Desc: 'تصميم بديهي يجعل تسجيل الدخول سريعاً وبسيطاً',
    visual2Title: 'تحقق فوري من الهوية',
    visual2Desc: 'تقنية ذكية للتحقق من صحة الوثائق الرسمية',
    visual3Title: 'تقارير شاملة',
    visual3Desc: 'احصل على تقارير مفصلة عن جميع الضيوف والحجوزات',
    
    // Services Section
    servicesTitle: 'المميزات الأساسية المتاحة الآن',
    servicesSubtitle: 'ابدأ بمميزات تسجيل الوصول والدفع الأساسية. المزيد من الخدمات قريباً!',
    service1Title: 'التحقق من الهوية',
    service1Desc: 'ارفع وتحقق من جواز سفرك أو هويتك لعملية تسجيل وصول سلسة',
    service2Title: 'دفع التأمين والضمان', 
    service2Desc: 'دفع آمن عبر الإنترنت لتأمينات الضمان مع تأكيد فوري عبر مدى، Apple Pay، وبطاقات الائتمان',
    service3Title: 'تسجيل الوصول الرقمي الذاتي',
    service3Desc: 'أكمل عملية تسجيل الوصول من هاتفك مع التحقق من الهوية وتخصيص الغرفة',
    service4Title: 'خدمات الكونسيرج',
    service4Desc: 'احصل على توصيات محلية ومساعدة في الحجز',
    service5Title: 'طلبات الصيانة',
    service5Desc: 'أبلغ وتتبع مشاكل الصيانة في إقامتك',
    service6Title: 'خدمة الغرف',
    service6Desc: 'اطلب الطعام والمشروبات والمستلزمات مباشرة إلى غرفتك',
    comingSoon: 'قريباً',
  },
  en: {
    // Navigation
    home: 'Home',
    features: 'Features',
    packages: 'Packages',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Your 24/7 Digital Receptionist',
    heroSubtitle: 'Welcome your guests anytime, from anywhere',
    joinWaitlist: 'Join the Waitlist',
    
    // Features
    featuresTitle: 'Why Khadoom?',
    feature1Title: 'Lower Cost for Your Business',
    feature1Desc: 'Save on traditional reception staff costs',
    feature2Title: 'Higher Protection for Your Guests',
    feature2Desc: 'Secure identity and document verification',
    feature3Title: 'Seamless Government Integration',
    feature3Desc: 'Direct connection with Shomoos government platform',
    feature4Title: 'Easy Document Scanning',
    feature4Desc: 'Advanced technology for scanning and storing documents',
    feature5Title: 'No Extra Hardware Required',
    feature5Desc: 'Works entirely through mobile devices',
    feature6Title: 'Multiple Insurance Options',
    feature6Desc: 'Flexible insurance solutions for all your needs',
    
    // Packages
    packagesTitle: 'Choose Your Package',
    basicPackage: 'Khadoom Basic',
    plusPackage: 'Khadoom Plus',
    
    // Footer
    copyright: '© 2024 MVP City - Innovation Ventures. All rights reserved.',
    
    // Visual Features
    visualTitle: 'Exceptional Guest Experience',
    visual1Title: 'User-Friendly Interface',
    visual1Desc: 'Intuitive design makes check-in fast and simple',
    visual2Title: 'Instant Identity Verification',
    visual2Desc: 'Smart technology to verify official document authenticity',
    visual3Title: 'Comprehensive Reports',
    visual3Desc: 'Get detailed reports on all guests and bookings',
    
    // Services Section
    servicesTitle: 'Basic Features Available Now',
    servicesSubtitle: 'Start with basic check-in and payment features. More services coming soon!',
    service1Title: 'ID Verification',
    service1Desc: 'Upload and verify your passport or ID for seamless registration',
    service2Title: 'Security Deposit Payment',
    service2Desc: 'Secure online payment for security deposits with instant confirmation',
    service3Title: 'Digital Self Check-in',
    service3Desc: 'Complete arrival registration from your phone with ID verification and room assignment',
    service4Title: 'Concierge Services',
    service4Desc: 'Get local recommendations and booking assistance',
    service5Title: 'Maintenance Requests',
    service5Desc: 'Report and track maintenance issues in your accommodation',
    service6Title: 'Room Service',
    service6Desc: 'Order food, drinks, and supplies directly to your room',
    comingSoon: 'Coming Soon',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';
  
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const t = (key: keyof typeof translations.ar) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};