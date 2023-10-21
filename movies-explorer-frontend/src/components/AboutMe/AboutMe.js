import "./AboutMe.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import myPhoto from '../../images/my-photo.webp';
import { Link } from "react-router-dom";

const AboutMe = () => {
  return (
    <section className="about-me">
      <SectionTitle title={"Студент"} />
      <div className="about-me__wrapper">
        <h2 className="about-me__name">Виталина</h2>
        <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
        <p className="about-me__description">
          Я родилась и живу в Саратове, закончила факультет экономики СГУ. У меня
          есть муж и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
          начала кодить. С 2015 года работала в компании «СКБ Контур». После того,
          как прошла курс по веб-разработке, начала заниматься фриланс-заказами и
          ушла с постоянной работы.
        </p>
        <Link to='https://github.com/mrsPOP/' target="_blank" className="about-me__github">Github</Link>
        <img src={myPhoto} alt="Мое фото"  className="about-me__photo"/>
      </div>
    </section>
  );
};

export default AboutMe;
