import { useAddToCart } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

interface BuyNowButtonProps {
  productId: string;
  disabled?: boolean;
}

export default function BuyNowButton({ productId, disabled = false }: BuyNowButtonProps) {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const addToCart = useAddToCart();

  const isAuthenticated = !!identity;

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to purchase');
      return;
    }

    try {
      await addToCart.mutateAsync({ productId, quantity: BigInt(1) });
      navigate({ to: '/checkout' });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to proceed to checkout');
    }
  };

  return (
    <Button
      onClick={handleBuyNow}
      disabled={disabled || addToCart.isPending}
      variant="outline"
      className="w-full border-gold-600 text-gold-600 hover:bg-gold-50"
    >
      <ShoppingBag className="mr-2 h-4 w-4" />
      {addToCart.isPending ? 'Processing...' : 'Buy Now'}
    </Button>
  );
}
