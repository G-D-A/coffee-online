import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getProfile } from '../api/auth.api';
import { getOrdersByUser } from '../api/order.api';

const OrdersPage = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const profileRes = await getProfile(token!);
        const userId = profileRes.data._id;
        const res = await getOrdersByUser(userId, token!);
        setOrders(res.data);
      } catch (err) {
        setError('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-[url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center">
      <div className="backdrop-brightness-75 p-6 rounded">
      <h2 className="text-2xl font-bold mb-4 text-white">My Orders</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="border p-4 rounded shadow bg-white">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-coffee-espresso">Order ID: {order._id}</p>
                <div className="text-sm text-coffee-cocoa">
                  Items: {order.productIds.length} · Total: ${order.total?.toFixed?.(2) || order.total}
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                {order.productIds.map((p: any) => (
                  <div key={p._id} className="flex items-center gap-2 border rounded px-2 py-1 bg-white">
                    <img src={p.image || p.imgurl || 'https://cdn-icons-png.flaticon.com/512/1040/1040230.png'} alt={p.name} className="w-10 h-10 object-cover rounded" />
                    <span className="text-sm text-coffee-cocoa">{p.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-2">Date: {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default OrdersPage;
