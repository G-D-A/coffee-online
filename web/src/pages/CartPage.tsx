import { useEffect, useState } from 'react';
import { getCart, removeFromCart } from '../api/cart.api';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
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

  const handleRemove = async (productId: string) => {
    try {
      await removeFromCart(productId, token!);
      setItems(items.filter((item: any) => item._id !== productId));
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

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {error && <p className="text-red-500">{error}</p>}

      {items.map((item: any) => (
        <CartItem key={item._id} product={item} onRemove={handleRemove} />
      ))}

      <div className="mt-4 font-semibold">Total: ${total.toFixed(2)}</div>

      <button
        onClick={() => navigate('/checkout')}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartPage;
