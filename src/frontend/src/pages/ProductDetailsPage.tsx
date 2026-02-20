import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetProduct } from '../hooks/useQueries';
import ProductImageGallery from '../components/products/ProductImageGallery';
import AddToCartButton from '../components/cart/AddToCartButton';
import BuyNowButton from '../components/products/BuyNowButton';
import ReviewSection from '../components/reviews/ReviewSection';
import AddReviewForm from '../components/reviews/AddReviewForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfileSetupModal from '../components/auth/ProfileSetupModal';

export default function ProductDetailsPage() {
  const { productId } = useParams({ strict: false }) as { productId: string };
  const navigate = useNavigate();
  const { data: product, isLoading, isError, error } = useGetProduct(productId);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <Skeleton className="mb-8 h-6 w-1/3" />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <Alert variant="destructive" className="mx-auto max-w-2xl">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Product Not Found</AlertTitle>
            <AlertDescription>
              {isError 
                ? `We couldn't load this product. ${error ? String(error) : 'Please try again later.'}`
                : "The product you're looking for doesn't exist or has been removed."}
            </AlertDescription>
          </Alert>
          <div className="mt-8 text-center">
            <Button
              onClick={() => navigate({ to: '/shop' })}
              className="bg-gold-600 hover:bg-gold-700"
            >
              Return to Shop
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const price = Number(product.price);
  const discount = product.discount ? Number(product.discount) : 0;
  const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;
  const inStock = Number(product.stock) > 0;

  return (
    <main className="min-h-screen bg-white py-12">
      <ProfileSetupModal />
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center space-x-2 text-sm text-luxury-dark/60">
          <button onClick={() => navigate({ to: '/' })} className="hover:text-gold-600 transition-colors">
            Home
          </button>
          <ChevronRight className="h-4 w-4" />
          <button onClick={() => navigate({ to: '/shop' })} className="hover:text-gold-600 transition-colors">
            Shop
          </button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-luxury-dark">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <ProductImageGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-4 font-playfair text-4xl font-bold text-luxury-dark">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="font-montserrat text-3xl font-bold text-gold-600">
                    ₹{discountedPrice.toLocaleString()}
                  </span>
                  {discount > 0 && (
                    <span className="text-xl text-luxury-dark/50 line-through">
                      ₹{price.toLocaleString()}
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <Badge className="bg-gold-600 text-white">{discount}% OFF</Badge>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-2 font-montserrat text-lg font-semibold text-luxury-dark">Stock Status</h3>
              {inStock ? (
                <span className="font-medium text-green-600">In Stock ({Number(product.stock)} available)</span>
              ) : (
                <span className="font-medium text-red-600">Out of Stock</span>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="mb-2 font-montserrat text-lg font-semibold text-luxury-dark">Description</h3>
              <p className="text-luxury-dark/80">{product.description}</p>
            </div>

            <Separator />

            <div className="space-y-4">
              <AddToCartButton productId={product.id} quantity={BigInt(1)} disabled={!inStock} />
              <BuyNowButton productId={product.id} disabled={!inStock} />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="mb-8 font-playfair text-3xl font-bold text-luxury-dark">Customer Reviews</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ReviewSection reviews={product.reviews} />
            </div>
            <div>
              <AddReviewForm productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
