import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FilterBar } from '@/components/FilterBar';
import { ProductGrid } from '@/components/ProductGrid';
import { Cart } from '@/components/Cart';
import { AddProductForm } from '@/components/AddProductForm';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const Index = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Header onAddProductClick={() => setIsAddProductOpen(true)} />
        
        <main>
          <HeroSection />
          
          <section className="container mx-auto px-4 py-12">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Featured Products</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover our handpicked selection of trending products from top brands worldwide
                </p>
              </div>
              
              <FilterBar />
              <ProductGrid />
            </div>
          </section>
        </main>

        <Cart />
        <AddProductForm 
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
        />
      </div>
    </QueryClientProvider>
  );
};

export default Index;
