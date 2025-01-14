import React, { useState } from 'react';
import {
  validateEmail,
  validateCode,
  validatePassword,
} from '../utils/validateInputs';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const ResetPassword = () => {
  const [phase, setPhase] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      validateEmail(email);
    } catch (err) {
      setError(err.message);
      return;
    }

    setError(null);
    //fetch api to send email
    NProgress.start();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_IDENTITY_API_URL}/auth/account/password/reset-request?email=${email}`,
        {
          method: 'GET',
        }
      );

      if (res.status >= 300) {
        const err = await res.json();
        console.error(err);
        throw new Error(err.title || 'An error occurred');
      }
      setError(null);
      const resJson = await res.json();
      setUserId(resJson.userId);
      setPhase(2);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      NProgress.done();
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      validateCode(code);
      validatePassword(password);
    } catch (err) {
      setError(err.message);
      return;
    }

    setError(null);

    NProgress.start();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_IDENTITY_API_URL}/auth/account/password/reset-confirm`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            code,
            password,
          }),
        }
      );

      if (res.status >= 300) {
        const err = await res.json();
        console.error(err);
        throw new Error(err.title || 'An error occurred');
      }
      setError(null);
      const resJson = await res.json();
      login(resJson.accessToken, resJson.refreshToken);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      NProgress.done();
    }

    //fetch api to reset password
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {phase === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <label className="block mb-2 text-left font-bold">
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </label>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Send Confirmation Email
            </button>
          </form>
        )}
        {phase === 2 && (
          <form onSubmit={handleResetSubmit}>
            <h2 className="text-2xl font-bold mb-4">
              Email Sent! Enter the code and your new password
            </h2>
            <label className="block mb-2 text-left font-bold">
              Code:
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </label>
            <label className="block mb-2 text-left font-bold">
              New Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </label>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
