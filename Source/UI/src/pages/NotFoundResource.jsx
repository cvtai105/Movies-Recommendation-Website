import { useNavigate } from "react-router-dom";

const NotFoundResource = (    ) => {
  const navigate = useNavigate();
  //get error message from error query parameter
  const error = new URLSearchParams(window.location.search).get('error');

  const handleGoBack = () => {
    navigate('/'); 
  };
 
  return (
    <div className="max-w-xl mx-auto my-2 mt-12 p-10 text-center border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        The Resource you are looking for is not found.
      </h1>
      <p className="text-lg text-gray-600 mb-6">{error}</p>
      <button
        onClick={handleGoBack}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundResource;
