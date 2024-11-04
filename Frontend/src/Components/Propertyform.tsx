import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from './Propertylist';
interface PropertyFormData {
  propertyname: string;
  propertytype: string;
  address: string;
  DOP: string;
  image: string;
}

const PropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    propertyname: '',
    propertytype: '',
    address: '',
    DOP: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('auth-token'); // Assuming token is stored in localStorage
    try {
      const response = await axios.post(`${baseURL}/property/addproperty`, formData, {
        headers: { 'auth-token': token },
      });
      alert(response.data.message);
      setFormData({ propertyname: '', propertytype: '', address: '', DOP: '', image: '' }); // Clear form
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data?.error || 'An error occurred');
      } else {
        alert('An error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5 p-5 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-3">Add New Property</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Property Name</label>
        <input
          type="text"
          name="propertyname"
          value={formData.propertyname}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Property Type</label>
        <input
          type="text"
          name="propertytype"
          value={formData.propertytype}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date of Purchase (DOP)</label>
        <input
          type="date"
          name="DOP"
          value={formData.DOP}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-500 transition duration-300"
      >
        Add Property
      </button>
    </form>
  );
};

export default PropertyForm;
