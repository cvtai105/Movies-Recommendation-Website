import { useState } from 'react';
import axios from 'axios';

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem('accessToken');

  const getErrorMessage = (status, message) => {
    switch (status) {
      case 401:
        return message || 'Invalid username or password';
      case 400:
        return message || 'Bad request';
      case 403:
        return 'Access denied';
      case 404:
        return message || 'Resource not found';
      case 500:
        return 'Server error';
      default:
        return message || 'Something went wrong';
    }
  };

  const fetchData = async ({
    url,
    method = 'GET',
    body = null,
    headers = {},
  }) => {
    setLoading(true);
    setError(null);

    try {
      const isFormData = body instanceof FormData;

      const config = {
        method,
        url: `${import.meta.env.VITE_API_URL}${url}`,
        headers: {
          ...(!isFormData && { 'Content-Type': 'application/json' }),
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          ...headers,
        },
        ...(body && { data: body }),
      };

      const response = await axios(config);

      // Xử lý response không có data
      if (response.status === 204 || !response.data) {
        setLoading(false);
        return true;
      }

      setLoading(false);
      return response.data;
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message;

      const errorMessage = getErrorMessage(status, message);
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  const setCustomError = (errorMessage) => {
    setError(errorMessage);
  };

  return { loading, error, fetchData, setCustomError };
};
