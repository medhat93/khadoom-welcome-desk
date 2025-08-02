import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Plus, Building, Users, DollarSign, TrendingUp, QrCode, Settings, Bell, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import type { Property, Unit } from '@/types';

interface CheckoutRequest {
  id: string;
  guestName: string;
  unitName: string;
  propertyName: string;
  checkOutDate: string;
  unitCondition: string;
  guestReview: string;
  rating: number;
  depositRefundStatus: 'pending' | 'full' | 'partial' | 'none';
  refundAmount?: number;
  refundReason?: string;
  guestApproved?: boolean;
}

const HostDashboard = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data for prototype
  const [checkoutRequests, setCheckoutRequests] = useState<CheckoutRequest[]>([
    {
      id: '1',
      guestName: 'أحمد محمد',
      unitName: 'الوحدة الأولى',
      propertyName: 'شقة الروشة المطلة على البحر',
      checkOutDate: new Date().toISOString(),
      unitCondition: 'excellent',
      guestReview: 'إقامة رائعة، النظافة ممتازة والموقع مثالي',
      rating: 5,
      depositRefundStatus: 'pending'
    },
    {
      id: '2',
      guestName: 'سارة أحمد',
      unitName: 'الوحدة الثانية',
      propertyName: 'شقة الروشة المطلة على البحر',
      checkOutDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      unitCondition: 'good',
      guestReview: 'تجربة جيدة، لكن هناك بعض الأشياء التي تحتاج تحسين',
      rating: 4,
      depositRefundStatus: 'partial',
      refundAmount: 300,
      refundReason: 'كسر في الكوب',
      guestApproved: false
    },
    {
      id: '3',
      guestName: 'محمد عبدالله',
      unitName: 'الوحدة الثالثة',
      propertyName: 'شقة الروشة المطلة على البحر',
      checkOutDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      unitCondition: 'poor',
      guestReview: 'للأسف الوحدة لم تكن نظيفة عند الوصول',
      rating: 2,
      depositRefundStatus: 'none',
      refundReason: 'أضرار في الأثاث وبقع على السجاد',
      guestApproved: false
    },
    {
      id: '4',
      guestName: 'فاطمة علي',
      unitName: 'الوحدة الرابعة',
      propertyName: 'شقة الروشة المطلة على البحر',
      checkOutDate: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      unitCondition: 'excellent',
      guestReview: 'كل شيء كان مثالي، شكراً لكم على الخدمة الرائعة',
      rating: 5,
      depositRefundStatus: 'full',
      guestApproved: true
    }
  ]);
  
  const [selectedRequest, setSelectedRequest] = useState<CheckoutRequest | null>(null);
  const [refundDecision, setRefundDecision] = useState({
    type: 'full' as 'full' | 'partial' | 'none',
    amount: '',
    reason: ''
  });

  const [properties] = useState<Property[]>([
    {
      id: '1',
      hostId: user?.id || '1',
      name: 'شقة الروشة المطلة على البحر',
      description: 'شقة فاخرة بإطلالة رائعة على البحر',
      type: 'apartment',
      location: 'جدة - الروشة',
      tourismLicense: 'TR-123456',
      units: [
        {
          id: '1',
          propertyId: '1',
          name: 'الوحدة الأولى',
          description: '25 م² - تكييف - واي فاي - شرفة',
          depositAmount: 500,
          terms: 'شروط الإقامة الأساسية',
          checkInLink: '/guest/checkin/1',
          qrCode: 'QR_CODE_1',
          status: 'occupied'
        },
        {
          id: '2',
          propertyId: '1',
          name: 'الوحدة الثانية',
          description: '30 م² - تكييف - واي فاي - مطبخ صغير',
          depositAmount: 500,
          terms: 'شروط الإقامة الأساسية',
          checkInLink: '/guest/checkin/2',
          qrCode: 'QR_CODE_2',
          status: 'available'
        },
        {
          id: '3',
          propertyId: '1',
          name: 'الوحدة الثالثة',
          description: '28 م² - تكييف - واي فاي - جاكوزي',
          depositAmount: 600,
          terms: 'شروط الإقامة الأساسية',
          checkInLink: '/guest/checkin/3',
          qrCode: 'QR_CODE_3',
          status: 'occupied'
        },
        {
          id: '4',
          propertyId: '1',
          name: 'الوحدة الرابعة',
          description: '35 م² - تكييف - واي فاي - شرفة كبيرة',
          depositAmount: 700,
          terms: 'شروط الإقامة الأساسية',
          checkInLink: '/guest/checkin/4',
          qrCode: 'QR_CODE_4',
          status: 'maintenance'
        },
        {
          id: '5',
          propertyId: '1',
          name: 'الوحدة الخامسة',
          description: '22 م² - تكييف - واي فاي - مدمجة',
          depositAmount: 450,
          terms: 'شروط الإقامة الأساسية',
          checkInLink: '/guest/checkin/5',
          qrCode: 'QR_CODE_5',
          status: 'available'
        },
        {
          id: '6',
          propertyId: '1',
          name: 'الوحدة السادسة',
          description: '40 م² - تكييف - واي فاي - غرفتين',
          depositAmount: 800,
          terms: 'شروط الإقامة الأساسية',
          checkInLink: '/guest/checkin/6',
          qrCode: 'QR_CODE_6',
          status: 'occupied'
        }
      ],
      createdAt: new Date()
    }
  ]);

  const stats = {
    totalProperties: properties.length,
    totalUnits: properties.reduce((acc, prop) => acc + prop.units.length, 0),
    occupiedUnits: properties.reduce((acc, prop) => acc + prop.units.filter(u => u.status === 'occupied').length, 0),
    totalRevenue: 12500
  };

  const translations = {
    ar: {
      dashboard: 'لوحة التحكم',
      welcome: 'مرحباً',
      totalProperties: 'إجمالي العقارات',
      totalUnits: 'إجمالي الوحدات',
      occupiedUnits: 'الوحدات المشغولة',
      revenue: 'إجمالي الإيرادات',
      myProperties: 'عقاراتي',
      addProperty: 'إضافة عقار جديد',
      noProperties: 'لا توجد عقارات',
      noPropertiesDesc: 'ابدأ بإضافة عقارك الأول',
      units: 'وحدة',
      available: 'متاحة',
      occupied: 'مشغولة',
      maintenance: 'صيانة',
      viewDetails: 'عرض التفاصيل',
      generateQR: 'رمز QR',
      logout: 'تسجيل الخروج',
      checkoutRequests: 'طلبات المغادرة',
      newCheckout: 'طلب مغادرة جديد',
      guestName: 'اسم النزيل',
      unitCondition: 'حالة الوحدة',
      rating: 'التقييم',
      checkOutDate: 'تاريخ المغادرة',
      processRefund: 'معالجة الاسترداد',
      refundType: 'نوع الاسترداد',
      fullRefund: 'استرداد كامل',
      partialRefund: 'استرداد جزئي',
      noRefund: 'لا يوجد استرداد',
      refundAmount: 'مبلغ الاسترداد',
      refundReason: 'سبب الاسترداد الجزئي/عدم الاسترداد',
      processDeposit: 'معالجة التأمين',
      pending: 'في الانتظار',
      approved: 'موافق عليه',
      waitingApproval: 'في انتظار موافقة النزيل'
    },
    en: {
      dashboard: 'Dashboard',
      welcome: 'Welcome',
      totalProperties: 'Total Properties',
      totalUnits: 'Total Units',
      occupiedUnits: 'Occupied Units',
      revenue: 'Total Revenue',
      myProperties: 'My Properties',
      addProperty: 'Add New Property',
      noProperties: 'No Properties',
      noPropertiesDesc: 'Start by adding your first property',
      units: 'units',
      available: 'Available',
      occupied: 'Occupied',
      maintenance: 'Maintenance',
      viewDetails: 'View Details',
      generateQR: 'QR Code',
      logout: 'Logout',
      checkoutRequests: 'Checkout Requests',
      newCheckout: 'New Checkout Request',
      guestName: 'Guest Name',
      unitCondition: 'Unit Condition',
      rating: 'Rating',
      checkOutDate: 'Check-Out Date',
      processRefund: 'Process Refund',
      refundType: 'Refund Type',
      fullRefund: 'Full Refund',
      partialRefund: 'Partial Refund',
      noRefund: 'No Refund',
      refundAmount: 'Refund Amount',
      refundReason: 'Reason for partial/no refund',
      processDeposit: 'Process Deposit',
      pending: 'Pending',
      approved: 'Approved',
      waitingApproval: 'Waiting for Guest Approval'
    }
  };

  const t_local = (key: keyof typeof translations.ar) => translations[language][key];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRefundDecision = (request: CheckoutRequest) => {
    const updatedRequest = {
      ...request,
      depositRefundStatus: refundDecision.type as 'full' | 'partial' | 'none',
      refundAmount: refundDecision.type === 'partial' ? parseFloat(refundDecision.amount) : 
                   refundDecision.type === 'full' ? 500 : 0,
      refundReason: refundDecision.reason,
      guestApproved: refundDecision.type === 'full' ? true : false
    };

    setCheckoutRequests(prev => prev.map(r => r.id === request.id ? updatedRequest : r));
    setSelectedRequest(null);
    setRefundDecision({ type: 'full', amount: '', reason: '' });

    toast({
      title: language === 'ar' ? 'تم معالجة طلب الاسترداد' : 'Refund Request Processed',
      description: refundDecision.type === 'full' 
        ? (language === 'ar' ? 'سيتم الاسترداد الكامل خلال 2-3 أيام' : 'Full refund will be processed in 2-3 days')
        : (language === 'ar' ? 'في انتظار موافقة النزيل' : 'Waiting for guest approval')
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              {t_local('welcome')}, {user?.name}
            </h1>
            <p className="text-muted-foreground">{t_local('dashboard')}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/host/add-property')} variant="cta">
              <Plus className="mr-2 h-4 w-4" />
              {t_local('addProperty')}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t_local('totalProperties')}</p>
                  <p className="text-2xl font-bold">{stats.totalProperties}</p>
                </div>
                <Building className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t_local('totalUnits')}</p>
                  <p className="text-2xl font-bold">{stats.totalUnits}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t_local('occupiedUnits')}</p>
                  <p className="text-2xl font-bold">{stats.occupiedUnits}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Checkout Requests Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              {t_local('checkoutRequests')}
              {checkoutRequests.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {checkoutRequests.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {checkoutRequests.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                {language === 'ar' ? 'لا توجد طلبات مغادرة' : 'No checkout requests'}
              </div>
            ) : (
              <div className="space-y-4">
                {checkoutRequests.map((request) => (
                  <Card key={request.id} className="border-soft">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{request.guestName}</h3>
                            <Badge 
                              className={`${
                                request.depositRefundStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                request.depositRefundStatus === 'full' && request.guestApproved ? 'bg-green-100 text-green-800' :
                                'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {request.depositRefundStatus === 'pending' ? t_local('pending') :
                               request.depositRefundStatus === 'full' && request.guestApproved ? t_local('approved') :
                               t_local('waitingApproval')}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {request.unitName} - {request.propertyName}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {new Date(request.checkOutDate).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                            </span>
                            <span className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4" />
                              {language === 'ar' ? 'الحالة: ' : 'Condition: '}{request.unitCondition}
                            </span>
                            <span className="flex items-center gap-1">
                              ⭐ {request.rating}/5
                            </span>
                          </div>
                          {request.guestReview && (
                            <p className="text-sm italic text-muted-foreground">
                              "{request.guestReview}"
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {request.depositRefundStatus === 'pending' && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedRequest(request)}
                                >
                                  {t_local('processRefund')}
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>{t_local('processDeposit')}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label className="text-sm font-medium">{t_local('refundType')}</Label>
                                    <RadioGroup
                                      value={refundDecision.type}
                                      onValueChange={(value) => setRefundDecision(prev => ({ ...prev, type: value as any }))}
                                      className="mt-2"
                                    >
                                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <RadioGroupItem value="full" id="full-host" />
                                        <label htmlFor="full-host" className="text-sm">
                                          {t_local('fullRefund')} (500 ر.س)
                                        </label>
                                      </div>
                                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <RadioGroupItem value="partial" id="partial-host" />
                                        <label htmlFor="partial-host" className="text-sm">
                                          {t_local('partialRefund')}
                                        </label>
                                      </div>
                                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <RadioGroupItem value="none" id="none-host" />
                                        <label htmlFor="none-host" className="text-sm">
                                          {t_local('noRefund')}
                                        </label>
                                      </div>
                                    </RadioGroup>
                                  </div>

                                  {refundDecision.type === 'partial' && (
                                    <div>
                                      <Label htmlFor="refund-amount" className="text-sm font-medium">
                                        {t_local('refundAmount')} (ر.س)
                                      </Label>
                                      <Input
                                        id="refund-amount"
                                        type="number"
                                        value={refundDecision.amount}
                                        onChange={(e) => setRefundDecision(prev => ({ ...prev, amount: e.target.value }))}
                                        placeholder="0"
                                        max="500"
                                      />
                                    </div>
                                  )}

                                  {(refundDecision.type === 'partial' || refundDecision.type === 'none') && (
                                    <div>
                                      <Label htmlFor="refund-reason" className="text-sm font-medium">
                                        {t_local('refundReason')}
                                      </Label>
                                      <Textarea
                                        id="refund-reason"
                                        value={refundDecision.reason}
                                        onChange={(e) => setRefundDecision(prev => ({ ...prev, reason: e.target.value }))}
                                        placeholder={language === 'ar' ? 'اذكر السبب...' : 'Enter reason...'}
                                        className="min-h-[80px]"
                                      />
                                    </div>
                                  )}

                                  <div className="flex gap-2">
                                    <Button
                                      onClick={() => selectedRequest && handleRefundDecision(selectedRequest)}
                                      className="flex-1"
                                      variant="cta"
                                      disabled={
                                        refundDecision.type === 'partial' && (!refundDecision.amount || !refundDecision.reason) ||
                                        refundDecision.type === 'none' && !refundDecision.reason
                                      }
                                    >
                                      {language === 'ar' ? 'معالجة' : 'Process'}
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Properties Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t_local('myProperties')}
              <Button 
                onClick={() => navigate('/host/add-property')} 
                variant="outline"
                size="sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t_local('addProperty')}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {properties.length === 0 ? (
              <div className="text-center py-8">
                <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">{t_local('noProperties')}</h3>
                <p className="text-muted-foreground mb-4">{t_local('noPropertiesDesc')}</p>
                <Button onClick={() => navigate('/host/add-property')} variant="cta">
                  <Plus className="mr-2 h-4 w-4" />
                  {t_local('addProperty')}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <Card key={property.id} className="border-soft">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg">{property.name}</h3>
                          <p className="text-sm text-muted-foreground">{property.location}</p>
                          <p className="text-xs text-muted-foreground">{property.tourismLicense}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {property.units.length} {t_local('units')}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {property.units.map((unit) => (
                              <Badge 
                                key={unit.id} 
                                className={getStatusColor(unit.status)}
                                variant="secondary"
                              >
                                {unit.name}: {t_local(unit.status as any)}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            onClick={() => navigate(`/host/property/${property.id}`)}
                            variant="outline" 
                            size="sm"
                            className="flex-1"
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            {t_local('viewDetails')}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              const link = `${window.location.origin}/guest/checkin/${property.units[0]?.id || '1'}`;
                              navigator.clipboard.writeText(link);
                              toast({
                                title: language === 'ar' ? 'تم نسخ الرابط' : 'Link Copied',
                                description: link
                              });
                            }}
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HostDashboard;