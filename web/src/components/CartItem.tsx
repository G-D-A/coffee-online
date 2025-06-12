import { FC } from 'react';

interface CartItemProps {
  product: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  };
  onRemove: (productId: string) => void;
}

const CartItem: FC<CartItemProps | any> = ({ product, onRemove }) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h4 className="font-semibold">{product.name}</h4>
        <p>Price: ${product.productId.price}</p>
        <p>Qty: {product.quantity}</p>
      </div>
      <button
        onClick={() => onRemove(product._id)}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
