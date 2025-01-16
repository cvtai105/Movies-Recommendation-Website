import { useEffect, useState } from 'react';
import MovieCarousel from '../../MovieCarousel';
import { useParams } from 'react-router-dom';
import {
  getRecommendationOnGenre,
  getRecomendationOnVector,
} from '../../../../apis/movie';

const Recomendation = ({ overview }) => {
  const [recomendOnGenres, setRecomendOnGenres] = useState();
  const [recomendOnVectorSearch, setRecomendOnVectorSearch] = useState();
  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      return <h1>The movie id is undefine.</h1>;
    }
    const fetchOnGenre = async () => {
      const movieResponse = await getRecommendationOnGenre(id);
      setRecomendOnGenres(movieResponse);
    };

    const fechOnVectorSearch = async () => {
      const movieResponse = await getRecomendationOnVector(overview);
      setRecomendOnVectorSearch(movieResponse);
    };
    fechOnVectorSearch();
    fetchOnGenre();
  }, [id]);

  return (
    <div className="border shadow-md w-full p-0">
      <div>
        <MovieCarousel
          movies={recomendOnGenres}
          title={'Explore Similar Genre'}
        />
      </div>
      <div>
        <MovieCarousel
          movies={recomendOnVectorSearch}
          title={'May Be You Should Watch'}
        />
      </div>
    </div>
  );
};

export default Recomendation;
