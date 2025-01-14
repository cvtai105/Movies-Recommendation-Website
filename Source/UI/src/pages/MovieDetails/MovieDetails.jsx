import { useEffect, useState } from 'react';
import { redirect, useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../../apis/movie';
import MovieInfo from './MovieInfo';
import Media from './Media';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState();
  const navigate = useNavigate();

  console.log('movie details data', movieData);
  useEffect(() => {
    if (!id) {
      return <h1>The movie id is undefine.</h1>;
    }

    const fetchMovie = async () => {
      const movieResponse = await getMovieDetails(id);
      if (movieResponse.status == 500) {
        navigate('/not-found');
      } else {
        setMovieData(movieResponse);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [id]);

  return (
    <div className="m-0">
      <MovieInfo info={movieData} />
      <Media movie={movieData} />
    </div>
  );
};

export default MovieDetails;
