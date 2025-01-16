export async function fetchActors(query, page = 1, language = 'en-US') {
  if (!query) {
    return null;
  }
  let url = `https://api.themoviedb.org/3/search/person?query=${query}&page=${page}`;
  if (language != 'en-US') {
    queryString += `&language=${language}`;
  }

  const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log('response header: ', response);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  for (let i = 0; i < data.results.length; i++) {
    data.results[i].profile_path =
      `https://image.tmdb.org/t/p/w500${data.results[i].profile_path}`;
  }

  console.log('response body: ', data);
  return data;
}
