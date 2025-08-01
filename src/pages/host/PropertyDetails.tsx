import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, Settings, QrCode, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const PropertyDetails = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [showAddUnitDialog, setShowAddUnitDialog] = useState(false);
  const [newUnit, setNewUnit] = useState({
    name: '',
    depositAmount: ''
  });

  // Mock property data
  const [property, setProperty] = useState({
    id: id,
    name: 'شقة الروشة المطلة على البحر',
    description: 'شقة فاخرة بإطلالة رائعة على البحر',
    type: 'apartment',
    location: 'جدة - الروشة',
    tourismLicense: 'TR-123456',
    units: [
      {
        id: '1',
        name: 'الوحدة الأولى',
        depositAmount: 500,
        checkInLink: `${window.location.origin}/guest/checkin/1`,
        status: 'occupied'
      },
      {
        id: '2',
        name: 'الوحدة الثانية',
        depositAmount: 500,
        checkInLink: `${window.location.origin}/guest/checkin/2`,
        status: 'available'
      }
    ]
  });

  const translations = {
    ar: {
      propertyDetails: 'تفاصيل العقار',
      back: 'رجوع',
      addUnit: 'إضافة وحدة',
      units: 'الوحدات',
      unitName: 'اسم الوحدة',
      deposit: 'مبلغ التأمين',
      status: 'الحالة',
      actions: 'الإجراءات',
      copyLink: 'نسخ الرابط',
      linkCopied: 'تم نسخ الرابط',
      generateQR: 'رمز QR',
      editUnit: 'تعديل الوحدة',
      available: 'متاحة',
      occupied: 'مشغولة',
      maintenance: 'صيانة',
      propertyInfo: 'معلومات العقار',
      location: 'الموقع',
      type: 'النوع',
      license: 'رقم الرخصة',
      addUnitDialog: 'إضافة وحدة جديدة',
      unitNameLabel: 'اسم الوحدة',
      depositLabel: 'مبلغ التأمين (ريال)',
      cancel: 'إلغاء',
      addUnitBtn: 'إضافة وحدة',
      unitAdded: 'تم إضافة الوحدة بنجاح'
    },
    en: {
      propertyDetails: 'Property Details',
      back: 'Back',
      addUnit: 'Add Unit',
      units: 'Units',
      unitName: 'Unit Name',
      deposit: 'Deposit Amount',
      status: 'Status',
      actions: 'Actions',
      copyLink: 'Copy Link',
      linkCopied: 'Link Copied',
      generateQR: 'QR Code',
      editUnit: 'Edit Unit',
      available: 'Available',
      occupied: 'Occupied',
      maintenance: 'Maintenance',
      propertyInfo: 'Property Information',
      location: 'Location',
      type: 'Type',
      license: 'License Number',
      addUnitDialog: 'Add New Unit',
      unitNameLabel: 'Unit Name',
      depositLabel: 'Deposit Amount (SAR)',
      cancel: 'Cancel',
      addUnitBtn: 'Add Unit',
      unitAdded: 'Unit Added Successfully'
    }
  };

  const handleAddUnit = () => {
    if (!newUnit.name || !newUnit.depositAmount) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields',
        variant: 'destructive'
      });
      return;
    }

    const unitId = String(property.units.length + 1);
    const newUnitData = {
      id: unitId,
      name: newUnit.name,
      depositAmount: parseInt(newUnit.depositAmount),
      checkInLink: `${window.location.origin}/guest/checkin/${unitId}`,
      status: 'available' as const
    };

    setProperty(prev => ({
      ...prev,
      units: [...prev.units, newUnitData]
    }));

    setNewUnit({ name: '', depositAmount: '' });
    setShowAddUnitDialog(false);
    
    toast({
      title: t('unitAdded'),
      description: language === 'ar' ? `تم إضافة ${newUnit.name} بنجاح` : `${newUnit.name} added successfully`
    });
  };

  const t = (key: keyof typeof translations.ar) => translations[language][key];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = async (text: string, unitId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(unitId);
      toast({
        title: t('linkCopied'),
        description: text
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedLink(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            onClick={() => navigate('/host/dashboard')} 
            variant="outline"
            size="sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('back')}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">{t('propertyDetails')}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{t('propertyInfo')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{property.name}</h3>
                  <p className="text-muted-foreground">{property.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('location')}:</span>
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('type')}:</span>
                    <span className="text-sm">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('license')}:</span>
                    <span className="text-sm">{property.tourismLicense}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Units Management */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{t('units')}</CardTitle>
                  <Dialog open={showAddUnitDialog} onOpenChange={setShowAddUnitDialog}>
                    <DialogTrigger asChild>
                      <Button variant="cta" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        {t('addUnit')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{t('addUnitDialog')}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="unit-name" className="text-sm font-medium">
                            {t('unitNameLabel')}
                          </Label>
                          <Input
                            id="unit-name"
                            value={newUnit.name}
                            onChange={(e) => setNewUnit(prev => ({ ...prev, name: e.target.value }))}
                            placeholder={language === 'ar' ? 'مثال: الوحدة الثالثة' : 'Example: Unit Three'}
                          />
                        </div>
                        <div>
                          <Label htmlFor="deposit-amount" className="text-sm font-medium">
                            {t('depositLabel')}
                          </Label>
                          <Input
                            id="deposit-amount"
                            type="number"
                            value={newUnit.depositAmount}
                            onChange={(e) => setNewUnit(prev => ({ ...prev, depositAmount: e.target.value }))}
                            placeholder="500"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setShowAddUnitDialog(false)}
                            className="flex-1"
                          >
                            {t('cancel')}
                          </Button>
                          <Button
                            onClick={handleAddUnit}
                            className="flex-1"
                            variant="cta"
                          >
                            {t('addUnitBtn')}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {property.units.map((unit) => (
                    <div key={unit.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{unit.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {t('deposit')}: {unit.depositAmount} ر.س
                          </p>
                        </div>
                        <Badge className={getStatusColor(unit.status)} variant="secondary">
                          {t(unit.status as any)}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(unit.checkInLink, unit.id)}
                          className="flex-1"
                        >
                          {copiedLink === unit.id ? (
                            <Check className="mr-2 h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="mr-2 h-4 w-4" />
                          )}
                          {copiedLink === unit.id ? t('linkCopied') : t('copyLink')}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => alert('QR Code generation')}
                        >
                          <QrCode className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/host/unit/${unit.id}`)}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          {t('editUnit')}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;