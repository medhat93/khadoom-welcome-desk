import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Building, Search, Check } from 'lucide-react';

const AddProperty = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    tourismLicense: '',
    name: '',
    description: '',
    type: 'apartment' as 'apartment' | 'villa' | 'chalet',
    location: '',
    autoFetched: false
  });
  const [loading, setLoading] = useState(false);
  const [fetchingLicense, setFetchingLicense] = useState(false);

  const handleLicenseFetch = async () => {
    if (!formData.tourismLicense) return;
    
    setFetchingLicense(true);
    // Mock API call to Ministry
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        name: 'شقة الروشة المطلة على البحر - مرخصة',
        description: 'شقة سياحية مرخصة من وزارة السياحة',
        location: 'جدة - الروشة',
        type: 'apartment',
        autoFetched: true
      }));
      setFetchingLicense(false);
      toast({
        title: language === 'ar' ? 'تم جلب البيانات' : 'Data Fetched',
        description: language === 'ar' ? 'تم جلب بيانات العقار من الوزارة' : 'Property data fetched from Ministry'
      });
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock save
    setTimeout(() => {
      setLoading(false);
      toast({
        title: language === 'ar' ? 'تم إضافة العقار' : 'Property Added',
        description: language === 'ar' ? 'تم إضافة العقار بنجاح' : 'Property added successfully'
      });
      navigate('/host/dashboard');
    }, 1000);
  };

  const translations = {
    ar: {
      addProperty: 'إضافة عقار جديد',
      back: 'رجوع',
      tourismLicense: 'رقم الرخصة السياحية',
      fetchFromMinistry: 'جلب من الوزارة',
      fetching: 'جاري الجلب...',
      propertyName: 'اسم العقار',
      description: 'الوصف',
      propertyType: 'نوع العقار',
      apartment: 'شقة',
      villa: 'فيلا',
      chalet: 'شاليه',
      location: 'الموقع',
      save: 'حفظ العقار',
      saving: 'جاري الحفظ...',
      optional: 'اختياري',
      autoFetched: 'تم جلبها تلقائياً',
      manualEntry: 'أو أدخل البيانات يدوياً'
    },
    en: {
      addProperty: 'Add New Property',
      back: 'Back',
      tourismLicense: 'Tourism License Number',
      fetchFromMinistry: 'Fetch from Ministry',
      fetching: 'Fetching...',
      propertyName: 'Property Name',
      description: 'Description',
      propertyType: 'Property Type',
      apartment: 'Apartment',
      villa: 'Villa',
      chalet: 'Chalet',
      location: 'Location',
      save: 'Save Property',
      saving: 'Saving...',
      optional: 'Optional',
      autoFetched: 'Auto-fetched',
      manualEntry: 'Or enter data manually'
    }
  };

  const t_local = (key: keyof typeof translations.ar) => translations[language][key];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              onClick={() => navigate('/host/dashboard')} 
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t_local('back')}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">{t_local('addProperty')}</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tourism License */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {t_local('tourismLicense')} ({t_local('optional')})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="TR-123456"
                    value={formData.tourismLicense}
                    onChange={(e) => setFormData(prev => ({ ...prev, tourismLicense: e.target.value }))}
                    className="flex-1"
                  />
                  <Button 
                    type="button"
                    onClick={handleLicenseFetch}
                    disabled={!formData.tourismLicense || fetchingLicense}
                    variant="outline"
                  >
                    {fetchingLicense ? (
                      <>{t_local('fetching')}</>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        {t_local('fetchFromMinistry')}
                      </>
                    )}
                  </Button>
                </div>
                
                {formData.autoFetched && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <Check className="h-4 w-4" />
                    {t_local('autoFetched')}
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground">
                  {t_local('manualEntry')}
                </p>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>{t_local('propertyName')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className={formData.autoFetched ? 'bg-green-50' : ''}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t_local('description')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className={formData.autoFetched ? 'bg-green-50' : ''}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t_local('propertyType')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className={formData.autoFetched ? 'bg-green-50' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">{t_local('apartment')}</SelectItem>
                    <SelectItem value="villa">{t_local('villa')}</SelectItem>
                    <SelectItem value="chalet">{t_local('chalet')}</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t_local('location')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  required
                  className={formData.autoFetched ? 'bg-green-50' : ''}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
              variant="cta"
              size="lg"
            >
              {loading ? t_local('saving') : t_local('save')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;