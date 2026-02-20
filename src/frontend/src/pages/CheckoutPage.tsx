import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetCart, useGetProducts } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCreateCheckoutSession } from '../hooks/useQueries';
import AddressForm from '../components/checkout/AddressForm';
import CouponInput from '../components/checkout/CouponInput';
import OrderSummary from '../components/checkout/OrderSummary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import type { Address } from '../backend';
import ProfileSetupModal from '../components/auth/ProfileSetupModal';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: cart = [] } = useGetCart();
  const { data: products = [] } = useGetProducts();
  const createCheckoutSession = useCreateCheckoutSession();

  const [address, setAddress] = useState<Address | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (!identity) {
      toast.error('Please login to checkout');
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-beige-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-playfair text-3xl font-bold text-luxury-dark">Your cart is empty</h1>
          <Button onClick={() => navigate({ to: '/shop' })} className="bg-gold-600 hover:bg-gold-700">
            Continue Shopping
          </Button>
        </div>
      </main>
    );
  }

  const cartWithProducts = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return { ...item, product };
    })
    .filter((item) => item.product);

  const subtotal = cartWithProducts.reduce((sum, item) => {
    if (!item.product) return sum;
    const price = Number(item.product.price);
    const productDiscount = item.product.discount ? Number(item.product.discount) : 0;
    const discountedPrice = productDiscount > 0 ? price - (price * productDiscount) / 100 : price;
    return sum + discountedPrice * Number(item.quantity);
  }, 0);

  const couponDiscount = (subtotal * discount) / 100;
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal - couponDiscount + shipping;

  const handlePayment = async () => {
    if (!address) {
      toast.error('Please provide a delivery address');
      return;
    }

    try {
      const shoppingItems = cartWithProducts.map((item) => {
        if (!item.product) throw new Error('Product not found');
        const price = Number(item.product.price);
        const productDiscount = item.product.discount ? Number(item.product.discount) : 0;
        const discountedPrice = productDiscount > 0 ? price - (price * productDiscount) / 100 : price;

        return {
          productName: item.product.name,
          productDescription: item.product.description,
          priceInCents: BigInt(Math.round(discountedPrice * 100)),
          quantity: item.quantity,
          currency: 'inr',
        };
      });

      const session = await createCheckoutSession.mutateAsync(shoppingItems);
      if (!session?.url) {
        throw new Error('Stripe session missing url');
      }
      window.location.href = session.url;
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-beige-50 py-12">
      <ProfileSetupModal />
      <div className="container mx-auto px-4">
        <h1 className="mb-8 font-playfair text-4xl font-bold text-luxury-dark">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <AddressForm onAddressChange={setAddress} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Apply Coupon</CardTitle>
              </CardHeader>
              <CardContent>
                <CouponInput
                  couponCode={couponCode}
                  onCouponChange={setCouponCode}
                  onDiscountApplied={setDiscount}
                />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderSummary
                  cartItems={cartWithProducts}
                  subtotal={subtotal}
                  discount={couponDiscount}
                  shipping={shipping}
                  total={total}
                />
                <Separator className="my-4" />
                <Button
                  onClick={handlePayment}
                  disabled={!address || createCheckoutSession.isPending}
                  className="w-full bg-gold-600 text-lg hover:bg-gold-700"
                >
                  {createCheckoutSession.isPending ? 'Processing...' : 'Proceed to Payment'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
