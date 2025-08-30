import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, X } from 'lucide-react';
import { Product } from '@/lib/api';
import { useCartStore } from '@/stores/useCartStore';
import { toast } from '@/hooks/use-toast';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const { addItem } = useCartStore();

  if (!product) return null;

  const handleAddToCart = () => {
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
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'fill-rating-color text-rating-color'
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold mb-2">
                {product.title}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{product.category}</Badge>
                <div className="flex items-center gap-1">
                  {renderStars(product.rating.rate)}
                  <span className="text-sm text-muted-foreground ml-1">
                    ({product.rating.count} reviews)
                  </span>
                </div>
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-price-color">
                  {formatPrice(product.price)}
                </span>
              </div>

              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full btn-primary text-lg py-6"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-muted rounded-lg">
                  <span className="font-medium">Category:</span>
                  <p className="text-muted-foreground capitalize">{product.category}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <span className="font-medium">Rating:</span>
                  <p className="text-muted-foreground">{product.rating.rate}/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};