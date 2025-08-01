import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Users, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Phone, 
  Mail, 
  FileText,
  LogOut,
  Check,
  Clock
} from 'lucide-react';
import { Guest } from '@/types';

const GuestDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const translations = {
    ar: {
      dashboard: 'لوحة تحكم الضيف',
      welcome: 'مرحباً',
      checkInDetails: 'تفاصيل تسجيل الوصول',
      personalInfo: 'المعلومات الشخصية',
      companions: 'المرافقين',
      paymentInfo: 'معلومات الدفع',
      unitDetails: 'تفاصيل الوحدة',
      checkOutBtn: 'تسجيل المغادرة',
      guestName: 'اسم الضيف',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      idNumber: 'رقم الهوية',
      checkInDate: 'تاريخ الوصول',
      checkOutDate: 'تاريخ المغادرة',
      depositAmount: 'مبلغ التأمين',
      depositStatus: 'حالة التأمين',
      paymentMethod: 'طريقة الدفع',
      status: 'الحالة',
      pending: 'قيد الانتظار',
      checkedIn: 'وصل',
      paid: 'مدفوع',
      refunded: 'مسترد',
      creditCard: 'بطاقة ائتمان',
      bankTransfer: 'تحويل بنكي',
      unitName: 'اسم الوحدة',
      property: 'العقار',
      location: 'الموقع',
      noCompanions: 'لا يوجد مرافقين',
      confirmCheckOut: 'هل أنت متأكد من تسجيل المغادرة؟'
    },
    en: {
      dashboard: 'Guest Dashboard',
      welcome: 'Welcome',
      checkInDetails: 'Check-In Details',
      personalInfo: 'Personal Information',
      companions: 'Companions',
      paymentInfo: 'Payment Information',
      unitDetails: 'Unit Details',
      checkOutBtn: 'Check Out',
      guestName: 'Guest Name',
      phone: 'Phone',
      email: 'Email',
      idNumber: 'ID Number',
      checkInDate: 'Check-In Date',
      checkOutDate: 'Check-Out Date',
      depositAmount: 'Deposit Amount',
      depositStatus: 'Deposit Status',
      paymentMethod: 'Payment Method',
      status: 'Status',
      pending: 'Pending',
      checkedIn: 'Checked In',
      paid: 'Paid',
      refunded: 'Refunded',
      creditCard: 'Credit Card',
      bankTransfer: 'Bank Transfer',
      unitName: 'Unit Name',
      property: 'Property',
      location: 'Location',
      noCompanions: 'No companions',
      confirmCheckOut: 'Are you sure you want to check out?'
    }
  };

  const t = (key: keyof typeof translations.ar) => translations[language][key];

  // Mock guest data - in real app, this would come from context/API
  const mockGuest: Guest = {
    id: '1',
    unitId: 'unit1',
    name: language === 'ar' ? 'أحمد محمد العلي' : 'Ahmed Mohammed Ali',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    idNumber: '1234567890',
    companions: [
      { 
        name: language === 'ar' ? 'فاطمة أحمد' : 'Fatima Ahmed', 
        idNumber: '0987654321', 
        relationship: language === 'ar' ? 'زوجة' : 'Wife' 
      },
      { 
        name: language === 'ar' ? 'محمد أحمد' : 'Mohammed Ahmed', 
        idNumber: '1357924680', 
        relationship: language === 'ar' ? 'ابن' : 'Son' 
      }
    ],
    checkInDate: new Date('2024-01-20'),
    registrationCard: {
      id: 'rc1',
      guestApproved: true,
      hostApproved: true,
      generatedAt: new Date('2024-01-20'),
      data: {}
    },
    deposit: {
      id: 'dep1',
      amount: 500,
      method: 'card',
      status: 'paid',
      paidAt: new Date('2024-01-19')
    },
    status: 'checked-in'
  };

  // Mock unit data
  const unitData = {
    name: language === 'ar' ? 'الوحدة الأولى - شقة الروشة' : 'Unit One - Roshana Apartment',
    property: language === 'ar' ? 'شقة الروشة المطلة على البحر' : 'Roshana Sea View Apartment',
    location: language === 'ar' ? 'جدة - الروشة' : 'Jeddah - Roshana'
  };

  const getStatusBadge = (status: Guest['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" />{t('pending')}</Badge>;
      case 'checked-in':
        return <Badge variant="default" className="flex items-center gap-1"><Check className="h-3 w-3" />{t('checkedIn')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDepositStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="default" className="flex items-center gap-1"><Check className="h-3 w-3" />{t('paid')}</Badge>;
      case 'refunded':
        return <Badge variant="outline">{t('refunded')}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleCheckOut = () => {
    if (window.confirm(t('confirmCheckOut'))) {
      navigate('/guest/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">{t('dashboard')}</h1>
          <p className="text-lg opacity-90">{t('welcome')}, {mockGuest.name}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          
          {/* Check-in Status Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t('checkInDetails')}
                </span>
                {getStatusBadge(mockGuest.status)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('checkInDate')}:</span>
                  <span>{mockGuest.checkInDate.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</span>
                </div>
                {mockGuest.checkOutDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{t('checkOutDate')}:</span>
                    <span>{mockGuest.checkOutDate.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t('personalInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('guestName')}:</span>
                  <span>{mockGuest.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('phone')}:</span>
                  <span>{mockGuest.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('email')}:</span>
                  <span>{mockGuest.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('idNumber')}:</span>
                  <span>{mockGuest.idNumber}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Unit Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {t('unitDetails')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium">{t('unitName')}:</span>
                  <p className="text-sm text-muted-foreground">{unitData.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">{t('property')}:</span>
                  <p className="text-sm text-muted-foreground">{unitData.property}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('location')}:</span>
                  <span className="text-sm">{unitData.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Companions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t('companions')} ({mockGuest.companions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockGuest.companions.length > 0 ? (
                <div className="space-y-3">
                  {mockGuest.companions.map((companion, index) => (
                    <div key={index} className="border border-soft rounded-lg p-3">
                      <div className="space-y-1">
                        <p className="font-medium">{companion.name}</p>
                        <p className="text-sm text-muted-foreground">{t('idNumber')}: {companion.idNumber}</p>
                        <p className="text-sm text-muted-foreground">{companion.relationship}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">{t('noCompanions')}</p>
              )}
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {t('paymentInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('depositAmount')}:</span>
                  <span className="font-semibold">{mockGuest.deposit.amount} ر.س</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('paymentMethod')}:</span>
                  <span>{mockGuest.deposit.method === 'card' ? t('creditCard') : t('bankTransfer')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('depositStatus')}:</span>
                  {getDepositStatusBadge(mockGuest.deposit.status)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Check Out Button */}
          <Card className="lg:col-span-2">
            <CardContent className="pt-6">
              <div className="text-center">
                <Button 
                  onClick={handleCheckOut}
                  variant="destructive" 
                  size="lg"
                  className="px-8"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  {t('checkOutBtn')}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  {language === 'ar' 
                    ? 'انقر لبدء عملية تسجيل المغادرة' 
                    : 'Click to start the check-out process'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GuestDashboard;