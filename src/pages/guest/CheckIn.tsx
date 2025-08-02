import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Shield, User, Users, CreditCard, FileText, Check, Upload } from 'lucide-react';

const GuestCheckIn = () => {
  const { unitId } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [nafathVerified, setNafathVerified] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    idNumber: '',
    leavingDate: '',
    companions: [{ name: '', idNumber: '', relationship: '' }],
    paymentMethod: 'credit' as 'credit' | 'other',
    otherPaymentMethod: '',
    iban: ''
  });

  const totalSteps = 5;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleNafathVerification = () => {
    setTimeout(() => {
      setNafathVerified(true);
      setFormData(prev => ({
        ...prev,
        idNumber: '1234567890',
        phone: '+966501234567',
        email: 'guest@example.com'
      }));
      toast({
        title: language === 'ar' ? 'تم التحقق بنجاح' : 'Verification Successful',
        description: language === 'ar' ? 'تم التحقق من هويتك عبر نفاذ/أبشر' : 'Identity verified via Nafath/Absher'
      });
      setCurrentStep(2);
    }, 2000);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePayment = () => {
    setTimeout(() => {
      toast({
        title: language === 'ar' ? 'تم الدفع بنجاح' : 'Payment Successful',
        description: language === 'ar' ? 'تم دفع التأمين بنجاح' : 'Security deposit paid successfully'
      });
      handleNextStep();
    }, 2000);
  };

  const translations = {
    ar: {
      checkIn: 'تسجيل الوصول',
      step: 'الخطوة',
      of: 'من',
      nafathVerification: 'التحقق عبر نفاذ/أبشر',
      nafathDesc: 'تحقق من هويتك للمتابعة',
      verifyIdentity: 'التحقق من الهوية',
      verified: 'تم التحقق',
      personalInfo: 'المعلومات الشخصية',
      phone: 'رقم الهاتف',
      email: 'البريد الإلكتروني',
      idNumber: 'رقم الهوية',
      leavingDate: 'تاريخ المغادرة',
      companions: 'المرافقين',
      addCompanion: 'إضافة مرافق',
      companionName: 'اسم المرافق',
      companionId: 'رقم هوية المرافق',
      relationship: 'العلاقة',
      registrationCard: 'بطاقة التسجيل',
      cardGenerated: 'تم إنشاء بطاقة التسجيل',
      approveCard: 'أوافق على بطاقة التسجيل',
      securityDeposit: 'التأمين',
      depositAmount: 'مبلغ التأمين',
      paymentMethod: 'طريقة الدفع',
      creditCard: 'بطاقة ائتمان',
      otherPaymentOptions: 'خيارات دفع أخرى',
      madaPay: 'مدى',
      stcPay: 'STC Pay',
      applePay: 'Apple Pay',
      refundIban: 'حساب استرداد التأمين',
      ibanNumber: 'رقم الآيبان',
      payDeposit: 'دفع التأمين',
      completion: 'اكتمال التسجيل',
      welcomeMessage: 'مرحباً بك! تم تسجيل وصولك بنجاح',
      checkInComplete: 'تم تسجيل الوصول',
      goToDashboard: 'الذهاب للوحة التحكم',
      next: 'التالي',
      back: 'السابق',
      unitDetails: 'تفاصيل الوحدة'
    },
    en: {
      checkIn: 'Check-In',
      step: 'Step',
      of: 'of',
      nafathVerification: 'Nafath/Absher Verification',
      nafathDesc: 'Verify your identity to continue',
      verifyIdentity: 'Verify Identity',
      verified: 'Verified',
      personalInfo: 'Personal Information',
      phone: 'Phone Number',
      email: 'Email',
      idNumber: 'ID Number',
      leavingDate: 'Leaving Date',
      companions: 'Companions',
      addCompanion: 'Add Companion',
      companionName: 'Companion Name',
      companionId: 'Companion ID',
      relationship: 'Relationship',
      registrationCard: 'Registration Card',
      cardGenerated: 'Registration card generated',
      approveCard: 'I approve the registration card',
      securityDeposit: 'Security Deposit',
      depositAmount: 'Deposit Amount',
      paymentMethod: 'Payment Method',
      creditCard: 'Credit Card',
      otherPaymentOptions: 'Other Payment Options',
      madaPay: 'Mada Pay',
      stcPay: 'STC Pay',
      applePay: 'Apple Pay',
      refundIban: 'Insurance Refund Account',
      ibanNumber: 'IBAN Number',
      payDeposit: 'Pay Deposit',
      completion: 'Check-In Complete',
      welcomeMessage: 'Welcome! Your check-in is complete',
      checkInComplete: 'Check-in completed successfully',
      goToDashboard: 'Go to Dashboard',
      next: 'Next',
      back: 'Back',
      unitDetails: 'Unit Details'
    }
  };

  const t_local = (key: keyof typeof translations.ar) => translations[language][key];

  // Mock unit data
  const unitData = {
    name: 'الوحدة الأولى - شقة الروشة',
    property: 'شقة الروشة المطلة على البحر',
    location: 'جدة - الروشة',
    depositAmount: 500
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t_local('nafathVerification')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{t_local('nafathDesc')}</p>
              
              <Button 
                onClick={handleNafathVerification}
                disabled={nafathVerified}
                variant={nafathVerified ? "default" : "cta"}
                className="w-full"
                size="lg"
              >
                {nafathVerified ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    {t_local('verified')}
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    {t_local('verifyIdentity')}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t_local('personalInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t_local('phone')}</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={nafathVerified}
                  className={nafathVerified ? 'bg-green-50' : ''}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">{t_local('email')}</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={nafathVerified}
                  className={nafathVerified ? 'bg-green-50' : ''}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">{t_local('idNumber')}</label>
                <Input
                  value={formData.idNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, idNumber: e.target.value }))}
                  disabled={nafathVerified}
                  className={nafathVerified ? 'bg-green-50' : ''}
                />
              </div>

              <div>
                <label className="text-sm font-medium">{t_local('leavingDate')}</label>
                <Input
                  type="date"
                  value={formData.leavingDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, leavingDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <Button onClick={handleNextStep} className="w-full" variant="cta">
                {t_local('next')}
              </Button>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t_local('companions')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.companions.map((companion, index) => (
                <div key={index} className="border border-soft rounded-lg p-4 space-y-3">
                  <div>
                    <label className="text-sm font-medium">{t_local('companionName')}</label>
                    <Input
                      value={companion.name}
                      onChange={(e) => {
                        const newCompanions = [...formData.companions];
                        newCompanions[index].name = e.target.value;
                        setFormData(prev => ({ ...prev, companions: newCompanions }));
                      }}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">{t_local('companionId')}</label>
                    <Input
                      value={companion.idNumber}
                      onChange={(e) => {
                        const newCompanions = [...formData.companions];
                        newCompanions[index].idNumber = e.target.value;
                        setFormData(prev => ({ ...prev, companions: newCompanions }));
                      }}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">{t_local('relationship')}</label>
                    <Input
                      value={companion.relationship}
                      onChange={(e) => {
                        const newCompanions = [...formData.companions];
                        newCompanions[index].relationship = e.target.value;
                        setFormData(prev => ({ ...prev, companions: newCompanions }));
                      }}
                    />
                  </div>
                </div>
              ))}

              <Button 
                type="button"
                variant="outline"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  companions: [...prev.companions, { name: '', idNumber: '', relationship: '' }]
                }))}
                className="w-full"
              >
                {t_local('addCompanion')}
              </Button>

              <Button onClick={handleNextStep} className="w-full" variant="cta">
                {t_local('next')}
              </Button>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {t_local('securityDeposit')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">{t_local('depositAmount')}: {unitData.depositAmount} ر.س</p>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">{t_local('paymentMethod')}</label>
                
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value as 'credit' | 'other' }))}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <RadioGroupItem value="credit" id="credit" />
                    <label htmlFor="credit" className="text-sm font-medium">{t_local('creditCard')}</label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <RadioGroupItem value="other" id="other" />
                    <label htmlFor="other" className="text-sm font-medium">{t_local('otherPaymentOptions')}</label>
                  </div>
                </RadioGroup>

                {formData.paymentMethod === 'other' && (
                  <div className="space-y-4 border border-soft rounded-lg p-4 bg-muted/30">
                    <div>
                      <label className="text-sm font-medium mb-2 block">اختر طريقة الدفع:</label>
                      <Select 
                        value={formData.otherPaymentMethod} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, otherPaymentMethod: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر طريقة الدفع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mada">{t_local('madaPay')}</SelectItem>
                          <SelectItem value="stc">{t_local('stcPay')}</SelectItem>
                          <SelectItem value="apple">{t_local('applePay')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">{t_local('refundIban')}</label>
                      <Input
                        value={formData.iban}
                        onChange={(e) => setFormData(prev => ({ ...prev, iban: e.target.value }))}
                        placeholder="SA00 0000 0000 0000 0000 0000"
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button onClick={handlePayment} className="w-full" variant="cta">
                <CreditCard className="mr-2 h-4 w-4" />
                {t_local('payDeposit')}
              </Button>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                {t_local('completion')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-green-50 p-6 rounded-lg">
                <Check className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {t_local('checkInComplete')}
                </h3>
                <p className="text-green-700">{t_local('welcomeMessage')}</p>
              </div>

              <Button 
                onClick={() => navigate('/guest/dashboard')} 
                className="w-full" 
                variant="cta"
              >
                {t_local('goToDashboard')}
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
          <h1 className="text-2xl font-bold">{t_local('checkIn')}</h1>
          <p className="text-sm opacity-90">{unitData.name}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>{t_local('step')} {currentStep} {t_local('of')} {totalSteps}</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </CardContent>
          </Card>

          {/* Unit Details */}
          <Card className="border-soft">
            <CardHeader>
              <CardTitle className="text-lg">{t_local('unitDetails')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>{unitData.property}</strong></p>
                <p className="text-muted-foreground">{unitData.location}</p>
                <Badge variant="secondary">{unitData.name}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Current Step */}
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default GuestCheckIn;