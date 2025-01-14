import React, { useEffect, useState } from 'react';
import movieClient from '../apis/movieClient.js';

const movies = [
  { id: 1, title: 'Movie 1', poster: 'https://picsum.photos/200/300' },
  { id: 2, title: 'Movie 2', poster: 'https://picsum.photos/200/300' },
  { id: 3, title: 'Movie 3', poster: 'https://picsum.photos/200/300' },
  { id: 4, title: 'Movie 4', poster: 'https://picsum.photos/200/300' },
  { id: 5, title: 'Movie 5', poster: 'https://picsum.photos/200/300' },
  { id: 6, title: 'Movie 6', poster: 'https://picsum.photos/200/300' },
  { id: 7, title: 'Movie 7', poster: 'https://picsum.photos/200/300' },
  { id: 8, title: 'Movie 8', poster: 'https://picsum.photos/200/300' },
  // Thêm danh sách phim khác
];

const MovieGallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayeWatchlist, setDisplayeWatchlist] = useState([]);
  const [displayedFavourite, setDisplayedFavourite] = useState([]);
  const [displayedRatingList, setDisplayRatingList] = useState([]);
  const moviesPerPage = 4;

  const totalMovies = movies.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  useEffect(() => {
    // Gọi API để lấy danh sách yêu thíc
    async function getFavouriteList() {
      const response = await movieClient.get('/favourite/6');
      console.log(response);
    }
    getFavouriteList();
  }, [])

  const displayedMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen min-w-full bg-gray-100 px-32 py-6">
      {/* Header */}
      <div className="text-start text-2xl font-bold text-gray-800">
        Movie Gallery
      </div>
      {/* Movie List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {displayedMovies.map((movie) => (
          <div
            key={movie.id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white text-lg font-semibold border border-white rounded-full px-4 py-2">
                Detail
              </span>
            </div>
            <p className="text-center text-gray-700 font-medium py-2">
              {movie.title}
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
