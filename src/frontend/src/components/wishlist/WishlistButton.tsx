import { useAddToWishlist, useRemoveFromWishlist, useGetWishlist } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

interface WishlistButtonProps {
  productId: string;
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const { identity } = useInternetIdentity();
  const { data: wishlist = [] } = useGetWishlist();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const isAuthenticated = !!identity;
  const isInWishlist = wishlist.some((item) => item.productId === productId);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please login to use wishlist');
      return;
    }

    try {
      if (isInWishlist) {
        await removeFromWishlist.mutateAsync(productId);
        toast.success('Removed from wishlist');
      } else {
        await addToWishlist.mutateAsync(productId);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      className={`h-10 w-10 rounded-full bg-white/90 backdrop-blur transition-colors hover:bg-white ${
        isInWishlist ? 'text-red-500 hover:text-red-600' : 'text-luxury-dark/60 hover:text-red-500'
      }`}
      onClick={handleToggle}
      disabled={addToWishlist.isPending || removeFromWishlist.isPending}
    >
      <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
    </Button>
  );
}
