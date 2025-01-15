import React from 'react';
import { useNavigate } from 'react-router-dom';

function UnauthorizedPage() {
  const navigate = useNavigate();
  //get error message from error query parameter
  const error = new URLSearchParams(window.location.search).get('error');

  const handleGoBack = () => {
    navigate('/'); // navigates to the previous page
  };
  const handleLogin = () => {
    navigate('/login'); // navigates to the login page
  };

  return (
    <div className="max-w-xl mx-auto my-2 mt-12 p-10 text-center border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        You does not have permission to access this resource
      </h1>
      <p className="text-lg text-gray-600 mb-6">{error}</p>
      <button
        onClick={handleGoBack}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Back
      </button>
      <span className="mx-4 text-gray-400">or</span>
      <button
        onClick={handleLogin}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  );
}

export default UnauthorizedPage;
