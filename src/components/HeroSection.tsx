import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Shield, Truck } from 'lucide-react';
import heroImage from '@/assets/hero-ecommerce.jpg';

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-primary-light to-accent/5 overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Shop the{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Latest Trends
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover amazing products from top brands. Quality guaranteed, 
                fast shipping, and unbeatable prices.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-primary text-lg px-8">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Browse Categories
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="text-center space-y-2">
                <TrendingUp className="h-8 w-8 mx-auto text-primary" />
                <p className="text-sm font-medium">Trending Products</p>
              </div>
              <div className="text-center space-y-2">
                <Shield className="h-8 w-8 mx-auto text-primary" />
                <p className="text-sm font-medium">Secure Shopping</p>
              </div>
              <div className="text-center space-y-2">
                <Truck className="h-8 w-8 mx-auto text-primary" />
                <p className="text-sm font-medium">Fast Delivery</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={heroImage}
                alt="ShopStack Hero - Modern E-commerce"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-lg">
              <p className="text-sm font-medium">20,000+</p>
              <p className="text-xs">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};