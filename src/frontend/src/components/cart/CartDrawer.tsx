import { useGetCart, useGetProducts } from '../../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingBag } from 'lucide-react';
import CartItemCard from './CartItemCard';

interface CartDrawerProps {
  onClose: () => void;
}

export default function CartDrawer({ onClose }: CartDrawerProps) {
  const navigate = useNavigate();
  const { data: cart = [] } = useGetCart();
  const { data: products = [] } = useGetProducts();

  const cartWithProducts = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product };
  }).filter((item) => item.product);

  const subtotal = cartWithProducts.reduce((sum, item) => {
    if (!item.product) return sum;
    const price = Number(item.product.price);
    const discount = item.product.discount ? Number(item.product.discount) : 0;
    const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;
    return sum + discountedPrice * Number(item.quantity);
  }, 0);

  const handleCheckout = () => {
    onClose();
    navigate({ to: '/checkout' });
  };

  if (cart.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-4 p-8">
        <ShoppingBag className="h-24 w-24 text-luxury-dark/20" />
        <h3 className="font-playfair text-2xl font-semibold text-luxury-dark">Your cart is empty</h3>
        <p className="text-center text-luxury-dark/60">Add some beautiful furniture to get started!</p>
        <Button onClick={() => { onClose(); navigate({ to: '/shop' }); }} className="bg-gold-600 hover:bg-gold-700">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gold-200/30 p-6">
        <h2 className="font-playfair text-2xl font-bold text-luxury-dark">Shopping Cart</h2>
        <p className="text-sm text-luxury-dark/60">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {cartWithProducts.map((item) => (
            <CartItemCard key={item.productId} item={item} />
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-gold-200/30 p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-montserrat text-lg font-semibold text-luxury-dark">Subtotal:</span>
          <span className="font-montserrat text-2xl font-bold text-gold-600">
            ₹{subtotal.toLocaleString()}
          </span>
        </div>
        <Button onClick={handleCheckout} className="w-full bg-gold-600 text-lg hover:bg-gold-700">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
