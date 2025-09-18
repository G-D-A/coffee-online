import { useEffect, useState } from 'react';
import { getCart, removeFromCart } from '../api/cart.api';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCart } from '../features/cart/cartSlice';

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
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

  const handleRemove = async (productId: string) => {
    try {
      await removeFromCart(productId, token!);
      const next = items.filter((item: any) => item.productId?._id !== productId) as any;
      setItems(next);
      dispatch(setCart(next));
    } catch {
      setError('Failed to remove item');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = items.reduce((acc: number, item: any) => {
    const price = item.productId?.price || 0;
    return acc + price * item.quantity;
  }, 0);
  const isEmpty = !items || items.length === 0;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white/85 backdrop-blur-sm border border-coffee-latte rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-coffee-espresso">Your Cart</h2>
      {error && <p className="text-red-500">{error}</p>}

      {isEmpty ? (
        <div className="text-center py-10 text-coffee-cocoa">
          <div className="text-6xl mb-3">☕</div>
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          {items.map((item: any) => (
            <CartItem key={item._id} product={item} onRemove={handleRemove} />
          ))}

          <div className="mt-4 font-semibold text-coffee-espresso text-lg">Total: ${total.toFixed(2)}</div>

          <button
            onClick={() => navigate('/checkout')}
            className="mt-4 bg-coffee-caramel text-white px-4 py-2 rounded hover:bg-coffee-cocoa"
          >
            Checkout
          </button>
        </>
      )}
      </div>
    </div>
  );
};

export default CartPage;
