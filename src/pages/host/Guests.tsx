import { useLanguage } from '@/hooks/useLanguage';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, User, Phone, Calendar, MapPin, Eye, UserCheck, UserX } from 'lucide-react';
import { Guest } from '@/types';
import { useState } from 'react';

const GuestsPage = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const translations = {
    ar: {
      title: 'الضيوف',
      description: 'إدارة جميع الضيوف والحجوزات',
      searchGuests: 'البحث عن الضيوف',
      guestName: 'اسم الضيف',
      phone: 'الهاتف',
      property: 'العقار',
      checkIn: 'تاريخ الوصول',
      checkOut: 'تاريخ المغادرة',
      status: 'الحالة',
      actions: 'الإجراءات',
      pending: 'قيد الانتظار',
      checkedIn: 'وصل',
      checkedOut: 'غادر',
      view: 'عرض',
      approve: 'موافقة',
      reject: 'رفض',
      noGuests: 'لا يوجد ضيوف',
      noGuestsDesc: 'لم يتم تسجيل أي ضيوف بعد',
      companions: 'مرافقين'
    },
    en: {
      title: 'Guests',
      description: 'Manage all guests and bookings',
      searchGuests: 'Search guests',
      guestName: 'Guest Name',
      phone: 'Phone',
      property: 'Property',
      checkIn: 'Check In',
      checkOut: 'Check Out',
      status: 'Status',
      actions: 'Actions',
      pending: 'Pending',
      checkedIn: 'Checked In',
      checkedOut: 'Checked Out',
      view: 'View',
      approve: 'Approve',
      reject: 'Reject',
      noGuests: 'No Guests',
      noGuestsDesc: 'No guests have been registered yet',
      companions: 'companions'
    }
  };

  const t = (key: keyof typeof translations.ar) => translations[language][key];

  // Mock data for demonstration
  const mockGuests: Guest[] = [
    {
      id: '1',
      unitId: 'unit1',
      name: language === 'ar' ? 'أحمد محمد العلي' : 'Ahmed Mohammed Ali',
      email: 'ahmed@example.com',
      phone: '+966501234567',
      idNumber: '1234567890',
      companions: [
        { name: language === 'ar' ? 'فاطمة أحمد' : 'Fatima Ahmed', idNumber: '0987654321', relationship: language === 'ar' ? 'زوجة' : 'Wife' }
      ],
      checkInDate: new Date('2024-01-20'),
      checkOutDate: new Date('2024-01-25'),
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
    },
    {
      id: '2',
      unitId: 'unit2',
      name: language === 'ar' ? 'سارة خالد المطيري' : 'Sara Khalid Al-Mutairi',
      email: 'sara@example.com',
      phone: '+966507654321',
      idNumber: '5678901234',
      companions: [],
      checkInDate: new Date('2024-01-22'),
      registrationCard: {
        id: 'rc2',
        guestApproved: true,
        hostApproved: false,
        generatedAt: new Date('2024-01-21'),
        data: {}
      },
      deposit: {
        id: 'dep2',
        amount: 300,
        method: 'card',
        status: 'pending'
      },
      status: 'pending'
    },
    {
      id: '3',
      unitId: 'unit3',
      name: language === 'ar' ? 'محمد عبدالله السعيد' : 'Mohammed Abdullah Al-Saeed',
      email: 'mohammed@example.com',
      phone: '+966502345678',
      idNumber: '9876543210',
      companions: [
        { name: language === 'ar' ? 'عائشة محمد' : 'Aisha Mohammed', idNumber: '1357924680', relationship: language === 'ar' ? 'زوجة' : 'Wife' },
        { name: language === 'ar' ? 'عبدالله محمد' : 'Abdullah Mohammed', idNumber: '2468013579', relationship: language === 'ar' ? 'ابن' : 'Son' }
      ],
      checkInDate: new Date('2024-01-18'),
      checkOutDate: new Date('2024-01-21'),
      registrationCard: {
        id: 'rc3',
        guestApproved: true,
        hostApproved: true,
        generatedAt: new Date('2024-01-18'),
        data: {}
      },
      deposit: {
        id: 'dep3',
        amount: 400,
        method: 'iban',
        status: 'refunded',
        paidAt: new Date('2024-01-17'),
        refundedAt: new Date('2024-01-21')
      },
      status: 'checked-out'
    }
  ];

  const getStatusBadge = (status: Guest['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">{t('pending')}</Badge>;
      case 'checked-in':
        return <Badge variant="default">{t('checkedIn')}</Badge>;
      case 'checked-out':
        return <Badge variant="outline">{t('checkedOut')}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredGuests = mockGuests.filter(guest =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.phone.includes(searchQuery) ||
    guest.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t('searchGuests')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {filteredGuests.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <User className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('noGuests')}</h3>
              <p className="text-muted-foreground">{t('noGuestsDesc')}</p>
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
                    <TableHead>{t('guestName')}</TableHead>
                    <TableHead>{t('phone')}</TableHead>
                    <TableHead>{t('property')}</TableHead>
                    <TableHead>{t('checkIn')}</TableHead>
                    <TableHead>{t('checkOut')}</TableHead>
                    <TableHead>{t('status')}</TableHead>
                    <TableHead className="text-right">{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGuests.map((guest) => (
                    <TableRow key={guest.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <div>
                            <div>{guest.name}</div>
                            {guest.companions.length > 0 && (
                              <div className="text-xs text-muted-foreground">
                                +{guest.companions.length} {t('companions')}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {guest.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {language === 'ar' ? 'شقة الرياض الفاخرة' : 'Luxury Riyadh Apartment'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {guest.checkInDate.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                        </div>
                      </TableCell>
                      <TableCell>
                        {guest.checkOutDate ? (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {guest.checkOutDate.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                          </div>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(guest.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {guest.status === 'pending' && (
                            <>
                              <Button variant="outline" size="sm">
                                <UserCheck className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <UserX className="h-4 w-4" />
                              </Button>
                            </>
                          )}
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

export default GuestsPage;