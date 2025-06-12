import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.image || 'https://cdn-icons-png.flaticon.com/512/1040/1040230.png'}
          alt={product.name}
          className="w-full h-40 object-contain object-center rounded bg-white p-2"
        />
        <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
