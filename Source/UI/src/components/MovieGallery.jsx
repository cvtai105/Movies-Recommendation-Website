import React, { useEffect, useState } from 'react';
import movieClient from '../apis/movieClient.js';
import { AppContext, useAppContext } from '../AppContext.jsx';
import { Link } from 'react-router-dom';

const MovieGallery = ({ title, url, props }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const moviesPerPage = 4;
  const { userData } = useAppContext(AppContext);

  const length = movies.length;
  const totalPages = Math.ceil(length / moviesPerPage);

  useEffect(() => {
    // Gọi API để lấy danh sách yêu thíc
    async function getMovies() {
      await movieClient
        .get(`${url}/${userData.userId}`)
        .then((response) => {
          setMovies(response.data.movie_shorts);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getMovies();
  }, []);

  const displayedMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  console.log(movies);
  console.log(displayedMovies);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-h-[400px] min-w-full bg-gray-100 px-32 py-2 mb-10">
      {/* Header */}
      <div className="text-start text-2xl font-bold text-gray-800">{title}</div>
      {/* Movie List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {displayedMovies.map((movie) => (
          <div
            key={movie.tmdb_id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Link to={`/movies/${movie.tmdb_id}`}>
                <span className="text-white text-lg font-semibold border border-white rounded-full px-4 py-2">
                  Detail
                </span>
              </Link>
            </div>
            <p className="text-center text-gray-700 font-medium py-2">
              {movie.name}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end mt-6 space-x-2">
        {/* Nút về trang đầu tiên */}
        <button
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
        >
          &laquo;
        </button>

        {/* Các số trang */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-1 rounded-lg ${
              page === currentPage
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Nút tới trang cuối */}
        <button
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default MovieGallery;
