import { useState } from 'react';
import { useAddCoupon } from '../../hooks/useQueries';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CouponFormModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CouponFormModal({ open, onClose }: CouponFormModalProps) {
  const addCoupon = useAddCoupon();
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [validUntil, setValidUntil] = useState('');

  const resetForm = () => {
    setCode('');
    setDiscountPercentage('');
    setValidUntil('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim() || !discountPercentage || !validUntil) {
      toast.error('Please fill in all fields');
      return;
    }

    const discount = parseInt(discountPercentage);
    if (discount < 1 || discount > 100) {
      toast.error('Discount must be between 1 and 100');
      return;
    }

    const validDate = new Date(validUntil);
    if (validDate <= new Date()) {
      toast.error('Valid until date must be in the future');
      return;
    }

    try {
      await addCoupon.mutateAsync({
        code: code.toUpperCase().trim(),
        discountPercentage: BigInt(discount),
        validUntil: BigInt(validDate.getTime() * 1000000),
        createdAt: BigInt(Date.now() * 1000000),
      });
      toast.success('Coupon created successfully!');
      onClose();
      resetForm();
    } catch (error) {
      toast.error('Failed to create coupon');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl">Add New Coupon</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="code">Coupon Code *</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="SAVE20"
              required
            />
          </div>
          <div>
            <Label htmlFor="discount">Discount Percentage (1-100) *</Label>
            <Input
              id="discount"
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              min="1"
              max="100"
              required
            />
          </div>
          <div>
            <Label htmlFor="validUntil">Valid Until *</Label>
            <Input
              id="validUntil"
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={addCoupon.isPending}
              className="bg-gold-600 hover:bg-gold-700"
            >
              {addCoupon.isPending ? 'Creating...' : 'Create Coupon'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
