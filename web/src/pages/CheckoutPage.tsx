import { useEffect, useState } from 'react';
import { getCart, checkoutCart } from '../api/cart.api';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchCart = async () => {
    try {
      const res = await getCart(token!);
      setItems(res.data.items || []);
    } catch {
      setError('Failed to load cart');
    }
  };

  const handleCheckout = async () => {
    try {
      setProcessing(true);
      await checkoutCart(token!);
      navigate('/orders');
    } catch {
      setError('Checkout failed');
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  console.log('items >>>', items);
  const total = items.reduce((acc: any, item: any) => acc + item.productId.price * item.quantity, 0);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {error && <p className="text-red-500">{error}</p>}

      {items.map((item: any) => (
        <div key={item._id} className="flex justify-between border-b py-2">
          <span>{item.name} x {item.quantity}</span>
          <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}

      <div className="mt-4 font-semibold">Total: ${total.toFixed(2)}</div>

      <button
        onClick={handleCheckout}
        disabled={processing}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {processing ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
};

export default CheckoutPage;
