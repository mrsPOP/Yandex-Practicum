import { useFilterSavedStore } from '../../hooks/useStore';
import { useState, useCallback } from 'react';

export default function SearchInputSaved() {
  const { filmName } = useFilterSavedStore((state) => state.filterMovies);

  const setFilterName = useFilterSavedStore((state) => state.setFilterName);
  const [inputValue, setInputValue] = useState(filmName);

  const handleSearch = useCallback(() => {
    setFilterName(inputValue);
  }, [inputValue, setFilterName]);

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
    </form>
  );
}
