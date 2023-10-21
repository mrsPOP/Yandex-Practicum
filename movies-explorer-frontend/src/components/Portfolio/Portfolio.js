import "./Portfolio.css";
import arrow from "../../images/arrow.svg";
import { Link } from "react-router-dom";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__link">
          <Link to="https://mrspop.github.io/russian-travel/" target="_blank" className="portfolio__link-container">
            <p className="portfolio__link-text" >Статичный сайт</p>
            <img src={arrow} alt="Ссылка" className="portfolio__link-label"/>
          </Link>
        </li>
        <li className="portfolio__link">
          <Link to="https://mrspop.github.io/mesto/" target="_blank" className="portfolio__link-container">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <img src={arrow} alt="Ссылка" className="portfolio__link-label"/>
          </Link>
        </li>
        <li className="portfolio__link">
          <Link to="https://mrspop.github.io/Aspirity_test-task/" target="_blank" className="portfolio__link-container">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <img src={arrow} alt="Ссылка" className="portfolio__link-label"/>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
