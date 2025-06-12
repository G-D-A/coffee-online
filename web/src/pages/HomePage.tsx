import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the online store!</h1>
      <p className="mb-6 text-lg">Select products, add to cart and place an order.</p>
      <Link to="/products" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Go to the product catalog
      </Link>
    </div>
  );
};

export default HomePage;
