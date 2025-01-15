export const fetchActors = async (searchTerm, page = 1) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/search/actor?query=${searchTerm}&page=${page}`
  );
  const data = await response.json();
  return data;
};
