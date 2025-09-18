import { Link, useLocation } from 'react-router-dom';

const AuthRequiredPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get('redirect') || '/menu';

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center">
      <div className="backdrop-brightness-75 p-8 rounded text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Authorization required</h2>
        <p className="text-coffee-cream mb-6">To add items to the cart, please log in or register.</p>
        <div className="flex gap-3 justify-center">
          <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="px-5 py-2 rounded bg-coffee-caramel text-white hover:bg-coffee-cocoa">Login</Link>
          <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="px-5 py-2 rounded bg-white text-coffee-espresso hover:bg-coffee-cream">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default AuthRequiredPage;


