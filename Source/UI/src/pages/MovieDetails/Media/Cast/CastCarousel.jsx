import { IoMdArrowDropright } from 'react-icons/io';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { TMDB_STATIC_FILE_PATH } from '../../../../const/linkToResource';

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
            <div
              className={`h-full w-[140px] w-min-[140px] inline-block mr-4 group relative`}
            >
              <div className="image-wrapper">
                <img
                  className="w-full h-full object-cover rounded-xl group-hover:shadow-lg"
                  src={`${TMDB_STATIC_FILE_PATH}/${c.profile_path}`}
                  alt="cast avatar"
                />
              </div>
              <p className="font-bold">{c.name}</p>
              <p className="text-gray-500">
                {c.character.substring(0, c.character.indexOf('/'))}
              </p>
            </div>
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
