import logo from '../assets/logo.jpeg';

const Footer = () => {
  return (
    <footer className="bg-coffee-cream text-center py-4 border-t mt-auto">
      <div className="flex justify-center items-center gap-2">
        <img src={logo} alt="logo" className="w-6 h-6 rounded" />
        <span className="text-sm text-coffee-espresso">
          © {new Date().getFullYear()} CoffeeOnline. All rights reserved by Hvozd Danylo.
        </span>
        <img src={logo} alt="logo" className="w-6 h-6 rounded" />
      </div>
    </footer>
  );
};

export default Footer;
