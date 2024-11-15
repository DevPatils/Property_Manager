import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 shadow-lg z-50">
    <div className="flex justify-between items-center px-4 lg:px-8 py-4">
      {/* Logo - Extreme Left */}
      <h1 className="text-2xl font-bold text-white">
        Propseek<span className="text-gray-200">.com</span>
      </h1>
      
      {/* Navigation Links - Extreme Right */}
      <div className="flex space-x-6">
        <Link
          to="/"
          className="text-white hover:text-gray-200 px-3 py-2 font-medium transition-all duration-300"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="text-white hover:text-gray-200 px-3 py-2 font-medium transition-all duration-300"
        >
          Dashboard
        </Link>
       
        <Link
          to="/servicesdashboard"
          className="text-white hover:text-gray-200 px-3 py-2 font-medium transition-all duration-300"
        >
          Services Dashboard
        </Link>
        <Link
          to="/signup"
          className="bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-md"
        >
          Sign Up
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
