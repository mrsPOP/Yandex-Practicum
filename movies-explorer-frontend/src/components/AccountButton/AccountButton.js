import "./AccountButton.css";
import { Link } from "react-router-dom";
import personIcon from "../../images/human_icon.svg";
import {useBurgerStore} from '../../hooks/useStore';

const AccountButton = () => {
  const closeMenu = useBurgerStore(state => state.setBurgerInactive)
  return (
    <Link to="/profile" className="account-button">
      <img
        src={personIcon}
        alt="иконка аккаунта"
        className="account-button__icon"
        onClick={closeMenu}
      />
      <p className="account-button__text">Аккаунт</p>
    </Link>
  );
};

export default AccountButton;
