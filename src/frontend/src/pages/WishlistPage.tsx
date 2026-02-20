import { useGetWishlist, useGetProducts, useAddToCart, useRemoveFromWishlist } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import ProfileSetupModal from '../components/auth/ProfileSetupModal';

export default function WishlistPage() {
  const navigate = useNavigate();
  const { data: wishlist = [] } = useGetWishlist();
  const { data: products = [] } = useGetProducts();
  const addToCart = useAddToCart();
  const removeFromWishlist = useRemoveFromWishlist();

  const wishlistProducts = wishlist
    .map((item) => products.find((p) => p.id === item.productId))
    .filter((p) => p !== undefined);

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart.mutateAsync({ productId, quantity: BigInt(1) });
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      await removeFromWishlist.mutateAsync(productId);
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

  if (wishlist.length === 0) {
    return (
      <main className="min-h-screen bg-beige-50 py-12">
        <ProfileSetupModal />
        <div className="container mx-auto px-4">
          <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6">
            <Heart className="h-24 w-24 text-luxury-dark/20" />
            <h1 className="font-playfair text-4xl font-bold text-luxury-dark">Your Wishlist is Empty</h1>
            <p className="text-center text-lg text-luxury-dark/70">
              Save your favorite furniture pieces here for later
            </p>
            <Button
              onClick={() => navigate({ to: '/shop' })}
              className="bg-gold-600 hover:bg-gold-700"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-beige-50 py-12">
      <ProfileSetupModal />
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="mb-2 font-playfair text-4xl font-bold text-luxury-dark">My Wishlist</h1>
          <p className="text-luxury-dark/70">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistProducts.map((product) => {
            if (!product) return null;

            const imageUrl = product.images.length > 0 ? product.images[0].getDirectURL() : '/assets/generated/sofa-premium.dim_800x600.png';
            const price = Number(product.price);
            const discount = product.discount ? Number(product.discount) : 0;
            const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;
            const inStock = Number(product.stock) > 0;

            return (
              <Card key={product.id} className="overflow-hidden border-gold-200/30">
                <div
                  className="aspect-[4/3] cursor-pointer overflow-hidden bg-beige-50"
                  onClick={() => navigate({ to: '/product/$productId', params: { productId: product.id } })}
                >
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform hover:scale-110"
                  />
                </div>
                <CardContent className="p-4">
                  <h3
                    className="mb-2 cursor-pointer font-montserrat text-lg font-semibold text-luxury-dark hover:text-gold-600"
                    onClick={() => navigate({ to: '/product/$productId', params: { productId: product.id } })}
                  >
                    {product.name}
                  </h3>
                  <p className="mb-4 font-montserrat text-xl font-bold text-gold-600">
                    ₹{discountedPrice.toLocaleString()}
                  </p>
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={!inStock || addToCart.isPending}
                      className="w-full bg-gold-600 hover:bg-gold-700"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                    <Button
                      onClick={() => handleRemove(product.id)}
                      variant="outline"
                      disabled={removeFromWishlist.isPending}
                      className="w-full border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
