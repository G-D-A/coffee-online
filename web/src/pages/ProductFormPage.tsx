import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createProduct,
  getProductById,
  updateProduct,
} from '../api/menu.api';
import { RootState } from '../store';

const ProductFormPage = () => {
  const { id } = useParams();
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    image: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      getProductById(id!)
        .then((res) => {
          const d = res.data;
          setFormData({
            name: d.name || '',
            price: d.price || 0,
            stock: d.stock || 0,
            description: d.description || '',
            image: d.image || d.imgurl || '',
          });
        })
        .catch(() => setError('Failed to fetch product'));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name === 'imgurl' ? 'image' : name;
    setFormData((prev) => ({
      ...prev,
      [key]: key === 'price' || key === 'stock' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return setError('Login required');

    try {
      if (isEdit) {
        await updateProduct(id!, formData, token);
      } else {
        await createProduct(formData, token);
      }
      navigate('/menu');
    } catch {
      setError('Failed to save product');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-coffee-espresso">{isEdit ? 'Edit' : 'Create'} Menu Item</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-coffee-latte p-2 rounded focus:outline-none focus:ring-2 focus:ring-coffee-caramel"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-coffee-latte p-2 rounded focus:outline-none focus:ring-2 focus:ring-coffee-caramel"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border border-coffee-latte p-2 rounded focus:outline-none focus:ring-2 focus:ring-coffee-caramel"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
          className="w-full border border-coffee-latte p-2 rounded focus:outline-none focus:ring-2 focus:ring-coffee-caramel"
        />
        <input
          type="text"
          name="imgurl"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border border-coffee-latte p-2 rounded focus:outline-none focus:ring-2 focus:ring-coffee-caramel"
        />
        <button
          type="submit"
          className="bg-coffee-caramel text-white px-4 py-2 rounded hover:bg-coffee-cocoa"
        >
          {isEdit ? 'Update' : 'Create'} Item
        </button>
      </form>
    </div>
  );
};

export default ProductFormPage;
