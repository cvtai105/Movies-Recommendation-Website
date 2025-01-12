import React from 'react';
import Cast from './Cast';
import Review from './Review';
import Recomendation from './Recomendation';

const Media = ({ movie }) => {
  return (
    <div className="m-2 flex gap-0">
      <div className="w-2/3 flex flex-col items-center justify-center">
        <div className="">
          <Cast castList={movie?.credits?.cast} />
        </div>
        <div className="flex-col flex items-center m-0">
          <Review />
          <Recomendation />
        </div>
      </div>

      <div className="min-w-[400px] w-1/3 flex flex-col gap-8 items-start m-2 p-2 relative">
        <div>Homepage</div>
        <div>Status {movie.status}</div>
        <div>Original language: {movie.original_language}</div>
      </div>
    </div>
  );
};

export default Media;
