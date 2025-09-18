import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../api/menu.api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addToCart as addToCartAPI, getCart as getCartAPI } from '../api/cart.api';
import { setCart } from '../features/cart/cartSlice';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const fetchProduct = async () => {
    try {
      const res = await getProductById(id!);
      setProduct(res.data);
    } catch (err) {
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        const target = encodeURIComponent(`/menu/${product._id}`);
        window.location.href = `/auth/required?redirect=${target}`;
        return;
      }

      await addToCartAPI(product._id, quantity, token);
      try {
        const res = await getCartAPI(token);
        const items = res.data?.items || [];
        dispatch(setCart(items as any));
      } catch {}
      alert('Added to cart!');
    } catch (err) {
      setError('Failed to add to cart');
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!product) return <div className="p-4">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
      <p className="mb-2 text-gray-700">Price: ${product.price}</p>
      <p className="mb-2 text-gray-700">Stock: {product.stock}</p>
      <img
        src={product.image || product.imgurl || 'https://cdn-icons-png.flaticon.com/512/1040/1040230.png'}
        alt={product.name}
        className="w-64 h-64 object-cover mb-4"
      />
      <div className="flex items-center gap-4 mt-4">
        <label htmlFor="quantity">Qty:</label>
        <input
          type="number"
          id="quantity"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 border p-1 rounded"
        />
        <button
          onClick={handleAddToCart}
          className="bg-coffee-caramel text-white px-4 py-2 rounded hover:bg-coffee-cocoa"
        >
          Add to Cart
        </button>
      </div>
      {user?.role === 'admin' && (
        <div className="mt-4">
          <Link
            to={`/menu/${product._id}/edit`}
            className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
          >
            Edit
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
