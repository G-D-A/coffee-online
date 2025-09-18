import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getProductById, updateProduct } from '../api/menu.api';

const EditMenuItemPage = () => {
  const { id } = useParams();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<any>(null);

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      navigate('/', { replace: true });
      return;
    }
    const fetchData = async () => {
      try {
        const res = await getProductById(id!);
        setInitialValues(res.data);
      } catch {
        alert('Failed to load product');
      }
    };
    fetchData();
  }, [id, token, user, navigate]);

  const handleUpdate = async (data: any) => {
    if (!token || !id) return;
    try {
      await updateProduct(id, data, token);
      navigate('/products');
    } catch {
      alert('Error updating product');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Menu Item</h1>
      {initialValues && <ProductForm initialValues={initialValues} onSubmit={handleUpdate} isEdit />}
    </div>
  );
};

export default EditMenuItemPage;
