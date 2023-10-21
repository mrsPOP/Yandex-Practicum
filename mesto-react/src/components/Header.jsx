import logo from "../images/лого.svg";

const Header = () => {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип" />
    </header>
  );
};

export default Header;
