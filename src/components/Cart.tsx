import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCartStore, CartItem } from '@/stores/useCartStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const CartItemComponent = ({ item }: { item: CartItem }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-start gap-4 py-4">
      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
        <p className="text-price-color font-semibold mt-1">
          ${item.price.toFixed(2)}
        </p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="h-7 w-7 p-0"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Badge variant="secondary" className="px-2">
              {item.quantity}
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="h-7 w-7 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => removeItem(item.id)}
            className="text-destructive hover:text-destructive h-7 w-7 p-0"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Cart = () => {
  const { items, isOpen, setIsOpen, getTotalItems, getTotalPrice, clearCart } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({totalItems} items)
          </SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add some products to get started</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 -mx-6 px-6">
              {items.map((item) => (
                <div key={item.id}>
                  <CartItemComponent item={item} />
                  <Separator />
                </div>
              ))}
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />
              
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-price-color">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <Button size="lg" className="w-full btn-primary">
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="w-full"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};