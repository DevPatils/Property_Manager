import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { baseURL } from '../Components/Propertylist';
import Navbar from '../Components/Navbar';

interface Service {
  _id: string;
  servicetype: string;
  dateofservice: string;
  costofservice: number;
  property: Property;
}

interface NewService {
  servicetype: string;
  dateofservice: string;
  costofservice: number;
  property: string;
}

interface FetchServicesResponse {
  services: Service[];
}

interface AddServiceResponse {
  message: string;
}

interface DeleteServiceResponse {
  message: string;
}
interface Property {
  _id: string;
  propertyname: string;
  propertytype: string;
  address: string;
  DOP: string;
  image: string;
}
const ServicesDash: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState<NewService>({
    servicetype: '',
    dateofservice: '',
    costofservice: 0,
    property: ''
  });
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem('auth-token');
  // console.log(token);
  // Fetch all services for the user
  const fetchServices = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<FetchServicesResponse> = await axios.get(`${baseURL}/service/getServicesByUser`, {
        headers: { 'auth-token': token || '' }
      });
      setServices(response.data.services);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error(axiosError.response?.data || 'Error fetching services');
    } finally {
      setLoading(false);
    }
  };
  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${baseURL}/property/getpropertybyUser`, {
        headers: { 'auth-token': token || '' }
      });
      // console.log(response.data.properties)
      setProperties(response.data)
      console.log(properties);
    } catch (error) {
      console.error('Error fetching properties', error);
    }
  };
  useEffect(() => {
    fetchServices();
    fetchProperties();
  }, []);

  // Handle input changes for adding a new service
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  // Submit a new service
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (token === null) {
        throw new Error('No token found');
      }
      const response: AxiosResponse<AddServiceResponse> = await axios.post(`${baseURL}/service/addService`, newService, {
        headers: { 'auth-token': token || '' }
      });
      alert(response.data.message);
      fetchServices(); // Refresh service list
      setNewService({ servicetype: '', dateofservice: '', costofservice: 0, property: '' });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error(axiosError.response?.data || 'Error adding service');
    }
  };

  // Delete a service
  const handleDelete = async (id: string) => {
    try {
      const response: AxiosResponse<DeleteServiceResponse> = await axios.delete(`${baseURL}/service/deleteService/${id}`, {
        headers: { 'auth-token': token || '' }
      });
      alert(response.data.message);
      fetchServices(); // Refresh service list
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error(axiosError.response?.data || 'Error deleting service');
    }
  };

  if (loading) return <p>Loading services...</p>;

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-5">

        <h1 className="text-3xl font-bold mb-5">Service Management</h1>

        {/* Form to Add a New Service */}
        <form onSubmit={handleSubmit} className="mb-5 p-5 bg-white shadow-md rounded">
          <h2 className="text-xl font-bold mb-3">Add New Service</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Service Type</label>
            <input
              type="text"
              name="servicetype"
              value={newService.servicetype}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date of Service</label>
            <input
              type="date"
              name="dateofservice"
              value={newService.dateofservice}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cost of Service</label>
            <input
              type="number"
              name="costofservice"
              value={newService.costofservice}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Property</label>
            <select
              name="property"
              value={newService.property}
              // @ts-expect-error: value is not a number
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select a property</option>
              {properties.map((property) => (
                <option key={property._id} value={property._id}>
                  {property.propertyname}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-500 transition duration-300"
          >
            Add Service
          </button>
        </form>

        {/* List of Services */}
        <div className="mt-5 p-5 bg-white shadow-md rounded">
          <h2 className="text-xl font-bold mb-3">Your Services</h2>
          <ul>
            {services.map((service) => (
              <li key={service._id} className="flex justify-between items-center border-b py-2">
                <div>
                  <h3 className="text-lg font-semibold">{service.servicetype}</h3>
                  <p>Date: {new Date(service.dateofservice).toLocaleDateString()}</p>
                  <p>Cost: ${service.costofservice}</p>
                  <p>Property Name: {service.property.propertyname}</p>
                  <p>Property Type: {service.property.propertytype}</p>
                  <p>Address: {service.property.address}</p>
                  <img src={service.property.image} alt="Property" className="w-20 h-20 mt-2 rounded" />
                </div>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500 transition duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>

  );
};

export default ServicesDash;
