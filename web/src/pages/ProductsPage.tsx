import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api/product.api';
import { setProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import { RootState } from '../store';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchProducts(token!);
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
        <h2 className="text-xl font-bold">Products</h2>
        <Link
          to="/products/new"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + New Product
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
