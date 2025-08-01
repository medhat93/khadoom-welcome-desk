import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { 
  LogOut, 
  FileText, 
  Star, 
  Check, 
  CreditCard,
  MessageSquare,
  Clock,
  ArrowLeft
} from 'lucide-react';

const GuestCheckOut = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [feedback, setFeedback] = useState({
    rating: '',
    review: '',
    depositRefund: 'full' as 'full' | 'partial' | 'none',
    reason: ''
  });

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const translations = {
    ar: {
      checkOut: 'تسجيل المغادرة',
      step: 'الخطوة',
      of: 'من',
      back: 'السابق',
      next: 'التالي',
      finish: 'إنهاء',
      unitInspection: 'فحص الوحدة',
      inspectionDesc: 'يرجى تقييم حالة الوحدة عند المغادرة',
      unitCondition: 'حالة الوحدة',
      excellent: 'ممتاز',
      good: 'جيد',
      fair: 'مقبول',
      poor: 'سيء',
      depositRefund: 'استرداد التأمين',
      fullRefund: 'استرداد كامل',
      partialRefund: 'استرداد جزئي',
      noRefund: 'لا يوجد استرداد',
      refundReason: 'سبب عدم الاسترداد الكامل',
      feedback: 'التقييم والمراجعة',
      rateExperience: 'قيم تجربتك',
      writeReview: 'اكتب مراجعة (اختياري)',
      reviewPlaceholder: 'شاركنا رأيك حول إقامتك...',
      completion: 'اكتمال المغادرة',
      thankYou: 'شكراً لك!',
      checkOutComplete: 'تم تسجيل المغادرة بنجاح',
      refundProcessing: 'سيتم معالجة استرداد التأمين خلال 3-5 أيام عمل',
      goToHome: 'العودة للرئيسية',
      unitName: 'اسم الوحدة',
      checkOutDate: 'تاريخ المغادرة'
    },
    en: {
      checkOut: 'Check Out',
      step: 'Step',
      of: 'of',
      back: 'Back',
      next: 'Next', 
      finish: 'Finish',
      unitInspection: 'Unit Inspection',
      inspectionDesc: 'Please assess the unit condition upon departure',
      unitCondition: 'Unit Condition',
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor',
      depositRefund: 'Deposit Refund',
      fullRefund: 'Full Refund',
      partialRefund: 'Partial Refund',
      noRefund: 'No Refund',
      refundReason: 'Reason for partial/no refund',
      feedback: 'Feedback & Review',
      rateExperience: 'Rate your experience',
      writeReview: 'Write a review (optional)',
      reviewPlaceholder: 'Share your thoughts about your stay...',
      completion: 'Check-Out Complete',
      thankYou: 'Thank You!',
      checkOutComplete: 'Check-out completed successfully',
      refundProcessing: 'Deposit refund will be processed within 3-5 business days',
      goToHome: 'Go to Home',
      unitName: 'Unit Name',
      checkOutDate: 'Check-Out Date'
    }
  };

  const t = (key: keyof typeof translations.ar) => translations[language][key];

  const unitData = {
    name: language === 'ar' ? 'الوحدة الأولى - شقة الروشة' : 'Unit One - Roshana Apartment',
    property: language === 'ar' ? 'شقة الروشة المطلة على البحر' : 'Roshana Sea View Apartment',
    depositAmount: 500
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/guest/dashboard');
    }
  };

  const handleFinish = () => {
    toast({
      title: language === 'ar' ? 'تم تسجيل المغادرة' : 'Check-out Complete',
      description: language === 'ar' ? 'شكراً لاستخدام خدماتنا' : 'Thank you for using our services'
    });
    // In real app, this would submit the checkout data
    setCurrentStep(4);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t('unitInspection')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">{t('inspectionDesc')}</p>
              
              <div className="space-y-4">
                <label className="text-sm font-medium">{t('unitCondition')}</label>
                <RadioGroup
                  value={feedback.rating}
                  onValueChange={(value) => setFeedback(prev => ({ ...prev, rating: value }))}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 rtl:space-x-reverse border border-soft rounded-lg p-3">
                    <RadioGroupItem value="excellent" id="excellent" />
                    <label htmlFor="excellent" className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      {t('excellent')}
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse border border-soft rounded-lg p-3">
                    <RadioGroupItem value="good" id="good" />
                    <label htmlFor="good" className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      {t('good')}
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse border border-soft rounded-lg p-3">
                    <RadioGroupItem value="fair" id="fair" />
                    <label htmlFor="fair" className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      {t('fair')}
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse border border-soft rounded-lg p-3">
                    <RadioGroupItem value="poor" id="poor" />
                    <label htmlFor="poor" className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      {t('poor')}
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline" className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('back')}
                </Button>
                <Button onClick={handleNext} className="flex-1" variant="cta" disabled={!feedback.rating}>
                  {t('next')}
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {t('depositRefund')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">{language === 'ar' ? 'مبلغ التأمين:' : 'Deposit Amount:'} {unitData.depositAmount} ر.س</p>
              </div>

              <div className="space-y-4">
                <RadioGroup
                  value={feedback.depositRefund}
                  onValueChange={(value) => setFeedback(prev => ({ ...prev, depositRefund: value as any }))}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2 rtl:space-x-reverse border border-soft rounded-lg p-4">
                    <RadioGroupItem value="full" id="full" />
                    <label htmlFor="full" className="text-sm font-medium flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      {t('fullRefund')}
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse border border-soft rounded-lg p-4">
                    <RadioGroupItem value="partial" id="partial" />
                    <label htmlFor="partial" className="text-sm font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      {t('partialRefund')}
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse border border-soft rounded-lg p-4">
                    <RadioGroupItem value="none" id="none" />
                    <label htmlFor="none" className="text-sm font-medium flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-red-600" />
                      {t('noRefund')}
                    </label>
                  </div>
                </RadioGroup>

                {(feedback.depositRefund === 'partial' || feedback.depositRefund === 'none') && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('refundReason')}</label>
                    <Textarea
                      value={feedback.reason}
                      onChange={(e) => setFeedback(prev => ({ ...prev, reason: e.target.value }))}
                      placeholder={language === 'ar' ? 'اذكر السبب...' : 'Please specify the reason...'}
                      className="min-h-[100px]"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline" className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('back')}
                </Button>
                <Button onClick={handleNext} className="flex-1" variant="cta">
                  {t('next')}
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                {t('feedback')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-3 block">{t('rateExperience')}</label>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-8 w-8 cursor-pointer transition-colors ${
                          parseInt(feedback.rating) >= star
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                        onClick={() => setFeedback(prev => ({ ...prev, rating: star.toString() }))}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">{t('writeReview')}</label>
                  <Textarea
                    value={feedback.review}
                    onChange={(e) => setFeedback(prev => ({ ...prev, review: e.target.value }))}
                    placeholder={t('reviewPlaceholder')}
                    className="min-h-[120px]"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline" className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('back')}
                </Button>
                <Button onClick={handleFinish} className="flex-1" variant="cta">
                  {t('finish')}
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                {t('completion')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <Check className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {t('thankYou')}
                </h3>
                <p className="text-green-700 mb-2">{t('checkOutComplete')}</p>
                <p className="text-sm text-green-600">{t('refundProcessing')}</p>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>{t('checkOutDate')}: {new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</p>
                <p>{t('unitName')}: {unitData.name}</p>
              </div>

              <Button 
                onClick={() => navigate('/')} 
                className="w-full" 
                variant="cta"
              >
                {t('goToHome')}
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">{t('checkOut')}</h1>
          <p className="text-sm opacity-90">{unitData.name}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>{t('step')} {currentStep} {t('of')} {totalSteps}</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </CardContent>
          </Card>

          {/* Current Step */}
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default GuestCheckOut;