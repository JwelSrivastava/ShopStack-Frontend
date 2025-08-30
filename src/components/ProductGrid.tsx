import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { api, Product } from '@/lib/api';
import { useFilterStore } from '@/stores/useFilterStore';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const ProductSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="aspect-square rounded-lg" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  </div>
);

export const ProductGrid = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { searchTerm, selectedCategory } = useFilterStore();

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => 
      selectedCategory 
        ? api.getProductsByCategory(selectedCategory)
        : api.getAllProducts(),
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load products. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 12 }, (_, i) => (
              <ProductSkeleton key={i} />
            ))
          : filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
      </div>

      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {searchTerm || selectedCategory 
              ? 'No products found matching your criteria.' 
              : 'No products available.'}
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};