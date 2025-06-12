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
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="border p-4 rounded shadow">
              <p className="font-semibold">Order ID: {order._id}</p>
              <p>Products: {order.productIds.length}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
