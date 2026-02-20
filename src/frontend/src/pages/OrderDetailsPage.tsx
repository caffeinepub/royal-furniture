import { useParams } from '@tanstack/react-router';
import { useGetOrder, useGetProducts } from '../hooks/useQueries';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { OrderStatus } from '../backend';
import ProfileSetupModal from '../components/auth/ProfileSetupModal';

export default function OrderDetailsPage() {
  const { orderId } = useParams({ strict: false }) as { orderId: string };
  const { data: order, isLoading } = useGetOrder(orderId);
  const { data: products = [] } = useGetProducts();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-beige-50 py-12">
        <div className="container mx-auto px-4">
          <Skeleton className="mb-8 h-12 w-64" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full" />
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-beige-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-playfair text-3xl font-bold text-luxury-dark">Order Not Found</h1>
        </div>
      </main>
    );
  }

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

  const orderItems = order.items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return { ...item, product };
    })
    .filter((item) => item.product);

  return (
    <main className="min-h-screen bg-beige-50 py-12">
      <ProfileSetupModal />
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-playfair text-4xl font-bold text-luxury-dark">Order Details</h1>
          <Badge className={getStatusColor(order.status)}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderItems.map((item) => {
                    if (!item.product) return null;
                    const imageUrl = item.product.images.length > 0 ? item.product.images[0].getDirectURL() : '/assets/generated/sofa-premium.dim_800x600.png';
                    const price = Number(item.product.price);

                    return (
                      <div key={item.productId} className="flex space-x-4">
                        <img src={imageUrl} alt={item.product.name} className="h-20 w-20 rounded object-cover" />
                        <div className="flex-1">
                          <h4 className="font-montserrat font-semibold text-luxury-dark">{item.product.name}</h4>
                          <p className="text-sm text-luxury-dark/60">Quantity: {Number(item.quantity)}</p>
                          <p className="font-semibold text-gold-600">₹{price.toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-luxury-dark">{order.shippingAddress.street}</p>
                <p className="text-luxury-dark">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </p>
                <p className="text-luxury-dark">{order.shippingAddress.country}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-luxury-dark/60">Order ID</p>
                  <p className="font-montserrat font-semibold text-luxury-dark">{order.id}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-luxury-dark/60">Order Date</p>
                  <p className="text-luxury-dark">
                    {new Date(Number(order.createdAt) / 1000000).toLocaleDateString()}
                  </p>
                </div>
                <Separator />
                {order.paymentId && (
                  <>
                    <div>
                      <p className="text-sm text-luxury-dark/60">Payment ID</p>
                      <p className="text-luxury-dark">{order.paymentId}</p>
                    </div>
                    <Separator />
                  </>
                )}
                <div>
                  <p className="mb-2 text-sm text-luxury-dark/60">Total Amount</p>
                  <p className="font-montserrat text-2xl font-bold text-gold-600">
                    ₹{Number(order.totalAmount).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
