import axios from 'axios';
import React, { useEffect, useState } from 'react';
import requests from '../apis/request.js';
import Carousel from './Carousel';

const Main = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        requests.Popular.url + '?page=1&size=20',
        requests.Popular.config
      );
      const movies = response.data.data.movies;
      setMovies(movies);
    }
    fetchData();
  }, []);
  return (
    <div className="main w-[full] h-[550px]">
      {movies.length != 0 && <Carousel data={movies} />}
    </div>
  );
};

export default Main;