import React from 'react';
import Cast from './Cast';
import Review from './Review';
import CastCarousel from './Cast/CastCarousel';
import Recomendation from './Recomendation';
import { TMDB_STATIC_FILE_PATH } from '../../../const/linkToResource';

const Media = ({ movie }) => {
  return (
    <div className="m-2 flex gap-0">
      <div className="w-2/3">
        <div className="flex flex-col items-start border shadow-md m-4 p-2">
          <h1 className="font-bold">Series Cast</h1>
          <CastCarousel castList={movie?.credits?.cast} />
        </div>
        <div className="flex-col flex items-center m-4">
          <Review reviews={movie?.reviews} />
          <Recomendation overview={movie?.overview}/>
        </div>
      </div>

      <div className="min-w-[400px] w-1/3 flex flex-col gap-8 items-start m-2 p-2 relative">
        <div className="company">
          <p className="font-bold text-left">Production companies</p>
          {movie?.production_companies?.length > 0 &&
            movie?.production_companies.map((c) => (
              <div className="w-full m-2 p-2" key={c.name}>
                <p className="text-gray-500 font-mono text-left my-2 py-2">{c.name}</p>
                <img
                  src={c.logoPath? `${TMDB_STATIC_FILE_PATH}/${c.logoPath}` : "https://pic.onlinewebfonts.com/thumbnails/icons_98811.svg"}
                  alt={c.name}
                  className="w-[300px] w-min-[300px] h-full my-2"
                />
                
              </div>
            ))}
        </div>
        <div>
          <p className="text-gray-800">
            <span className="font-bold">Status:</span> {movie?.status}
          </p>
        </div>
        <div>
          <span className="font-bold">Original language:</span>{' '}
          {movie?.original_language}
        </div>
      </div>
    </div>
  );
};

export default Media;
