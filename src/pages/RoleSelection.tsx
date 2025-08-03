import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Home, Key } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to CheckIn Pro
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your role to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Host Card */}
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" 
                onClick={() => navigate('/landing')}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Home className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">I'm a Host</CardTitle>
              <CardDescription className="text-base">
                Manage your properties and guests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Add and manage properties</li>
                <li>• Track guest check-ins/check-outs</li>
                <li>• Handle deposits and damages</li>
                <li>• View guest information</li>
              </ul>
              <Button className="w-full mt-6" size="lg">
                Start as Host
              </Button>
            </CardContent>
          </Card>

          {/* Guest Card */}
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => navigate('/guest/checkin/1')}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <Key className="w-10 h-10 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl">I'm a Guest</CardTitle>
              <CardDescription className="text-base">
                Check in to your accommodation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Quick check-in process</li>
                <li>• Upload required documents</li>
                <li>• Review terms and conditions</li>
                <li>• Access your stay information</li>
              </ul>
              <Button className="w-full mt-6" variant="secondary" size="lg">
                Start Check-in
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;