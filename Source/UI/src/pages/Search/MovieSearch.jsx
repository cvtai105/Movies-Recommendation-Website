import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';
import { fetchMovies } from '../../apis/movie';
import { useSearchPageContext } from './SearchPageContext';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MovieSearch = () => {
  const query = useQuery();
  const searchTerm = query.get('query');
  const {
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
  } = useSearchPageContext();

  useEffect(() => {
    console.log('search term changed: ', searchTerm);
    setIsMovieLoading(true);
    NProgress.start();
    fetchMovies(searchTerm)
      .then((data) => {
        setMovies(data?.results || []);
        setTotalMoviePages(data?.total_pages || 0);
        setMoviePage(data?.page || 1);
      })
      .finally(() => {
        setIsMovieLoading(false);
        NProgress.done();
      });
  }, [searchTerm]);

  useEffect(() => {
    console.log('page changed: ', moviePage);
    if (moviePage >= totalMoviePages) {
      console.log('end of results');
      setEndOfMovieResults(true);
      return;
    } else {
      setEndOfMovieResults(false);
    }

    setIsMovieLoading(true);
    NProgress.start();
    fetchMovies(searchTerm, moviePage)
      .then((data) => {
        const newMovies = data?.results || [];
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      })
      .finally(() => {
        setIsMovieLoading(false);
        NProgress.done();
      });
  }, [moviePage]);

  useEffect(() => {
    let debounceTimeout;
    const handleScroll = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (
          scrollTop + windowHeight >= documentHeight - 100 &&
          !isMovieLoading
        ) {
          setMoviePage((prevPage) => prevPage + 1);
        }
      }, 200); // adjust the delay as needed
    };

    if (!isMovieLoading) {
      document.addEventListener('scroll', handleScroll);
    }

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isMovieLoading]);

  return (
    <div>
      <div style={containerStyles}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {endOfMovieResults ? (
        <p className=" text-center font-bold text-black py-4">THE END</p>
      ) : (
        <p className="text-center font-bold text-black py-4">LOADING</p>
      )}
    </div>
  );
};

const containerStyles = {
  display: 'flex',
  flexWrap: 'wrap', // Wrap items to the next row if needed
  gap: '1rem', // 16px gap between items
  paddingLeft: '1rem', // Left padding
  justifyContent: 'space-around',
  maxWidth: '1200px', // Optional: Limit the maximum width of the container
};

export default MovieSearch;
