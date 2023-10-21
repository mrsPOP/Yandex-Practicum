import { create } from 'zustand';
import api from '../../src/utils/MainApi';
import movieApi from '../../src/utils/MoviesApi';
import Message from '../components/Message/Message';
import Preloader from '../components/Preloader/Preloader';
import {
  FILTER_FILM_NAME,
  FILTER_IS_SHORTS,
  MOVIES_LOCAL_KEY,
} from '../utils/globalVariables';

export const useBurgerStore = create((set) => ({
  burgerActive: false,
  setBurgerActive: () => set({ burgerActive: true }),
  setBurgerInactive: () => set({ burgerActive: false }),
  reset: () => {
    set({
      burgerActive: false,
    });
  },
}));

export const useNotificationStore = create((set) => ({
  notificationObject: {
    isVisible: false,
    text: '',
    isError: false,
  },
  setVisible: ({ text, error = false }) =>
    set({
      notificationObject: {
        isVisible: true,
        text: text,
        isError: error,
      },
    }),
  setInvisible: () =>
    set({
      notificationObject: {
        isVisible: false,
        text: '',
        isError: false,
      },
    }),
  reset: () => {
    set({
      notificationObject: {
        isVisible: false,
        text: '',
        isError: false,
      },
    });
  },
}));

export const useFilmsStore = create((set) => ({
  films: JSON.parse(localStorage.getItem(MOVIES_LOCAL_KEY)),
  filmsIsUpdated: false,
  element: <Message>Здесь пока ничего нет</Message>,
  showPreloader: () => {
    set((prev) => ({ ...prev, element: <Preloader /> }));
  },
  setMovies: async () => {
    try {
      const ya = await movieApi.getMovies();
      set((prev) => ({ ...prev, films: ya }));
    } catch (e) {
      set((prev) => ({
        ...prev,
        films: null,
        element: <Message>Ошибка получения данных</Message>,
      }));
    } finally {
      set((prev) => ({ ...prev, filmsIsUpdated: true }));
    }
  },
  setLikeFilm: async (webFilm) => {
    try {
      const { movieId, _id } = await api.saveMovie(webFilm);
      set((prev) => {
        const { films: prevFilms } = prev;
        const likedMovie = prevFilms.find((movie) => movie.movieId === movieId);
        likedMovie['_id'] = _id;
        return { ...prev, films: [...prevFilms] };
      });
    } catch (error) {
      console.error('Ошибка лайка карточки', error);
    }
  },
  deleteLikeFilm: async (webFilm) => {
    try {
      const { _id } = webFilm;
      const { movieId } = await api.deleteMovie(_id);
      set((prev) => {
        const { films: prevFilms } = prev;
        const dislikedMovie = prevFilms.find(
          (movie) => movie.movieId === movieId
        );
        delete dislikedMovie._id;
        return { ...prev, films: [...prevFilms] };
      });
    } catch (error) {
      console.log('Ошибка дизлайка карточки', error);
    }
  },
  reset: () => {
    set({
      films: JSON.parse(localStorage.getItem(MOVIES_LOCAL_KEY)),
      filmsIsUpdated: false,
      element: <Message>Здесь пока ничего нет</Message>,
    });
  },
}));

export const useFilterStore = create((set) => ({
  filterMovies: {
    filmName: localStorage.getItem(FILTER_FILM_NAME) || '',
    isShorts: localStorage.getItem(FILTER_IS_SHORTS) === 'true' ?? false,
  },
  toggleShorts: () =>
    set((state) => ({
      filterMovies: {
        ...state.filterMovies,
        isShorts: !state.filterMovies.isShorts,
      },
    })),
  setFilterName: (newName) =>
    set((state) => ({
      filterMovies: { ...state.filterMovies, filmName: newName },
    })),
  reset: () => {
    set({
      filterMovies: {
        filmName: localStorage.getItem(FILTER_FILM_NAME) || '',
        isShorts: localStorage.getItem(FILTER_IS_SHORTS) === 'true' ?? false,
      },
    });
  },
}));

export const useFilterSavedStore = create((set) => ({
  filterMovies: {
    filmName: '',
    isShorts: false,
  },
  toggleShorts: () =>
    set((state) => ({
      filterMovies: {
        ...state.filterMovies,
        isShorts: !state.filterMovies.isShorts,
      },
    })),
  setFilterName: (newName) =>
    set((state) => ({
      filterMovies: { ...state.filterMovies, filmName: newName },
    })),
  reset: () => {
    set({
      filterMovies: {
        filmName: '',
        isShorts: false,
      },
    });
  },
}));
