import { useState } from 'react';
import { register } from '../api/auth.api';
import { useLocation, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password);
      const params = new URLSearchParams(location.search);
      const redirect = params.get('redirect');
      navigate(`/login${redirect ? `?redirect=${redirect}` : ''}`);
    } catch (err: any) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Failed to register. Please try again later.';
      setError(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded bg-white">
      <h2 className="text-xl font-bold mb-4 text-coffee-espresso">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-coffee-caramel text-white py-2 rounded hover:bg-coffee-cocoa">
          Register
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
