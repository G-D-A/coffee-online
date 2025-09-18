import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center bg-[url('https://images.unsplash.com/photo-1445077100181-a33e9ac94db0?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center">
      <div className="backdrop-brightness-75 p-8 rounded">
        <h1 className="text-4xl font-bold mb-4 text-white">Fresh coffee online</h1>
        <p className="mb-6 text-lg text-coffee-cream">Pick your favorite drinks and place your order in a minute.</p>
        <Link to="/menu" className="px-6 py-3 bg-coffee-caramel text-white rounded hover:bg-coffee-cocoa transition shadow">
          Go to menu
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
