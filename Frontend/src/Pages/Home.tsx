import Navbar from '../Components/Navbar';

const Home = () => (
  <div>
    <Navbar />
    {/* Hero Section */}
    <header className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 text-white py-20 px-8 text-center">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome to Propseek 
        
      </h1>
      <p className="text-lg mb-8 max-w-2xl mx-auto">
        Simplify your property management with our powerful and intuitive platform. Track tenants, manage payments, and keep your properties running smoothly.
      </p>
      <button className="bg-white text-purple-700 px-8 py-3 font-semibold rounded-full hover:bg-gray-100 transition duration-300 shadow-md">
        Get Started
      </button>
    </header>

    {/* Features Section */}
    <section className="py-16 px-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Features You'll Love</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold text-purple-600 mb-2">Tenant Management</h3>
          <p className="text-gray-600">
            Organize tenant details, lease agreements, and communication in one secure place.
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold text-purple-600 mb-2">Payment Tracking</h3>
          <p className="text-gray-600">
            Easily monitor rent payments and generate financial reports for better insights.
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold text-purple-600 mb-2">Property Insights</h3>
          <p className="text-gray-600">
            Get actionable analytics and insights to manage your portfolio effectively.
          </p>
        </div>
      </div>
    </section>

    {/* Why Choose Us Section */}
    <section className="py-16 px-8 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Why Choose Us?</h2>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-700 mb-8">
          Our platform is built to make property management simple, efficient, and secure. Here's why we're trusted by property managers everywhere:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-purple-600 mb-2">Secure & Reliable</h4>
            <p className="text-gray-600">Your data is protected with advanced security measures and encrypted systems.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-purple-600 mb-2">Customizable Tools</h4>
            <p className="text-gray-600">Adapt the platform to meet your specific property management needs.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-purple-600 mb-2">24/7 Support</h4>
            <p className="text-gray-600">Get dedicated customer support whenever you need it, day or night.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-purple-600 mb-2">Real-Time Notifications</h4>
            <p className="text-gray-600">Stay updated with instant notifications on payments, maintenance, and more.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Footer Section */}
    <footer className="py-8 bg-purple-600 text-white text-center">
      <p className="mb-4">&copy; {new Date().getFullYear()} Property Manager. All rights reserved.</p>
      <div className="flex justify-center space-x-4">
        <a href="#!" className="hover:underline">Privacy Policy</a>
        <a href="#!" className="hover:underline">Terms of Service</a>
        <a href="#!" className="hover:underline">Contact Us</a>
      </div>
    </footer>
  </div>
);

export default Home;
