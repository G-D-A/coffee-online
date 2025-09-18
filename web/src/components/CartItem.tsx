import { FC } from 'react';

interface CartItemProps {
  product: {
    _id: string;
    productId: { _id: string; name: string; price: number };
    quantity: number;
  };
  onRemove: (productId: string) => void;
}

const CartItem: FC<CartItemProps | any> = ({ product, onRemove }) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div className="flex items-center gap-3">
        <img src={product.productId.image || product.productId.imgurl || 'https://cdn-icons-png.flaticon.com/512/1040/1040230.png'} alt={product.productId.name} className="w-12 h-12 object-cover rounded" />
        <div>
          <h4 className="font-semibold">{product.productId.name}</h4>
          <p>Price: ${product.productId.price}</p>
          <p>Qty: {product.quantity}</p>
        </div>
      </div>
      <button
        onClick={() => onRemove(product.productId._id)}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
