import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../AppContext';

const Profile = () => {
  const { userData } = useAppContext();
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <FontAwesomeIcon
          icon={faUserCircle}
          size="6x"
          className="text-gray-500"
        />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          {userData.name}
        </h2>
        <p className="text-gray-600">{userData.email}</p>
      </div>
    </div>
  );
};

export default Profile;
