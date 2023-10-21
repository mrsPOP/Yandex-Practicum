import { FILTER_FILM_NAME, FILTER_IS_SHORTS, MAX_SHORT_FILM_DURATION } from './globalVariables';

const isSubstring = (subString, string) => {
  subString = subString.toLowerCase();
  string = string.toLowerCase();
  return string.includes(subString);
};

const filterMovie = (filter, movie, pathname) => {
  const { filmName, isShorts } = filter;
  if (pathname === '/movies') {
    localStorage.setItem(FILTER_FILM_NAME, filmName);
    localStorage.setItem(FILTER_IS_SHORTS, String(isShorts));
  }
  const { nameRU, nameEN, duration } = movie;

  if (pathname === '/saved-movies' && !Object.hasOwn(movie, '_id')) {
    return false;
  }

  // по длине: короткие - до 40 мин включительно
  if (isShorts && duration > MAX_SHORT_FILM_DURATION) {
    return false;
  }
  // console.log(movie)

  if (!filmName) return true;

  // по названию
  return [nameRU, nameEN].some((name) => isSubstring(filmName, name));
};

export default filterMovie;
