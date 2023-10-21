import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';
import classNames from 'classnames';
import { useBurgerStore } from '../../hooks/useStore';
import AccountButton from '../AccountButton/AccountButton';

function BurgerMenu () {
  const closeBurgerMenu = useBurgerStore(state => state.setBurgerInactive);
  const isBurgerActive = useBurgerStore(state => state.burgerActive);

  const menuStyles = classNames('menu', {menu_active: isBurgerActive});
  const activeLink = ({isActive}) => isActive ? 'menu__item menu__item_active' : 'menu__item';

  return (
    <div className={menuStyles} onClick={closeBurgerMenu}>
      <div className="menu__content" onClick={e => e.stopPropagation()}>
        <button className='menu__close' aria-label='закрыть' onClick={closeBurgerMenu}></button>
        <div className="menu__items">
          <NavLink id="home" className={activeLink} to="/" onClick={closeBurgerMenu}>Главная</NavLink>
          <NavLink id="about" className={activeLink} to="/movies" onClick={closeBurgerMenu}>Фильмы</NavLink>
          <NavLink id="contact" className={activeLink} to="/saved-movies" onClick={closeBurgerMenu}>Сохранённые фильмы</NavLink>
        </div>
        <AccountButton/>
      </div>
    </div>
  )
}

export default BurgerMenu