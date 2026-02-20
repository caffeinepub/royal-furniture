import { useAddToCart } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  productId: string;
  quantity: bigint;
  disabled?: boolean;
  className?: string;
}

export default function AddToCartButton({ productId, quantity, disabled = false, className = '' }: AddToCartButtonProps) {
  const { identity } = useInternetIdentity();
  const addToCart = useAddToCart();

  const isAuthenticated = !!identity;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await addToCart.mutateAsync({ productId, quantity });
      toast.success('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || addToCart.isPending}
      className={`w-full bg-gold-600 hover:bg-gold-700 ${className}`}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      {addToCart.isPending ? 'Adding...' : isAuthenticated ? 'Add to Cart' : 'Login to Add'}
    </Button>
  );
}
