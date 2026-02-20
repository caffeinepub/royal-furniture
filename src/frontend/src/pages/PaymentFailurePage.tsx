import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function PaymentFailurePage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-beige-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <XCircle className="h-24 w-24 text-red-600" />
          </div>
          <h1 className="mb-4 font-playfair text-4xl font-bold text-luxury-dark">Payment Failed</h1>
          <p className="mb-8 text-lg text-luxury-dark/70">
            We couldn't process your payment. Please try again or contact support if the problem persists.
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => navigate({ to: '/checkout' })}
              className="w-full bg-gold-600 hover:bg-gold-700 sm:w-auto"
            >
              Try Again
            </Button>
            <Button
              onClick={() => navigate({ to: '/contact' })}
              variant="outline"
              className="w-full border-gold-600 text-gold-600 hover:bg-gold-50 sm:w-auto"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
