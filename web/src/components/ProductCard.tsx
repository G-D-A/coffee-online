import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { deleteProduct } from '../api/menu.api';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
    description?: string;
  };
  onDeleted?: (id: string) => void;
}

const ProductCard = ({ product, onDeleted }: ProductCardProps) => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!token) return;
    await deleteProduct(product._id, token);
    onDeleted?.(product._id);
  };

  return (
    <div className="border border-coffee-latte rounded p-4 shadow hover:shadow-md transition bg-white">
      <Link to={`/menu/${product._id}`}>
        <img
          src={product.image || (product as any).imgurl || 'https://cdn-icons-png.flaticon.com/512/1040/1040230.png'}
          alt={product.name}
          className="w-full h-40 object-contain object-center rounded bg-white p-2"
        />
        <h3 className="mt-2 font-semibold text-lg text-coffee-espresso">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{(product as any).description}</p>
        <p className="text-coffee-cocoa mt-1">${product.price}</p>
      </Link>
      {user?.role === 'admin' && (
        <div className="flex gap-2 mt-3">
          <Link
            to={`/menu/${product._id}/edit`}
            className="px-3 py-1 bg-coffee-caramel text-white rounded text-sm hover:bg-coffee-cocoa"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
