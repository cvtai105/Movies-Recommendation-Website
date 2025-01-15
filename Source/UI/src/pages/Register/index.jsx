import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import {
  validateEmail,
  validateName,
  validatePassword,
  validateCode,
} from '../../utils/validateInputs';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [code, setCode] = useState('');
  const [userId, setUserId] = useState('');
  const { login } = useContext(AppContext);
  const [codeSent, setCodeSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    NProgress.start();

    try {
      validateEmail(email);
      validatePassword(password);
      validateName(name);
      const response = await fetch(
        `${import.meta.env.VITE_IDENTITY_API_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // username: username,
            email: email,
            password: password,
            name: name,
            avatar:
              'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg',
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      setCodeSent(true);
      setUserId(data.userId);
    } catch (err) {
      setError(err.message);
    } finally {
      NProgress.done();
    }
  };

  const handleConfirmCode = async (e) => {
    e.preventDefault();
    setError(null);
    NProgress.start();
    try {
      validateCode(code);
      const response = await fetch(
        `${import.meta.env.VITE_IDENTITY_API_URL}/auth/account/confirm-email?userId=${userId}&code=${code}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      login(data.accessToken, data.refreshToken);
      NProgress.done();
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      NProgress.done();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 text-center border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        Register Information
      </h1>
      {!codeSent && (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="text-left">
            <label className="font-medium text-gray-700">Email:</label>
            <input
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setCodeSent(false);
              }}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-left">
            <label className="font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-left">
            <label className="font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
          >
            Send Email Confirmation Code
          </button>
        </form>
      )}
      {codeSent && (
        <form onSubmit={handleConfirmCode} className="flex flex-col space-y-4">
          <div className="text-left">
            <label className="font-medium text-gray-700">
              Code sent to your email:
            </label>
            <input
              type="text"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
          >
            Confirm code
          </button>
        </form>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <p className="mt-6 text-gray-600">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Login here
        </span>
      </p>
    </div>
  );
}

export default Register;
