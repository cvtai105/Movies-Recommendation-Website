import React from 'react';
import { TMDB_STATIC_FILE_PATH } from '../../../../const/linkToResource';

const Cast = ({ castList }) => {
  return (
    <div>
      <h2 className="font-bold text-left p-2 ml-2">Series Cast</h2>
      <div id="cast_scroller">
        <ul className="p-2">
          {castList?.length > 0 &&
            castList?.map((c) => (
              <li className="m-2 border-gray-600 shadow-md pb-2 rounded-md overflow-hidden min-w-[140px] w-[140px] bg-white">
                <div className="image-wrapper ">
                  <img
                    className="w-full h-full"
                    src={`${TMDB_STATIC_FILE_PATH}/${c.profile_path}`}
                    alt="cast avatar"
                  />
                </div>
                <p className="font-bold">{c.name}</p>
                <p className="text-gray-500">
                  {c.character.substring(0, c.character.indexOf('/'))}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Cast;
