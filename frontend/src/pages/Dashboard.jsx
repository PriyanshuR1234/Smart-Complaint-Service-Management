import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    // Call the Spring Boot backend Test API
    axios.get('http://localhost:8081/api/test')
      .then(response => {
        setBackendMessage(response.data.message);
      })
      .catch(error => {
        console.error("Error connecting to backend:", error);
        setBackendMessage('Failed to connect to backend.');
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
      <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900">Backend Connection Status:</h3>
        <p className={`mt-2 text-lg font-bold ${backendMessage.includes('Failed') ? 'text-danger' : 'text-success'}`}>
          {backendMessage || 'Connecting to backend...'}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        <div className="h-96 border-4 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Dashboard Content Placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
