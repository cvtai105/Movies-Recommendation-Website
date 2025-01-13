import React from 'react';
import Cast from './Cast';
import Review from './Review';
import CastCarousel from './Cast/CastCarousel'
import Recomendation from './Recomendation';

const Media = ({ movie }) => {
  return (
    <div className="m-2 flex gap-0">
      <div className="w-2/3">
        <div className="flex flex-col items-start border shadow-md m-4 p-2">
          <h1 className="font-bold">Series Cast</h1>
          <CastCarousel castList={movie?.credits?.cast} />
        </div>
        <div className="flex-col flex items-center m-4">
          <Review reviews={movie?.reviews}/>
          <Recomendation />
        </div>
      </div>

      <div className="min-w-[400px] w-1/3 flex flex-col gap-8 items-start m-2 p-2 relative">
        <div>Homepage</div>
        <div>Status {movie?.status}</div>
        <div>Original language: {movie?.original_language}</div>
      </div>
    </div>
  );
};

export default Media;
