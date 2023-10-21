import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer__text-line">
        <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      </div>
      <div className='footer__info-container'>
        <p className='footer__year'>&copy; 2020</p>
        <div className='footer__link-container'>
          <Link to='https://practicum.yandex.ru/' target="_blank" className='footer__platform'>Яндекс.Практикум</Link>
          <Link to='https://github.com/mrsPOP/' target="_blank" className='footer__github'>Github</Link>
        </div>
      </div>
    </footer>
  )
};

export default Footer
