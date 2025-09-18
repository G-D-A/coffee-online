import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../features/auth/authSlice';

const Header = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum: number, it: any) => sum + (it.quantity || 0), 0)
    : 0;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-coffee-espresso text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          ☕ CoffeeOnline
        </Link>
        <nav className="flex space-x-4">
          <Link to="/menu" className="hover:underline">
            Menu
          </Link>
          {token ? (
            <>
              <Link to="/cart" className="relative hover:underline flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.36.279l.307 1.228 1.3 5.2a2.25 2.25 0 002.185 1.693h7.706a2.25 2.25 0 002.185-1.693l1.28-5.124A.75.75 0 0018.75 4.5H5.566l-.22-.882A1.875 1.875 0 003.636 2.25H2.25z" />
                  <path d="M8.25 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18.75 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-coffee-caramel text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link to="/orders" className="hover:underline">
                Orders
              </Link>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
              <button onClick={handleLogout} className="hover:underline text-red-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
