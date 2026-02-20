import { useState } from 'react';
import { useUpdateOrderStatus } from '../../hooks/useQueries';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { Order, OrderStatus } from '../../backend';

interface OrderStatusUpdateModalProps {
  order: Order;
  open: boolean;
  onClose: () => void;
}

export default function OrderStatusUpdateModal({ order, open, onClose }: OrderStatusUpdateModalProps) {
  const updateStatus = useUpdateOrderStatus();
  const [newStatus, setNewStatus] = useState<OrderStatus>(order.status);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newStatus === order.status) {
      toast.error('Please select a different status');
      return;
    }

    try {
      await updateStatus.mutateAsync({ orderId: order.id, status: newStatus });
      toast.success('Order status updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl">Update Order Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="mb-2 text-sm text-luxury-dark/60">Order ID: {order.id}</p>
            <p className="mb-4 text-sm text-luxury-dark/60">
              Current Status: <span className="font-semibold">{order.status}</span>
            </p>
          </div>
          <div>
            <Label htmlFor="status">New Status</Label>
            <Select value={newStatus} onValueChange={(value) => setNewStatus(value as OrderStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateStatus.isPending}
              className="bg-gold-600 hover:bg-gold-700"
            >
              {updateStatus.isPending ? 'Updating...' : 'Update Status'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
