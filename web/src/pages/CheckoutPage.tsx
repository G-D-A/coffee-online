import { useEffect, useState } from 'react';
import { getCart, checkoutCart } from '../api/cart.api';
import { useDispatch } from 'react-redux';
import { setCart, clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  const fetchCart = async () => {
    try {
      const res = await getCart(token!);
      const next = res.data.items || [];
      setItems(next);
      dispatch(setCart(next as any));
    } catch {
      setError('Failed to load cart');
    }
  };

  const handleCheckout = async () => {
    try {
      setProcessing(true);
      await checkoutCart(token!);
      dispatch(clearCart());
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
        <div key={item._id} className="flex justify-between items-center border-b py-2">
          <div className="flex items-center gap-3">
            <img src={item.productId.image || item.productId.imgurl || 'https://cdn-icons-png.flaticon.com/512/1040/1040230.png'} alt={item.productId.name} className="w-10 h-10 object-cover rounded" />
            <span className="text-coffee-espresso">{item.productId.name} × {item.quantity}</span>
          </div>
          <span className="text-coffee-cocoa">${(item.productId.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}

      <div className="mt-4 font-semibold text-coffee-espresso">Total: ${total.toFixed(2)}</div>

      <button
        onClick={handleCheckout}
        disabled={processing}
        className="mt-6 bg-coffee-caramel text-white px-4 py-2 rounded hover:bg-coffee-cocoa disabled:opacity-60"
      >
        {processing ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
};

export default CheckoutPage;
