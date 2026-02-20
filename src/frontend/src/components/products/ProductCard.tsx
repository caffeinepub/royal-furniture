import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Star } from 'lucide-react';
import type { Product } from '../../backend';
import WishlistButton from '../wishlist/WishlistButton';
import AddToCartButton from '../cart/AddToCartButton';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const price = Number(product.price);
  const discount = product.discount ? Number(product.discount) : 0;
  const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;
  const inStock = Number(product.stock) > 0;

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + Number(review.rating), 0) / product.reviews.length
      : 0;

  const imageUrl = product.images?.[0]?.getDirectURL?.() || '/assets/generated/sofa-premium.dim_800x600.png';

  return (
    <Card className="group relative overflow-hidden rounded-xl border-2 border-gold-200/30 bg-white shadow-luxury transition-all duration-300 hover:border-gold-400 hover:shadow-luxury-lg hover:scale-[1.02]">
      <CardContent className="p-0">
        {/* Image Container */}
        <div
          className="relative aspect-square cursor-pointer overflow-hidden bg-beige-50"
          onClick={() => navigate({ to: `/product/${product.id}` })}
        >
          {!imageError ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-beige-100">
              <span className="text-luxury-dark/40">Image unavailable</span>
            </div>
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute left-4 top-4 rounded-full bg-gold-600 px-3 py-1 text-sm font-bold text-white shadow-md">
              {discount}% OFF
            </div>
          )}

          {/* Wishlist Button */}
          <div className="absolute right-4 top-4">
            <WishlistButton productId={product.id} />
          </div>

          {/* Stock Status Overlay */}
          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-luxury-dark/60">
              <span className="rounded-lg bg-white px-4 py-2 font-semibold text-luxury-dark">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6 space-y-4">
          <div
            className="cursor-pointer"
            onClick={() => navigate({ to: `/product/${product.id}` })}
          >
            <h3 className="font-playfair text-xl font-bold text-luxury-dark transition-colors group-hover:text-gold-600 line-clamp-2">
              {product.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(averageRating)
                      ? 'fill-gold-500 text-gold-500'
                      : 'fill-none text-gold-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-luxury-dark/60">
              ({product.reviews.length})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-3">
            <span className="font-montserrat text-2xl font-bold text-gold-600">
              ₹{discountedPrice.toLocaleString()}
            </span>
            {discount > 0 && (
              <span className="text-lg text-luxury-dark/50 line-through">
                ₹{price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <AddToCartButton
            productId={product.id}
            quantity={BigInt(1)}
            disabled={!inStock}
          />
        </div>
      </CardContent>
    </Card>
  );
}
