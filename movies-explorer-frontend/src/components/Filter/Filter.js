import './Filter.css';
import SearchInput from '../SearchInput/SearchInput';
import SearchInputSaved from '../SearchInputSaved/SearchInputSaved';
import Toggler from '../Toggler/Toggler';

const Filter = ({ pathname }) => {
  return (
    <section className="filter">
      {pathname === '/saved-movies' && <SearchInputSaved />}
      {pathname === '/movies' && <SearchInput />}
      <Toggler />
    </section>
  );
};

export default Filter;
