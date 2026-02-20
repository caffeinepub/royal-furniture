import { useState } from 'react';
import { useIsStripeConfigured, useSetStripeConfiguration } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function PaymentSetup() {
  const { data: isConfigured = false } = useIsStripeConfigured();
  const setConfig = useSetStripeConfiguration();
  const [secretKey, setSecretKey] = useState('');
  const [countries, setCountries] = useState('IN,US,GB');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!secretKey.trim()) {
      toast.error('Please enter Stripe secret key');
      return;
    }

    try {
      const allowedCountries = countries.split(',').map((c) => c.trim()).filter((c) => c);
      await setConfig.mutateAsync({ secretKey: secretKey.trim(), allowedCountries });
      toast.success('Stripe configuration saved successfully!');
      setSecretKey('');
    } catch (error) {
      toast.error('Failed to save Stripe configuration');
    }
  };

  if (isConfigured) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <p className="text-green-800">✓ Stripe payment is configured and ready</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair text-2xl">Configure Stripe Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="secretKey">Stripe Secret Key *</Label>
            <Input
              id="secretKey"
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="sk_test_..."
              required
            />
          </div>
          <div>
            <Label htmlFor="countries">Allowed Countries (comma-separated) *</Label>
            <Input
              id="countries"
              value={countries}
              onChange={(e) => setCountries(e.target.value)}
              placeholder="IN,US,GB"
              required
            />
            <p className="mt-1 text-sm text-luxury-dark/60">Example: IN,US,GB,CA</p>
          </div>
          <Button type="submit" disabled={setConfig.isPending} className="bg-gold-600 hover:bg-gold-700">
            {setConfig.isPending ? 'Saving...' : 'Save Configuration'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
