import { Link } from 'react-router-dom'; 

const Navbar = () => (
    <nav className="flex justify-between items-center p-4 bg-purple-600 text-white">
        <h1 className="text-2xl font-bold">MyApp</h1>
        <div className="flex space-x-4">

            <Link to="/signup" className="bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded transition duration-300">Sign Up</Link>
        </div>
    </nav>
);

export default Navbar;
