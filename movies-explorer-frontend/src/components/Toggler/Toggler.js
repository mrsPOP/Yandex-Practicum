import './Toggler.css';
import { useFilterStore, useFilterSavedStore } from '../../hooks/useStore';
import { useLocation } from 'react-router-dom';

const Toggler = () => {
  const { pathname } = useLocation()
  const isChecked = useFilterStore((state) => state.filterMovies.isShorts);
  const toggleShorts = useFilterStore((state) => state.toggleShorts);

  const isSavedChecked = useFilterSavedStore((state) => state.filterMovies.isShorts);
  const savedToggleShorts = useFilterSavedStore((state) => state.toggleShorts);

  // const handleToggle = () => {
  //   toggleShorts();
  // };

  return (
    <label className="toggler">
      <input
        className="toggler__input"
        type="checkbox"
        checked={(pathname === '/movies' && isChecked) || (pathname === '/saved-movies' && isSavedChecked)}
        onChange={(pathname === '/movies' && toggleShorts) || (pathname === '/saved-movies' && savedToggleShorts)}
      />
      <span className="toggler__slider"></span>
      <span className="toggler__label">Короткометражки</span>
    </label>
  );
};

export default Toggler;
