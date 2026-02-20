import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['cart'] });
  }, [queryClient]);

  return (
    <main className="min-h-screen bg-beige-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <CheckCircle className="h-24 w-24 text-green-600" />
          </div>
          <h1 className="mb-4 font-playfair text-4xl font-bold text-luxury-dark">Payment Successful!</h1>
          <p className="mb-8 text-lg text-luxury-dark/70">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => navigate({ to: '/orders' })}
              className="w-full bg-gold-600 hover:bg-gold-700 sm:w-auto"
            >
              View Order History
            </Button>
            <Button
              onClick={() => navigate({ to: '/shop' })}
              variant="outline"
              className="w-full border-gold-600 text-gold-600 hover:bg-gold-50 sm:w-auto"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
