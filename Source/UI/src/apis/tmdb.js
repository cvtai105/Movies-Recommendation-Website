var apiKey = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

async function getMovieCast(movieTitle, page = 1) {
  try {
    // Bước 1: Tìm movie ID từ tên phim
    const searchResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${page}&query=${encodeURIComponent(movieTitle)}`
    );
    const searchData = await searchResponse.json();

    if (searchData.results.length === 0) {
      throw new Error('Không tìm thấy phim.');
    }

    const movieIds = searchData.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
    }));

    // Bước 2: Lấy cast cho từng movie ID
    const allCasts = await Promise.all(
      movieIds.map(async (movie) => {
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
        );
        const creditsData = await creditsResponse.json();

        return {
          movieTitle: movie.title,
          cast: creditsData.cast,
        };
      })
    );

    // Bước 3: Trả về danh sách cast của tất cả các phim
    return allCasts;
  } catch (error) {
    console.error('Lỗi:', error.message);
    return [];
  }
}

async function getAllMoviesByActor(apiKey, actorName, page = 1) {
  try {
    // Bước 1: Tìm tất cả actor ID từ tên diễn viên
    const searchResponse = await fetch(
      `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&page=${page}&query=${encodeURIComponent(actorName)}`
    );
    const searchData = await searchResponse.json();

    if (searchData.results.length === 0) {
      throw new Error('Không tìm thấy diễn viên.');
    }

    const actorIds = searchData.results.map((actor) => ({
      id: actor.id,
      name: actor.name,
    }));

    // Bước 2: Lấy danh sách phim cho tất cả actor ID
    const allMovies = await Promise.all(
      actorIds.map(async (actor) => {
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/person/${actor.id}/movie_credits?api_key=${apiKey}`
        );
        const creditsData = await creditsResponse.json();

        return {
          actorName: actor.name,
          movies: creditsData.cast,
        };
      })
    );

    // Bước 3: Trả về danh sách phim của tất cả diễn viên
    return allMovies;
  } catch (error) {
    console.error('Lỗi:', error.message);
    return [];
  }
}

async function getMoviesByGenre(genreName, page = 1) {
  try {
    // Bước 1: Lấy danh sách thể loại (genre)
    const genreResponse = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    const genreData = await genreResponse.json();

    // Tìm genre ID dựa vào tên thể loại
    const genre = genreData.genres.find(
      (g) => g.name.toLowerCase() === genreName.toLowerCase()
    );

    if (!genre) {
      throw new Error('Không tìm thấy thể loại.');
    }

    const genreId = genre.id;

    // Bước 2: Tìm phim theo genre ID
    const moviesResponse = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&with_genres=${genreId}`
    );
    const moviesData = await moviesResponse.json();

    // Bước 3: Trả về danh sách phim
    return moviesData.results;
  } catch (error) {
    console.error('Lỗi:', error.message);
    return [];
  }
}

function getFunc(field, nav) {
  if (nav === 'actors') {
    return getMovieCast;
  } else if (field === 'genre') {
    return getMoviesByGenre;
  } else if (field === 'actor') {
    return getAllMoviesByActor;
  } else {
    return null;
  }
}

export { getFunc };
