import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Discover Amazing 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Products</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Browse our extensive catalog of quality products with seamless shopping experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="min-w-[160px]">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg" className="min-w-[160px]">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide the best shopping experience with quality products and excellent service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Wide Selection</h3>
                <p className="text-muted-foreground">
                  Thousands of products across multiple categories to meet all your needs
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Secure Shopping</h3>
                <p className="text-muted-foreground">
                  Your data is protected with industry-standard security measures
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Truck className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Quick and reliable delivery to your doorstep
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">
              Ready to Start Shopping?
            </h2>
            <p className="text-muted-foreground">
              Join thousands of satisfied customers and discover your next favorite product
            </p>
            <Link to="/products">
              <Button size="lg" className="min-w-[200px]">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
