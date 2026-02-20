import { useGetProducts } from '../../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import ProductCard from '../products/ProductCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function FeaturedProductsSection() {
  const { data: products = [], isLoading, isError, error } = useGetProducts();
  const navigate = useNavigate();

  const featuredProducts = products.slice(0, 4);

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="font-playfair text-5xl font-bold text-luxury-dark md:text-6xl">
            Featured Collection
          </h2>
          <p className="mt-6 text-xl text-luxury-dark/70">
            Handpicked pieces that define luxury living
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <Alert variant="destructive" className="mx-auto max-w-2xl">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Products</AlertTitle>
            <AlertDescription>
              We couldn't load the featured products. Please try refreshing the page or contact support if the problem persists.
              {error && <span className="block mt-2 text-sm opacity-75">{String(error)}</span>}
            </AlertDescription>
          </Alert>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-luxury-dark/60">No products available yet</p>
            <p className="mt-2 text-luxury-dark/50">Check back soon for our luxury collection</p>
          </div>
        )}

        {!isLoading && !isError && featuredProducts.length > 0 && (
          <div className="mt-16 text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gold-600 px-8 py-6 text-lg font-semibold text-gold-600 transition-all duration-300 hover:bg-gold-600 hover:text-white hover:scale-105"
              onClick={() => navigate({ to: '/shop' })}
            >
              View All Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
