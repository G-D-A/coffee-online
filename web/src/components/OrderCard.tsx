import { FC } from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface OrderCardProps {
  _id: string;
  products: Product[];
  createdAt: string;
}

const OrderCard: FC<OrderCardProps> = ({ _id, products, createdAt }) => {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <p className="font-semibold mb-2">Order ID: {_id}</p>
      <ul className="list-disc list-inside mb-2">
        {products.map((product) => (
          <li key={product._id}>
            {product.name} — ${product.price}
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-500">Created at: {new Date(createdAt).toLocaleString()}</p>
    </div>
  );
};

export default OrderCard;
