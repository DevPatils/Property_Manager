import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Property {
  _id: string;
  propertyname: string;
  propertytype: string;
  address: string;
  DOP: string;
  image: string;
}

export const baseURL = "http://localhost:3000";
const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchProperties = async () => {
    const token = localStorage.getItem('auth-token');

    try {
      const response = await axios.get(`${baseURL}/property/allproperties`, {
        headers: { 'auth-token': token },
      });
      setProperties(response.data.properties);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || 'An error occurred');
      } else {
        alert('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('auth-token');
    try {
      const response = await axios.delete(`${baseURL}/property/deleteproperty/${id}`, {
        headers: { 'auth-token': token },
      });
      alert(response.data.message);
      fetchProperties(); // Refresh property list
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || 'An error occurred');
      } else {
        alert('An error occurred');
      }
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) return <p>Loading properties...</p>;

  return (
    <div className="mt-5 p-5 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-3">Property List</h2>
      <ul>
        {properties.map((property) => (
          <li key={property._id} className="flex justify-between items-center border-b py-2">
            <div>
              <h3 className="text-lg font-semibold">{property.propertyname}</h3>
              <p>{property.propertytype} | {property.address}</p>
            </div>
            <button
              onClick={() => handleDelete(property._id)}
              className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500 transition duration-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
