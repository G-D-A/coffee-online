import { FC, useState } from 'react';

interface ProductFormProps {
  initialValues?: {
    name: string;
    price: number;
    stock: number;
    image?: string;
  };
  onSubmit: (data: {
    name: string;
    price: number;
    stock: number;
    image?: string;
  }) => void;
  isEdit?: boolean;
}

const ProductForm: FC<ProductFormProps> = ({ initialValues, onSubmit, isEdit }) => {
  const [formData, setFormData] = useState(
    initialValues || { name: '', price: 0, stock: 0, image: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price' || name === 'stock' ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        name="name"
        placeholder="Product name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {isEdit ? 'Update' : 'Create'} Product
      </button>
    </form>
  );
};

export default ProductForm;
