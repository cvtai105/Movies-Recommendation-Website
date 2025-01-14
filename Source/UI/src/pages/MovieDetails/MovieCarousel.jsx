import { IoMdArrowDropright } from 'react-icons/io';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

const MovieCarousel = ({ movies, title }) => {
  function moveSlideToLeft() {
    let slider = document.getElementById('slider_carousel');
    slider.scrollLeft = slider.scrollLeft - 500;
  }

  function moveSlideToRight() {
    let slider = document.getElementById('slider_carousel');
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  if (!movies) return (<p className="text-gray">Loading...</p>)
  return (
    <div className="mx-auto w-full p-2 h-[300px] flex flex-col justify-around items-start relative group/item">
      <MdChevronLeft
        onClick={moveSlideToLeft}
        className="cursor-pointer hidden group-hover/item:block z-30 absolute top-2/4 -translate-y-[25%] text-4xl -left-5 rounded-3xl bg-gray-400 opacity-50 hover:opacity-100  text-white"
      />
      <div className="flex flex-row justify-between w-full">
        <h1 className="text-2xl my-2 row-title relative cursor-pointer">
          {title} <IoMdArrowDropright className="inline" />
        </h1>
      </div>
      <div
        id={`slider_carousel`}
        className="w-full h-full scrollbar-hide overflow-y-hidden whitespace-nowrap scroll-smooth"
      >
        {movies?.length !== 0 &&
          movies?.map((movie) => {
            return (
              <Link to={`/movies/${movie.tmdb_id}`} key={movie.tmdb_id}>
                <div
                  className={`h-full w-[350px] inline-block mr-8 cursor-pointer group relative text-white`}
                >
                  <img
                    className={`fade-in w-full object-cover rounded-md group-hover:shadow-lg group-hover:shadow-[#000B58]/70`}
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.original_title}
                  />
                  <p className="hidden group-hover:flex w-full absolute bottom-0 bg-gray-800 py-3 px-2 opacity-70 rounded-b-2xl -translate-y-[50%]">
                    {movie.original_title}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
      <MdChevronRight
        onClick={moveSlideToRight}
        className="cursor-pointer hidden group-hover/item:block z-30 absolute top-2/4 -translate-y-[25%] text-4xl -right-5 rounded-3xl bg-gray-400 opacity-50 hover:opacity-100 text-white"
      />
    </div>
  );
};

export default MovieCarousel;
