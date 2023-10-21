import './SearchInput.css';
import { useFilmsStore, useFilterStore } from '../../hooks/useStore';
import { useState } from 'react';

export default function SearchInput() {
  const filterFilmName = useFilterStore((state) => state.filterMovies.filmName);
  const setMovies = useFilmsStore((state) => state.setMovies);
  const showPreloader = useFilmsStore((state) => state.showPreloader);
  const films = useFilmsStore((state) => state.films);
  const setFilterName = useFilterStore((state) => state.setFilterName);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState(filterFilmName);

  const handleSearch = () => {
    if (inputValue) {
      setError(false);
      setFilterName(inputValue);
      if (!films) {
        showPreloader();
        setMovies();
      }
    } else {
      setError(true);
    }
  };

  return (
    <form
      className="search-bar"
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
    >
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        type="text"
        className="search-input"
        placeholder="Фильм"
      />
      <button type="submit" className="search-button">
        Поиск
      </button>
      {error && (
        <p className="search-bar__input-error">
          {'Нужно ввести ключевое слово.'}
        </p>
      )}
    </form>
  );
}
