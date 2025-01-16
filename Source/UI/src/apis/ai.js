const fetchNavigation = async (searchString) => {
  const url = `http://localhost:5199/api/llm/search?search=${searchString}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    return null;
  }
  const [nav, field, keyword] = data.message
    .trim()
    .toLowerCase()
    .split(';')
    .map((s) => s.trim());

  const result = { nav, field, keyword };
  return result;
};

export { fetchNavigation };
