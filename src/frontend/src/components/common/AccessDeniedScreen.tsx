import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function AccessDeniedScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-beige-50">
      <div className="text-center">
        <ShieldAlert className="mx-auto mb-6 h-24 w-24 text-red-600" />
        <h1 className="mb-4 font-playfair text-4xl font-bold text-luxury-dark">Access Denied</h1>
        <p className="mb-8 text-lg text-luxury-dark/70">
          Admin privileges required to access this page
        </p>
        <Button onClick={() => navigate({ to: '/' })} className="bg-gold-600 hover:bg-gold-700">
          Return Home
        </Button>
      </div>
    </div>
  );
}
