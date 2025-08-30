import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';

const UnauthorizedPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <ShieldAlert className="h-16 w-16 mx-auto mb-4 text-warning" />
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              You don't have permission to access this page. Admin privileges are required.
            </p>
            <div className="space-y-2">
              <Link to="/" className="block">
                <Button className="w-full">Go Home</Button>
              </Link>
              <Link to="/products" className="block">
                <Button variant="outline" className="w-full">
                  Browse Products
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UnauthorizedPage;