import { useState, useMemo } from 'react';
import { useGetProducts } from '../hooks/useQueries';
import { useSearch } from '@tanstack/react-router';
import ProductCard from '../components/products/ProductCard';
import CategoryFilter from '../components/shop/CategoryFilter';
import PriceRangeFilter from '../components/shop/PriceRangeFilter';
import SortDropdown from '../components/shop/SortDropdown';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import ProfileSetupModal from '../components/auth/ProfileSetupModal';

export default function ShopPage() {
  const { data: products = [], isLoading, isError, error } = useGetProducts();
  const search = useSearch({ strict: false }) as { category?: string };

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    search.category ? [search.category] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [sortBy, setSortBy] = useState<string>('newest');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    filtered = filtered.filter((p) => {
      const price = Number(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    filtered.sort((a, b) => {
      if (sortBy === 'price-low') {
        return Number(a.price) - Number(b.price);
      } else if (sortBy === 'newest') {
        return Number(b.createdAt) - Number(a.createdAt);
      } else if (sortBy === 'popular') {
        return b.reviews.length - a.reviews.length;
      }
      return 0;
    });

    return filtered;
  }, [products, selectedCategories, priceRange, sortBy]);

  return (
    <main className="min-h-screen bg-beige-50 py-12">
      <ProfileSetupModal />
      <div className="container mx-auto px-4">
        <h1 className="mb-8 font-playfair text-4xl font-bold text-luxury-dark">Shop Furniture</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <aside className="space-y-6">
            <CategoryFilter
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
            />
            <PriceRangeFilter priceRange={priceRange} onPriceRangeChange={setPriceRange} />
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-luxury-dark/70">
                {isLoading ? 'Loading...' : `${filteredAndSortedProducts.length} products found`}
              </p>
              <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            ) : isError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error Loading Products</AlertTitle>
                <AlertDescription>
                  We couldn't load the products. Please try refreshing the page or contact support if the problem persists.
                  {error && <span className="block mt-2 text-sm opacity-75">{String(error)}</span>}
                </AlertDescription>
              </Alert>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gold-200/30 bg-white p-12 text-center">
                <p className="text-xl text-luxury-dark/60">No products match your filters</p>
                <p className="mt-2 text-luxury-dark/50">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
