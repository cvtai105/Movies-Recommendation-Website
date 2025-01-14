import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MovieSearch from './MovieSearch';
import ActorSearch from './ActorSearch';
import { SearchPageProvider } from './SearchPageContext';

const SearchPage = () => {
  const [activeComponent, setActiveComponent] = useState('movies');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'movies':
        return <MovieSearch />;
      case 'actors':
        return <ActorSearch />;
      default:
        return <MovieSearch />;
    }
  };

  return (
    <SearchPageProvider>
      <div className="flex px-24">
        <div className="w-1/6">
          <Sidebar
            setActiveComponent={setActiveComponent}
            activeComponent={activeComponent}
          />
        </div>

        <div className="content flex-grow p-4 w-5/6">{renderComponent()}</div>
      </div>
    </SearchPageProvider>
  );
};

export default SearchPage;
