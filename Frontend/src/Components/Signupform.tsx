import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
const SignupLoginForm = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    const baseURL = "http://localhost:3000";
    const url = isSignup ? `${baseURL}/user/register` : `${baseURL}/user/login`;
    try {
      const response = await axios.post(url, formData);
      setMessage(response.data.message);
      localStorage.setItem('auth-token', response.data.token); // Store token in local storage
      setFormData({ name: '', email: '', password: '' }); // Clear form data
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-[180px] p-5 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-500 transition duration-300"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-purple-600 hover:text-purple-500 transition duration-300"
          >
            {isSignup ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
          </button>
        </div>
      </div>
    </>
  );
};

export default SignupLoginForm;
