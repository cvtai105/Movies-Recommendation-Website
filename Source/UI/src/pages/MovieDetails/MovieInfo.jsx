import { useState, useContext } from 'react';
import Modal from 'react-modal';
import Rating from 'react-rating-stars-component';
import { ToastContainer, toast } from 'react-toastify';

import {
  JAVA_API,
  TMDB_STATIC_FILE_PATH,
} from '../../const/linkToResource';
import axios from 'axios';
import { AppContext } from '../../AppContext';

const MovieInfo = ({ info }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const { userData, isAuthenticated } = useContext(AppContext);

  // Open and close modal handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle rating submission
  const handleRatingChange = (newRating) => {
    setRating(newRating * 20);
  };

  const submitRating = async () => {

    if (!isAuthenticated()) {
      toast.warning('Please login to rate movie.');
      return;
    }

    const timeNow = new Date();

    const reqBody = {
      rating: rating,
      created_at: timeNow.toISOString(),
      UserID: parseInt(userData.userId),
      tmdb_id: info.tmdb_id,
      name: info.original_title,
      poster_path: info.poster_path,
    };

    console.log("req", reqBody);

    try {
      const response = await axios.post(`${JAVA_API}/rating`, reqBody);
      console.log("response", response);  
      toast.success('Rating submitted successfully with ' + rating + ' score');
    } catch (error) {
      toast.warning('Rating failed. ' + error.message);
    }
    closeModal();
  };

  const handleFavoriteClick = async () => {
    if (!isAuthenticated()) {
      toast.warning('Please login to add movie to Favorite.');
      return;
    }

    const requestBody = {
      UserID: parseInt(userData.userId),
      tmdb_id: info.tmdb_id,
      name: info.original_title,
      poster_path: info.poster_path,
    };

    try {
      await axios.post(`${JAVA_API}/favorite`, requestBody);
      toast.success('Movie added to Favorite.');
    } catch (error) {
      toast.warning('Failed to add movie to Favorite.');
    }
  };

  const handleWatchlistClick = async () => {
    if (!isAuthenticated()) {
      toast.warning('Please login to add movie to watchlist.');
      return;
    }

    const requestBody = {
      UserID: parseInt(userData.userId),
      tmdb_id: info.tmdb_id,
      name: info.original_title,
      poster_path: info.poster_path,
    };

    try {
      await axios.post(`${JAVA_API}/watchlist`, requestBody);
      toast.success('Movie added to watchlist.');
    } catch (error) {
      toast.warning('Failed to add movie to watchlist.');
    }
  };

  return (
    <div className="relative text-white text-left border bg-gray-200">
      <section className="flex m-2 h-screen py-4">
        <div className="h-full w-[calc(100vh*9/16)] mx-4">
          <img
            className="h-full w-full object-cover rounded-md"
            src={`${TMDB_STATIC_FILE_PATH}/${info?.poster_path}`}
            alt={info?.title}
          />
        </div>
        <div className="w-full bg-no-repeat bg-contain bg-center text-slate-800 mr-4">
          <img
            className="w-full h-full object-cover opacity-30 object-center"
            src={`${TMDB_STATIC_FILE_PATH}/${info?.backdrop_path}`}
            alt={info?.title}
          />
          <section className="absolute sm:top-[50%] md:top-[10%] flex flex-col gap-4 mx-4 p-4">
            <div>
              <h1 className="text-4xl font-bold text-left">
                {info?.original_title}{' '}
              </h1>
              <div className="flex flex-row">
                {!!info?.release_date && (
                  <p className="text-slate-500 border-r-2 border-gray-300 pr-2">
                    Released {info?.release_date}
                  </p>
                )}
                <ul className="flex flex-row border-r-2 border-gray-300 pr-2">
                  {info?.genres?.map((g, index) => {
                    if (index == info?.genres.length - 1)
                      return <li className="ml-2" key={g.name}>{g.name}</li>;
                    else return <li className="ml-2" key={g.name}>{g.name}, </li>;
                  })}
                </ul>

                {!!info?.runtime && (
                  <span className="mx-2">
                    {Math.floor(info.runtime / 60)}h {info.runtime % 60}m
                  </span>
                )}
              </div>
            </div>

            {/* Score band */}
            <div className="flex flex-row gap-2 items-center">
              <div className="relative w-24 h-24">
                <svg
                  className="absolute inset-0 w-full h-full transform rotate-[-90deg]"
                  viewBox="0 0 36 36"
                >
                  <circle
                    className="text-slate-500 "
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="slate-500"
                    cx="18"
                    cy="18"
                    r="17"
                  />
                  <circle
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    cx="18"
                    cy="18"
                    r="16"
                  />
                  <circle
                    className="text-green-500"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${info?.vote_average * 10}, 100`}
                    fill="none"
                    cx="18"
                    cy="18"
                    r="16"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-500">
                    {(info?.vote_average * 10).toFixed(1)}
                    <span className="text-sm">%</span>
                  </span>
                </div>
              </div>
              <p>
                User Score
                <br />
                {info?.vote_count} votes
              </p>
            </div>

            <div>
              <h2>Overview:</h2>
              <p className="sm:w-full md:w-3/4">{info?.overview}</p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              {/* Love Button */}
              <div className="relative">
                <button
                  onClick={handleFavoriteClick}
                  className="w-16 h-16 flex items-center justify-center bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-white bg-black p-2 rounded opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Love
                </span>
              </div>

              {/* Wishlist Button */}
              <div className="relative">
                <button
                  onClick={handleWatchlistClick}
                  className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
                >
                  {/* Wishlist Icon (Heart Outline) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLineJoin="round"
                      d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                    />
                  </svg>
                </button>
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-white bg-black p-2 rounded opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Watchlist
                </span>
              </div>

              <div className="relative">
                {/* <button className="w-16 h-16 flex items-center justify-center bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"></button> */}
                <button
                  onClick={openModal}
                  className="w-16 h-16 flex items-center justify-center bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLineJoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </button>
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-white bg-black p-2 rounded opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Rating
                </span>
              </div>
            </div>

            {/* Rating Modal */}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Rate Movie"
              className="bg-white w-96 p-6 rounded-lg shadow-lg mx-auto mt-20"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <h2 className="text-xl font-bold text-center mb-4">
                Rate This Movie
              </h2>

              {/* Rating Component */}
              <div className="flex justify-center mb-6">
                <Rating
                  count={5}
                  value={rating}
                  size={40}
                  activeColor="gold"
                  onChange={handleRatingChange}
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={submitRating}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  disabled={!rating} // Disable if no rating is selected
                >
                  Submit
                </button>
              </div>
            </Modal>
          </section>
        </div>
        {/* Toast Notification Container */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </section>
    </div>
  );
};

export default MovieInfo;
