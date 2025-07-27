import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Plus, Building, Users, DollarSign, TrendingUp, QrCode, Settings } from 'lucide-react';
import type { Property, Unit } from '@/types';

const HostDashboard = () => {
  const { language } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Mock data for prototype
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
          depositAmount: 500,
          terms: 'شروط الإقامة الأساسية',
          checkInLink: '/guest/checkin/2',
          qrCode: 'QR_CODE_2',
          status: 'available'
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
      logout: 'تسجيل الخروج'
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
      logout: 'Logout'
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
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
            <Button onClick={logout} variant="outline">
              {t_local('logout')}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t_local('revenue')}</p>
                  <p className="text-2xl font-bold">{stats.totalRevenue} ر.س</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

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
                            onClick={() => alert('QR Code generation')}
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