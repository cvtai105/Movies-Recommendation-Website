import React, { createContext, useContext, useState } from 'react';

const SearchPageContext = createContext();

export const useSearchPageContext = () => {
  return useContext(SearchPageContext);
};

export const SearchPageProvider = ({ children }) => {
  const [movieSearchTerm, setMovieSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [isMovieLoading, setIsMovieLoading] = useState(false);
  const [endOfMovieResults, setEndOfMovieResults] = useState(false);
  const [moviePage, setMoviePage] = useState(1);
  const [totalMoviePages, setTotalMoviePages] = useState(0);

  const [actorSearchTerm, setActorSearchTerm] = useState('');
  const [actors, setActors] = useState([]);
  const [isActorLoading, setIsActorLoading] = useState(false);
  const [endOfActorResults, setEndOfActorResults] = useState(false);
  const [actorPage, setActorPage] = useState(1);
  const [totalActorPages, setTotalActorPages] = useState(0);

  return (
    <SearchPageContext.Provider
      value={{
        movieSearchTerm,
        setMovieSearchTerm,
        movies,
        setMovies,
        isMovieLoading,
        setIsMovieLoading,
        endOfMovieResults,
        setEndOfMovieResults,
        moviePage,
        setMoviePage,
        totalMoviePages,
        setTotalMoviePages,
        actorSearchTerm,
        setActorSearchTerm,
        actors,
        setActors,
        isActorLoading,
        setIsActorLoading,
        endOfActorResults,
        setEndOfActorResults,
        actorPage,
        setActorPage,
        totalActorPages,
        setTotalActorPages,
      }}
    >
      {children}
    </SearchPageContext.Provider>
  );
};
