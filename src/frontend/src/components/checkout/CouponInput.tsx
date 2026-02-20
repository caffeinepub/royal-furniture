import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useActor } from '../../hooks/useActor';

interface CouponInputProps {
  couponCode: string;
  onCouponChange: (code: string) => void;
  onDiscountApplied: (discount: number) => void;
}

export default function CouponInput({ couponCode, onCouponChange, onDiscountApplied }: CouponInputProps) {
  const { actor } = useActor();
  const [isApplying, setIsApplying] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const handleApply = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    setIsApplying(true);
    try {
      if (!actor) throw new Error('Actor not available');
      const coupon = await actor.getCoupon(couponCode.toUpperCase());
      const discount = Number(coupon.discountPercentage);
      setAppliedDiscount(discount);
      onDiscountApplied(discount);
      toast.success(`Coupon applied! ${discount}% discount`);
    } catch (error) {
      toast.error('Invalid coupon code');
      setAppliedDiscount(0);
      onDiscountApplied(0);
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemove = () => {
    onCouponChange('');
    setAppliedDiscount(0);
    onDiscountApplied(0);
    toast.success('Coupon removed');
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          value={couponCode}
          onChange={(e) => onCouponChange(e.target.value.toUpperCase())}
          placeholder="Enter coupon code"
          disabled={appliedDiscount > 0}
        />
        {appliedDiscount > 0 ? (
          <Button onClick={handleRemove} variant="outline">
            Remove
          </Button>
        ) : (
          <Button onClick={handleApply} disabled={isApplying} className="bg-gold-600 hover:bg-gold-700">
            {isApplying ? 'Applying...' : 'Apply'}
          </Button>
        )}
      </div>
      {appliedDiscount > 0 && (
        <p className="text-sm font-medium text-green-600">
          ✓ {appliedDiscount}% discount applied
        </p>
      )}
    </div>
  );
}
