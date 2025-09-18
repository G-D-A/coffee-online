import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { createProduct } from '../api/menu.api';

const CreateMenuItemPage = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  const handleCreate = async (data: any) => {
    if (!token) return;
    try {
      await createProduct(data, token);
      navigate('/products');
    } catch (err) {
      alert('Error creating product');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Create Product</h1>
      <ProductForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreateMenuItemPage;
