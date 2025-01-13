import { useEffect, useState } from 'react';
import MovieCarousel from '../../MovieCarousel';
import { useParams } from 'react-router-dom';
import { getRecommendationOnGenre } from '../../../../apis/movie';

const Recomendation = () => {
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

    fetchOnGenre();
  }, [id]);

  return (
    <div className="border shadow-md w-full my-2">
      <MovieCarousel
        movies={recomendOnGenres}
        title={'Explore Similar Genre'}
      />
      {/* <MovieCarousel movies={recomendOnVectorSearch} title={"May Be You Should Watch"}/> */}
    </div>
  );
};

export default Recomendation;
