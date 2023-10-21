import './NotFound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="not-found">
      <p className="not-found__error-number">404</p>
      <p className="not-found__error-text">Страница не найдена</p>
      <button className="not-found__button" onClick={() => navigate(-1, {replace: true})}>Назад</button>
    </section>
  )
};

export default NotFound
