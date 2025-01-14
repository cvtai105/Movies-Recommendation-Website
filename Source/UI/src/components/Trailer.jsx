import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import { IoMdArrowDropright } from 'react-icons/io';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import TrailerItem from './TrailerItem';

const Trailer = (props) => {
  const request = props.request;
  const title = props.title;
  const [trailers, setTrailers] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    // Lấy danh sách film yêu thích của user rồi nạp vào chương trình
    async function updateSavedMovies() {}
    updateSavedMovies();

    async function fetchData() {
      try {
        const response = await axios.get(
          request.url + '?page=1&size=10',
          request.config
        );
        const trailers = response.data.data.trailers;
        setTrailers(trailers);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  function moveSlideToLeft() {
    const id = props.rowID;
    let slider = document.getElementById(`slider_${id}`);
    slider.scrollLeft = slider.scrollLeft - 500;
  }

  function moveSlideToRight() {
    const id = props.rowID;
    let slider = document.getElementById(`slider_${id}`);
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  function getSrcYoutube(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const ID = match && match[2].length === 11 ? match[2] : null;
    return 'https://www.youtube.com/embed/' + ID;
  }

  return (
    <div className="mx-auto w-[90%] h-[500px] flex flex-col gap-y-2 justify-around items-start relative group/item my-2">
      <MdChevronLeft
        onClick={moveSlideToLeft}
        className="cursor-pointer hidden group-hover/item:block z-30 absolute top-2/4 translate-y-[100%] text-4xl -left-5 rounded-3xl bg-black opacity-50 hover:opacity-100  text-white"
      />
      <div className="flex flex-row justify-between w-full">
        <h1 className="text-2xl row-title py-2 px-3 relative cursor-pointer">
          {title} <IoMdArrowDropright className="inline" />
        </h1>
      </div>
      <div className="scrollbar-hidden trailers w-full overflow-x-scroll overflow-y-hidden whitespace-nowrap scrollbar-hide rounded-xl flex flex-row gap-x-6 bg-black py-2 px-2">
        {trailers.map((element) => {
          return (
            <TrailerItem
              key={Math.random()}
              src={getSrcYoutube(
                `https://www.youtube.com/watch?v=${element?.key}`
              )}
            />
          );
        })}
      </div>
      <MdChevronRight
        onClick={moveSlideToRight}
        className="cursor-pointer hidden group-hover/item:block z-30 absolute top-2/4 translate-y-[100%] text-4xl -right-5 rounded-3xl bg-black opacity-50 hover:opacity-100 text-white"
      />
    </div>
  );
};

export default Trailer;