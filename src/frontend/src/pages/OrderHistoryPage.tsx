import { useGetUserOrders } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { OrderStatus } from '../backend';
import ProfileSetupModal from '../components/auth/ProfileSetupModal';

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const { data: orders = [], isLoading } = useGetUserOrders();

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (orders.length === 0 && !isLoading) {
    return (
      <main className="min-h-screen bg-beige-50 py-12">
        <ProfileSetupModal />
        <div className="container mx-auto px-4">
          <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6">
            <Package className="h-24 w-24 text-luxury-dark/20" />
            <h1 className="font-playfair text-4xl font-bold text-luxury-dark">No Orders Yet</h1>
            <p className="text-center text-lg text-luxury-dark/70">
              Start shopping to see your orders here
            </p>
            <Button onClick={() => navigate({ to: '/shop' })} className="bg-gold-600 hover:bg-gold-700">
              Browse Products
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-beige-50 py-12">
      <ProfileSetupModal />
      <div className="container mx-auto px-4">
        <h1 className="mb-8 font-playfair text-4xl font-bold text-luxury-dark">Order History</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="border-gold-200/30">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div>
                    <p className="mb-1 font-montserrat text-sm text-luxury-dark/60">Order ID</p>
                    <p className="mb-2 font-montserrat font-semibold text-luxury-dark">{order.id}</p>
                    <p className="text-sm text-luxury-dark/60">
                      {new Date(Number(order.createdAt) / 1000000).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="mb-1 text-sm text-luxury-dark/60">Total Amount</p>
                      <p className="font-montserrat text-xl font-bold text-gold-600">
                        ₹{Number(order.totalAmount).toLocaleString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => navigate({ to: '/orders/$orderId', params: { orderId: order.id } })}
                    variant="outline"
                    className="border-gold-600 text-gold-600 hover:bg-gold-50"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
