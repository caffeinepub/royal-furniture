import { useRemoveFromCart, useUpdateCartItem } from '../../hooks/useQueries';
import type { CartItem, Product } from '../../backend';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface CartItemCardProps {
  item: CartItem & { product?: Product };
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const removeFromCart = useRemoveFromCart();
  const updateCartItem = useUpdateCartItem();

  if (!item.product) return null;

  const imageUrl = item.product.images.length > 0 ? item.product.images[0].getDirectURL() : '/assets/generated/sofa-premium.dim_800x600.png';
  const price = Number(item.product.price);
  const discount = item.product.discount ? Number(item.product.discount) : 0;
  const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;
  const quantity = Number(item.quantity);
  const subtotal = discountedPrice * quantity;

  const handleRemove = async () => {
    try {
      await removeFromCart.mutateAsync(item.productId);
      toast.success('Removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem.mutateAsync({ productId: item.productId, quantity: BigInt(newQuantity) });
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  return (
    <div className="flex space-x-4 rounded-lg border border-gold-200/30 bg-white p-4">
      <img src={imageUrl} alt={item.product.name} className="h-24 w-24 rounded object-cover" />
      <div className="flex flex-1 flex-col">
        <h4 className="font-montserrat font-semibold text-luxury-dark">{item.product.name}</h4>
        <p className="text-sm text-gold-600">₹{discountedPrice.toLocaleString()}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity(quantity - 1)}
              disabled={updateCartItem.isPending}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity(quantity + 1)}
              disabled={updateCartItem.isPending}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={handleRemove}
            disabled={removeFromCart.isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-montserrat font-bold text-luxury-dark">₹{subtotal.toLocaleString()}</p>
      </div>
    </div>
  );
}
