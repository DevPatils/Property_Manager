import React from 'react';
import PropertyForm from '../Components/Propertyform';
import PropertyList from '../Components/Propertylist';
import Navbar from '../Components/Navbar';
const Dashboard: React.FC = () => {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Property Management Dashboard</h1>
      <PropertyForm />
      <PropertyList />
    </div>
    </>
  );
};

export default Dashboard;
