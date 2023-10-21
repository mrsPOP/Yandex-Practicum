import logo from "../images/лого.svg";
import { Link, useLocation } from "react-router-dom";

const Header = ({ handleLogOut, email, isJwtTokenChecked }) => {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <div className="header__container">
        <img className="logo" src={logo} alt="Логотип" />
        <ul className="header__elements">
          {pathname === "/" && isJwtTokenChecked && (
            <>
              <li>
                <p className="header__your-email">{email}</p>
              </li>
              <li>
                <button
                  className="header__button-log-out"
                  onClick={handleLogOut}
                >
                  Выйти
                </button>
              </li>
            </>
          )}
          {pathname === "/sign-in" && (
            <li>
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            </li>
          )}
          {pathname === "/sign-up" && (
            <li>
              <Link to="/sign-in" className="header__link">
                Вход
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
