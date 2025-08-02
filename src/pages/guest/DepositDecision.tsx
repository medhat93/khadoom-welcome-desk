import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, AlertTriangle, FileText, DollarSign, MessageSquare } from 'lucide-react';

interface DepositRequest {
  id: string;
  guestName: string;
  unitName: string;
  propertyName: string;
  originalDeposit: number;
  proposedRefund: number;
  deductionAmount: number;
  reason: string;
  photos: string[];
  status: 'pending' | 'accepted' | 'rejected';
  submittedDate: string;
}

const DepositDecision = () => {
  const { requestId } = useParams();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [decision, setDecision] = useState<'accept' | 'reject' | null>(null);
  const [guestComment, setGuestComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock request data
  const [request] = useState<DepositRequest>({
    id: requestId || '2',
    guestName: 'سارة أحمد',
    unitName: 'الوحدة الثانية',
    propertyName: 'شقة الروشة المطلة على البحر',
    originalDeposit: 500,
    proposedRefund: 300,
    deductionAmount: 200,
    reason: 'كسر في الكوب وبقعة على السجادة',
    photos: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    status: 'pending',
    submittedDate: new Date().toLocaleDateString()
  });

  const translations = {
    ar: {
      title: 'قرار استرداد التأمين',
      subtitle: 'مراجعة طلب خصم من التأمين',
      guestName: 'النزيل',
      unit: 'الوحدة',
      property: 'العقار',
      originalDeposit: 'مبلغ التأمين الأصلي',
      proposedRefund: 'المبلغ المقترح للاسترداد',
      deductionAmount: 'مبلغ الخصم',
      reason: 'سبب الخصم',
      evidence: 'الصور والأدلة',
      decision: 'قرارك',
      accept: 'أوافق على الخصم',
      reject: 'أرفض الخصم',
      comment: 'تعليق (اختياري)',
      commentPlaceholder: 'أضف تعليقك هنا...',
      submit: 'إرسال القرار',
      submitting: 'جاري الإرسال...',
      acceptedTitle: 'تم قبول الخصم',
      rejectedTitle: 'تم رفض الخصم',
      acceptedDesc: 'سيتم تحويل المبلغ خلال 2-3 أيام عمل',
      rejectedDesc: 'سيقوم المضيف بمراجعة اعتراضك',
      backToHome: 'العودة للصفحة الرئيسية',
      processingTime: 'وقت المعالجة',
      businessDays: 'يوم عمل',
      invalidRequest: 'طلب غير صالح',
      requestNotFound: 'لم يتم العثور على الطلب'
    },
    en: {
      title: 'Deposit Refund Decision',
      subtitle: 'Review Deposit Deduction Request',
      guestName: 'Guest',
      unit: 'Unit',
      property: 'Property',
      originalDeposit: 'Original Deposit',
      proposedRefund: 'Proposed Refund',
      deductionAmount: 'Deduction Amount',
      reason: 'Reason for Deduction',
      evidence: 'Photos & Evidence',
      decision: 'Your Decision',
      accept: 'Accept Deduction',
      reject: 'Reject Deduction',
      comment: 'Comment (Optional)',
      commentPlaceholder: 'Add your comment here...',
      submit: 'Submit Decision',
      submitting: 'Submitting...',
      acceptedTitle: 'Deduction Accepted',
      rejectedTitle: 'Deduction Rejected',
      acceptedDesc: 'Amount will be transferred within 2-3 business days',
      rejectedDesc: 'Host will review your objection',
      backToHome: 'Back to Home',
      processingTime: 'Processing Time',
      businessDays: 'business days',
      invalidRequest: 'Invalid Request',
      requestNotFound: 'Request not found'
    }
  };

  const t = (key: keyof typeof translations.ar) => translations[language][key];

  const handleSubmit = async () => {
    if (!decision) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: decision === 'accept' ? t('acceptedTitle') : t('rejectedTitle'),
        description: decision === 'accept' ? t('acceptedDesc') : t('rejectedDesc')
      });
      setIsSubmitting(false);
    }, 2000);
  };

  if (!request) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">{t('invalidRequest')}</h2>
            <p className="text-muted-foreground">{t('requestNotFound')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (decision && !isSubmitting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            {decision === 'accept' ? (
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            ) : (
              <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
            )}
            <h2 className="text-xl font-semibold mb-2">
              {decision === 'accept' ? t('acceptedTitle') : t('rejectedTitle')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {decision === 'accept' ? t('acceptedDesc') : t('rejectedDesc')}
            </p>
            {decision === 'accept' && (
              <div className="bg-green-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-green-700">
                  {t('processingTime')}: 2-3 {t('businessDays')}
                </p>
                <p className="text-sm font-medium text-green-800">
                  {request.proposedRefund} ر.س
                </p>
              </div>
            )}
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full"
              variant="outline"
            >
              {t('backToHome')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold mb-2">{t('title')}</h1>
          <p className="opacity-90">{t('subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Request Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t('subtitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">{t('guestName')}:</span>
                    <p className="font-medium">{request.guestName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t('unit')}:</span>
                    <p className="font-medium">{request.unitName}</p>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('property')}:</span>
                  <p className="font-medium">{request.propertyName}</p>
                </div>
              </CardContent>
            </Card>

            {/* Financial Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  المبالغ المالية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <span className="text-sm text-blue-600">{t('originalDeposit')}</span>
                    <p className="text-lg font-bold text-blue-800">{request.originalDeposit} ر.س</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <span className="text-sm text-red-600">{t('deductionAmount')}</span>
                    <p className="text-lg font-bold text-red-800">-{request.deductionAmount} ر.س</p>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <span className="text-sm text-green-600">{t('proposedRefund')}</span>
                  <p className="text-2xl font-bold text-green-800">{request.proposedRefund} ر.س</p>
                </div>
              </CardContent>
            </Card>

            {/* Reason & Evidence */}
            <Card>
              <CardHeader>
                <CardTitle>{t('reason')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{request.reason}</p>
                
                <div>
                  <h4 className="font-medium mb-2">{t('evidence')}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {request.photos.map((photo, index) => (
                      <div key={index} className="bg-muted rounded-lg aspect-video flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">صورة {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Decision Panel */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  {t('decision')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Decision Buttons */}
                <div className="space-y-3">
                  <Button
                    variant={decision === 'accept' ? 'default' : 'outline'}
                    onClick={() => setDecision('accept')}
                    className="w-full justify-start"
                    size="lg"
                  >
                    <CheckCircle className="mr-2 h-5 w-5" />
                    {t('accept')}
                  </Button>
                  
                  <Button
                    variant={decision === 'reject' ? 'destructive' : 'outline'}
                    onClick={() => setDecision('reject')}
                    className="w-full justify-start"
                    size="lg"
                  >
                    <XCircle className="mr-2 h-5 w-5" />
                    {t('reject')}
                  </Button>
                </div>

                {/* Selected Decision Info */}
                {decision && (
                  <div className={`p-4 rounded-lg border ${
                    decision === 'accept' 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <p className={`text-sm font-medium ${
                      decision === 'accept' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {decision === 'accept' 
                        ? `سيتم تحويل ${request.proposedRefund} ر.س خلال 2-3 أيام عمل`
                        : 'سيتم إرسال اعتراضك للمضيف للمراجعة'
                      }
                    </p>
                  </div>
                )}

                {/* Comment Section */}
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('comment')}</label>
                  <Textarea
                    value={guestComment}
                    onChange={(e) => setGuestComment(e.target.value)}
                    placeholder={t('commentPlaceholder')}
                    rows={3}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={!decision || isSubmitting}
                  className="w-full"
                  variant="cta"
                  size="lg"
                >
                  {isSubmitting ? t('submitting') : t('submit')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositDecision;