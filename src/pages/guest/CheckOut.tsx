import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GuestCheckOut = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <Card>
        <CardHeader>
          <CardTitle>Check Out</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Check-out process coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestCheckOut;