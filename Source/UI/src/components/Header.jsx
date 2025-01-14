import React from 'react';
import { useAppContext } from '../AppContext';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import {
  faUser,
  faHeart,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { logout, isAuthenticated, userData } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-14">
          <NavLink
            to="/"
            className="text-2xl font-bold flex items-center text-cyan-400 "
          >
            MRW
          </NavLink>
        </div>

        <SearchBar />

        {/* Language Selector and Login */}
        <div className="flex items-center space-x-4">
          {isAuthenticated() ? (
            <div className="relative">
              <img
                src={userData.picture}
                alt="User Avatar"
                className="w-9 h-9 rounded-full cursor-pointer hover:opacity-80"
                onClick={toggleDropdown}
              />
              <div
                className={`absolute z-50 right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg transition-all duration-300 ${
                  dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                <NavLink
                  to="/profile"
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Profile
                </NavLink>
                <NavLink
                  to="/favorite"
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faHeart} className="mr-2" />
                  Favorite
                </NavLink>
                <button
                  onClick={logout}
                  className="flex items-center w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <NavLink to="/login" className="hover:text-blue-400 font-bold">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
