import type { CartItem, Product } from '../../backend';
import { Separator } from '@/components/ui/separator';

interface OrderSummaryProps {
  cartItems: (CartItem & { product?: Product })[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export default function OrderSummary({ cartItems, subtotal, discount, shipping, total }: OrderSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {cartItems.map((item) => {
          if (!item.product) return null;
          const price = Number(item.product.price);
          const productDiscount = item.product.discount ? Number(item.product.discount) : 0;
          const discountedPrice = productDiscount > 0 ? price - (price * productDiscount) / 100 : price;

          return (
            <div key={item.productId} className="flex justify-between text-sm">
              <span className="text-luxury-dark/80">
                {item.product.name} × {Number(item.quantity)}
              </span>
              <span className="font-semibold text-luxury-dark">
                ₹{(discountedPrice * Number(item.quantity)).toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-luxury-dark/80">Subtotal</span>
          <span className="font-semibold text-luxury-dark">₹{subtotal.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-luxury-dark/80">Discount</span>
            <span className="font-semibold text-green-600">-₹{discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-luxury-dark/80">Shipping</span>
          <span className="font-semibold text-luxury-dark">
            {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between">
        <span className="font-montserrat text-lg font-semibold text-luxury-dark">Total</span>
        <span className="font-montserrat text-2xl font-bold text-gold-600">₹{total.toLocaleString()}</span>
      </div>
    </div>
  );
}
