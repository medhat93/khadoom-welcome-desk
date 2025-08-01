import { useLanguage } from '@/hooks/useLanguage';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Edit, Trash2, MapPin, Home } from 'lucide-react';
import { Property } from '@/types';
import { Link } from 'react-router-dom';

const PropertiesPage = () => {
  const { language } = useLanguage();

  const translations = {
    ar: {
      title: 'العقارات',
      description: 'إدارة جميع العقارات الخاصة بك',
      addProperty: 'إضافة عقار جديد',
      propertyName: 'اسم العقار',
      type: 'النوع',
      location: 'الموقع',
      units: 'الوحدات',
      status: 'الحالة',
      actions: 'الإجراءات',
      view: 'عرض',
      edit: 'تعديل',
      delete: 'حذف',
      apartment: 'شقة',
      villa: 'فيلا',
      chalet: 'شاليه',
      active: 'نشط',
      inactive: 'غير نشط',
      noProperties: 'لا توجد عقارات',
      noPropertiesDesc: 'ابدأ بإضافة عقارك الأول'
    },
    en: {
      title: 'Properties',
      description: 'Manage all your properties',
      addProperty: 'Add New Property',
      propertyName: 'Property Name',
      type: 'Type',
      location: 'Location',
      units: 'Units',
      status: 'Status',
      actions: 'Actions',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      apartment: 'Apartment',
      villa: 'Villa',
      chalet: 'Chalet',
      active: 'Active',
      inactive: 'Inactive',
      noProperties: 'No Properties',
      noPropertiesDesc: 'Start by adding your first property'
    }
  };

  const t = (key: keyof typeof translations.ar) => translations[language][key];

  // Mock data for demonstration
  const mockProperties: Property[] = [
    {
      id: '1',
      hostId: 'host1',
      name: language === 'ar' ? 'شقة الرياض الفاخرة' : 'Luxury Riyadh Apartment',
      description: language === 'ar' ? 'شقة فاخرة في وسط الرياض' : 'Luxury apartment in central Riyadh',
      type: 'apartment',
      location: language === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia',
      tourismLicense: 'TL123456',
      units: [],
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      hostId: 'host1',
      name: language === 'ar' ? 'فيلا جدة المطلة على البحر' : 'Jeddah Seaside Villa',
      description: language === 'ar' ? 'فيلا رائعة مطلة على البحر الأحمر' : 'Beautiful villa overlooking the Red Sea',
      type: 'villa',
      location: language === 'ar' ? 'جدة، المملكة العربية السعودية' : 'Jeddah, Saudi Arabia',
      tourismLicense: 'TL789012',
      units: [],
      createdAt: new Date('2024-02-10')
    },
    {
      id: '3',
      hostId: 'host1',
      name: language === 'ar' ? 'شاليه أبها الجبلي' : 'Abha Mountain Chalet',
      description: language === 'ar' ? 'شاليه جميل في جبال أبها' : 'Beautiful chalet in Abha mountains',
      type: 'chalet',
      location: language === 'ar' ? 'أبها، المملكة العربية السعودية' : 'Abha, Saudi Arabia',
      tourismLicense: 'TL345678',
      units: [],
      createdAt: new Date('2024-03-05')
    }
  ];

  const getTypeLabel = (type: Property['type']) => {
    return t(type as keyof typeof translations.ar);
  };

  const getTypeIcon = (type: Property['type']) => {
    switch (type) {
      case 'apartment':
        return <Home className="h-4 w-4" />;
      case 'villa':
        return <Home className="h-4 w-4" />;
      case 'chalet':
        return <Home className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary">{t('title')}</h1>
            <p className="text-muted-foreground">{t('description')}</p>
          </div>
          <Link to="/host/add-property">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {t('addProperty')}
            </Button>
          </Link>
        </div>

        {mockProperties.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Home className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('noProperties')}</h3>
              <p className="text-muted-foreground mb-4">{t('noPropertiesDesc')}</p>
              <Link to="/host/add-property">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('addProperty')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{t('title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('propertyName')}</TableHead>
                    <TableHead>{t('type')}</TableHead>
                    <TableHead>{t('location')}</TableHead>
                    <TableHead>{t('units')}</TableHead>
                    <TableHead>{t('status')}</TableHead>
                    <TableHead className="text-right">{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(property.type)}
                          {property.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {getTypeLabel(property.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {property.location}
                        </div>
                      </TableCell>
                      <TableCell>{property.units.length}</TableCell>
                      <TableCell>
                        <Badge variant="default">{t('active')}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link to={`/host/property/${property.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;