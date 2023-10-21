import './Header.css';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useBurgerStore } from '../../hooks/useStore';
import AccountButton from '../AccountButton/AccountButton';
import { UserInfoStoreContext } from '../../UserInfoStoreContext';
import { useContext } from 'react';

const Header = () => {
  const { currentUser } = useContext(UserInfoStoreContext);
  const isAuthorized = currentUser.isLoggedIn;

  const headerStyle = classNames(
    'header',
    { header_authorized: isAuthorized },
    { header_unauthorized: !isAuthorized }
  );
  const openBurgerMenu = useBurgerStore((state) => state.setBurgerActive);

  const activeLink = ({ isActive }) =>
    isActive ? 'header__film header__film_active' : 'header__film';

  return (
    <header className={headerStyle}>
      <Link to="/" title="Логотип" className="header__logo" />
      {isAuthorized && (
        <div className="header__authorized">
          <NavLink to="/movies" className={activeLink}>
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className={activeLink}>
            Сохранённые фильмы
          </NavLink>
          <AccountButton />
          <button
            className="header__show-menu"
            aria-label="открыть меню"
            onClick={openBurgerMenu}
          ></button>
        </div>
      )}
      {!isAuthorized && (
        <div className="header__not-authorized">
          <Link to="/signup" className="header__registrate">
            Регистрация
          </Link>
          <Link to="/signin" className="header__sign-in">
            Войти
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
