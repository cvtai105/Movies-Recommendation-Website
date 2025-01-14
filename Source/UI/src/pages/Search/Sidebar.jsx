import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ setActiveComponent, activeComponent }) => {
  return (
    <div className="w-full shadow-md mt-4">
      <h3 className={`${styles.header} text-xl font-bold`}>Search Result</h3>
      <nav className="mt-3 flex-col">
        <div
          onClick={() => setActiveComponent('movies')}
          className="flex items-center justify-between p-2 hover:bg-gray-200 cursor-pointer"
        >
          <span className="flex items-center  gap-2 ">
            <span className={`material-icons`}>movie</span>
            <span>Movies</span>
          </span>
          {activeComponent === 'movies' && (
            <span className="w-1 rounded-sm h-full text-cyan-600 bg-cyan-600">
              |
            </span>
          )}
        </div>
        <div
          onClick={() => setActiveComponent('actors')}
          className="flex items-center justify-between p-2 hover:bg-gray-200 cursor-pointer"
        >
          <span className="flex items-center  gap-2 ">
            <span className={`material-icons`}>person</span>
            <span>Actors</span>
          </span>
          {activeComponent === 'actors' && (
            <span className="w-1 rounded-sm h-full text-cyan-600 bg-cyan-600">
              |
            </span>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
