import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/api';
import { useCartStore } from '@/stores/useCartStore';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? 'fill-rating-color text-rating-color'
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <Card 
      className="group cursor-pointer card-hover border-0 shadow-md hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          
          <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center gap-1">
            {renderStars(product.rating.rate)}
            <span className="text-sm text-muted-foreground ml-1">
              ({product.rating.count})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-price-color">
              {formatPrice(product.price)}
            </span>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="btn-primary"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};