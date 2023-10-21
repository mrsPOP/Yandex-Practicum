import Filter from '../components/Filter/Filter';
import FilmList from '../components/FilmList/FilmLIst';
import {
  useFilmsStore,
  useFilterStore,
  useFilterSavedStore,
} from '../hooks/useStore';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import filterMovie from '../utils/filterMovie';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getInitialCountMovies from '../utils/getInitialCountMovies';
import getAddCountMovies from '../utils/getAddCountMovies';
import MoreFilmsButton from '../components/MoreFilmsButton/MoreFilmsButton';
import { MOVIES_LOCAL_KEY } from '../utils/globalVariables';

const AuthorizedUser = () => {
  const { pathname } = useLocation();
  const films = useFilmsStore((store) => store.films);
  const element = useFilmsStore((store) => store.element);
  const setMovies = useFilmsStore((store) => store.setMovies);
  const filmsIsUpdated = useFilmsStore((store) => store.filmsIsUpdated);

  const allFilter = useFilterStore((state) => state.filterMovies);
  const savedFilter = useFilterSavedStore((state) => state.filterMovies);

  const [countMovies, setCountMovies] = useState();
  const [filteredMovies, setFilteredMovies] = useState();

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    setCountMovies(getInitialCountMovies(innerWidth));
  }, [allFilter, innerWidth]);

  useEffect(() => {
    if (pathname === '/saved-movies' && !films) {
      setMovies();
    }
  }, [films, pathname, setMovies]);

  useEffect(() => {
    const filter =
      (pathname === '/movies' && allFilter) ||
      (pathname === '/saved-movies' && savedFilter);
    if (films && filter) {
      setFilteredMovies(
        films.filter((film) => filterMovie(filter, film, pathname))
      );
    }
  }, [films, allFilter, pathname, savedFilter]);

  useEffect(() => {
    const handleWindowResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const showMoreFilms = () => {
    setCountMovies((prev) => prev + getAddCountMovies(innerWidth));
  };

  useEffect(() => {
    if (films && !filmsIsUpdated) {
      setMovies();
    }
  }, [films, filmsIsUpdated, setMovies]);

  useEffect(() => {
    if (films) {
      localStorage.setItem(MOVIES_LOCAL_KEY, JSON.stringify(films));
    }
  }, [films]);

  return (
    <>
      <Header />
      <main className="main">
        <Filter pathname={pathname} />
        {filteredMovies
          ? FilmList({
              films:
                pathname === '/movies'
                  ? filteredMovies.slice(0, countMovies)
                  : filteredMovies,
              pathname,
              allFilter,
              hasSavedFilms: films.some(film => Object.hasOwn(film, '_id'))
            })
          : element}

        {pathname === '/movies' && allFilter.filmName &&
          filteredMovies &&
          countMovies <= filteredMovies.length && (
            <MoreFilmsButton showMoreFilms={showMoreFilms} />
          )}
      </main>
      <Footer />
    </>
  );
};

export default AuthorizedUser;
