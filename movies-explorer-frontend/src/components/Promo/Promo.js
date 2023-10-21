import './Promo.css';
import { Link } from 'react-router-dom';
import planet from '../../images/planet.svg';

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__progect-info-wrapper">
        <h1 className='promo__project-title'>Учебный&nbsp;проект студента факультета Веб&#8209;разработки.</h1>
        <p className='promo__more-info'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <Link className='promo__get-more-info' target="_blank" to='https://github.com/mrsPOP/movies-explorer-frontend/blob/main/README.md'>Узнать больше</Link>
        <img src={planet} alt="Изображение планеты" className='promo__image'/>
      </div>
    </section>
  )
};

export default Promo
