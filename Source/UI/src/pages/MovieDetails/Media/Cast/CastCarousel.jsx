import { IoMdArrowDropright } from 'react-icons/io';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { TMDB_STATIC_FILE_PATH } from '../../../../const/linkToResource';
import { Link } from 'react-router-dom';

const CastCarousel = ({ castList }) => {
  function moveSlideToLeft() {
    let slider = document.getElementById('slider_castlist');
    slider.scrollLeft = slider.scrollLeft - 500;
  }

  function moveSlideToRight() {
    let slider = document.getElementById('slider_castlist');
    slider.scrollLeft = slider.scrollLeft + 500;
  }
  return (
    <div className="mx-auto w-[100%] h-[300px] flex flex-col gap-y-4 m-2 justify-around items-start relative group/item">
      <MdChevronLeft
        onClick={moveSlideToLeft}
        className="cursor-pointer hidden group-hover/item:block z-30 absolute top-2/4 -translate-y-[25%] text-4xl -left-5 rounded-3xl bg-gray-500 opacity-50 hover:opacity-100  text-white"
      />
      <div
        id={`slider_castlist`}
        className="w-full h-full scrollbar-hide overflow-y-hidden whitespace-nowrap scroll-smooth"
      >
        {castList?.length > 0 &&
          castList?.map((c) => (
            <Link to={`/cast/${c.id}`}>
              <div
                className={`h-full w-[140px] w-min-[140px] inline-block mr-4 relative`}
              >
                <div>
                  <img
                    className="w-full h-full object-cover rounded-xl group-hover:shadow-lg"
                    src={c.profile_path? `${TMDB_STATIC_FILE_PATH}/${c.profile_path}` : "https://pic.onlinewebfonts.com/thumbnails/icons_98811.svg"}
                    alt="cast avatar"
                  />
                </div>
                <div className="bg-opacity-50 name-wrapper text-center absolute w-full">
                  <p className="font-bold text-sm">{c.name}</p>
                  <p className="text-wrap text-gray-500 text-sm break-words">
                    {c.character.split(" / ")[0]}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <MdChevronRight
        onClick={moveSlideToRight}
        className="cursor-pointer hidden group-hover/item:block z-30 absolute top-2/4 -translate-y-[25%] text-4xl -right-5 rounded-3xl bg-gray-500 opacity-50 hover:opacity-100 text-white"
      />
    </div>
  );
};

export default CastCarousel;
