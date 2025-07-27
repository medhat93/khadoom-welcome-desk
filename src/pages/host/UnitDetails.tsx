import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UnitDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background p-8">
      <Card>
        <CardHeader>
          <CardTitle>Unit Details - {id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Unit management features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitDetails;