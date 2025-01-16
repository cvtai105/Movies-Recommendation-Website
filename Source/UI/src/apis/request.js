const requests = {
  NowPlaying: {
    url: `${import.meta.env.VITE_MOVIE_API_URL}/movies/now-playing`,
    config: {
      accept: 'application/json',
    },
  },
  Popular: {
    url: `${import.meta.env.VITE_MOVIE_API_URL}/movies/popular`,
    config: {
      accept: 'application/json',
    },
  },
  TopRated: {
    url: `${import.meta.env.VITE_MOVIE_API_URL}/movies/top-rated`,
    config: {
      accept: 'application/json',
    },
  },
  Upcoming: {
    url: `${import.meta.env.VITE_MOVIE_API_URL}/movies/upcoming`,
    config: {
      accept: 'application/json',
    },
  },
  Trending: {
    day_url: `${import.meta.env.VITE_MOVIE_API_URL}/movies/trending`,
    week_url: `${import.meta.env.VITE_MOVIE_API_URL}/movies/trending`,
    config: {
      accept: 'application/json',
    },
  },
  Trailer: {
    url: `${import.meta.env.VITE_MOVIE_API_URL}/movies/trailers/latest`,
    config: {
      accept: 'application/json',
    },
  }
};

export default requests;