import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getProfile } from '../api/auth.api';
import { getOrdersByUser } from '../api/order.api';

const ProfilePage = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfileAndOrders = async () => {
      try {
        const profileRes = await getProfile(token!);
        setEmail(profileRes.data.email);

        const userId = profileRes.data._id;
        const ordersRes = await getOrdersByUser(userId, token!);
        setOrders(ordersRes.data);
      } catch (err) {
        setError('Failed to load profile or orders');
      }
    };

    loadProfileAndOrders();
  }, [token]);

  return (
    <div className="max-w-xl mx-auto mt-10 bg-[url('https://images.unsplash.com/photo-1445077100181-a33e9ac94db0?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center">
      <div className="backdrop-brightness-75 p-6 rounded">
      <h2 className="text-2xl font-bold mb-4 text-white">Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <p className="mb-6 text-coffee-cream">Email: {email}</p>

      <h3 className="text-xl font-semibold mb-2">Order History</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((order) => (
            <li key={order._id} className="border p-3 rounded bg-white">
              <p className="font-semibold">Order ID: {order._id}</p>
              <p>Products: {order.productIds.length}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default ProfilePage;
