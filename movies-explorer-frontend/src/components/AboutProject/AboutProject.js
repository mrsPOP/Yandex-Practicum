import "./AboutProject.css";
import SectionTitle from "../SectionTitle/SectionTitle";

const AboutProject = () => {
  return (
    <section className="about-project">
      <SectionTitle title={'О проекте'}/>
      <div className="about-project__wrapper">
        <h3 className="about-project__topic">
          Дипломный проект включал 5 этапов
        </h3>
        <h3 className="about-project__topic">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="about-project__text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p className="about-project__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about-project__periods">
        <h4 className="about-project__period">1 неделя</h4>
        <h4 className="about-project__period">4 недели</h4>
        <p className="about-project__work">Back-end</p>
        <p className="about-project__work">Front-end</p>
      </div>
    </section>
  );
};

export default AboutProject;
