import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movie = ({ movie, savedMovies, props }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Kích hoạt hiệu ứng khi movie thay đổi
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 500); // Hiệu ứng delay 0.5s
    return () => clearTimeout(timer); // Dọn dẹp timeout khi component unmount
  }, [movie]);

  return (
    <Link to={`/movies/${movie.tmdb_id}`}>
      <div
        className={`${
          visible ? "fade-in" : "fade-out"
        } h-full w-[350px] inline-block mr-8 cursor-pointer group relative text-white`}
      >
        <img
          className={`${
            visible ? "fade-in" : "fade-out"
          } w-full object-cover rounded-2xl group-hover:shadow-lg group-hover:shadow-[#000B58]/70`}
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.original_title}
        />
        <p className="hidden group-hover:flex w-full absolute bottom-0 bg-black py-3 px-2 opacity-70 rounded-b-2xl -translate-y-[50%]">
          {movie.original_title}
        </p>
      </div>
    </Link>
  );
};

export default Movie;