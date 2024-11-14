import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

async function loginUser(credentials) {
  const response = await axios.post('http://3.218.8.102/api/authenticate', credentials);
  const { id_token } = response.data;
  return id_token;
}

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({ username, password });
    setToken(token);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#efc8ce] p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-center text-2xl font-bold mb-6">Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700 font-bold">Username</span>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700 font-bold">Password</span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </label>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 w-full" // Increased width to match input
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
