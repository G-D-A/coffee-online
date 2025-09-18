import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { loginUser } from '../features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        const params = new URLSearchParams(location.search);
        const redirect = params.get('redirect');
        navigate(redirect ? decodeURIComponent(redirect) : '/menu');
      } else {
        const payload = resultAction.payload as string;
        setError(payload || 'Login failed');
      }
    } catch (err: any) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Login error';
      setError(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold text-coffee-espresso">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full bg-coffee-caramel text-white py-2 rounded hover:bg-coffee-cocoa"
        >
          {auth.status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
