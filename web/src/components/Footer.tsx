import logo from '../assets/logo.jpeg';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 border-t mt-auto">
      <div className="flex justify-center items-center gap-2">
        <img src={logo} alt="logo" className="w-6 h-6" />
        <span className="text-sm text-gray-500">
          © 2025 Online Store. All rights reserved by Hvozd Danylo.
        </span>
        <img src={logo} alt="logo" className="w-6 h-6" />
      </div>
    </footer>
  );
};

export default Footer;
