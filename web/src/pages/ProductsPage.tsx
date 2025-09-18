import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api/menu.api';
import { setProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import { RootState } from '../store';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchProducts();
        dispatch(setProducts(res.data));
      } catch (err) {
        console.error('Failed to load products:', err);
      }
    };

    load();
  }, [dispatch]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Menu</h2>
        {user?.role === 'admin' && (
          <Link
            to="/menu/new"
            className="bg-coffee-caramel text-white px-4 py-2 rounded hover:bg-coffee-cocoa"
          >
            + New Item
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDeleted={(id) =>
              dispatch(setProducts(products.filter((p) => p._id !== id)))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
