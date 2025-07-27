import { useParams } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PropertyDetails = () => {
  const { id } = useParams();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background p-8">
      <Card>
        <CardHeader>
          <CardTitle>Property Details - {id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Property management features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyDetails;