import { useState } from 'react';
import { useGetAllCoupons, useRemoveCoupon } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import CouponFormModal from '../../components/admin/CouponFormModal';

export default function AdminCouponsPage() {
  const { data: coupons = [] } = useGetAllCoupons();
  const removeCoupon = useRemoveCoupon();
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = async (code: string) => {
    if (confirm('Are you sure you want to delete this coupon?')) {
      try {
        await removeCoupon.mutateAsync(code);
        toast.success('Coupon deleted successfully');
      } catch (error) {
        toast.error('Failed to delete coupon');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-playfair text-4xl font-bold text-luxury-dark">Coupons</h1>
        <Button onClick={() => setModalOpen(true)} className="bg-gold-600 hover:bg-gold-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Coupon
        </Button>
      </div>

      <div className="rounded-lg border border-gold-200/30 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.code}>
                <TableCell className="font-medium">{coupon.code}</TableCell>
                <TableCell>{Number(coupon.discountPercentage)}%</TableCell>
                <TableCell>{new Date(Number(coupon.validUntil) / 1000000).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(coupon.code)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CouponFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
