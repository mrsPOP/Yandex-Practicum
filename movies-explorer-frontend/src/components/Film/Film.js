import './Film.css';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useFilmsStore } from '../../hooks/useStore';
import convertMinutesToHours from '../../utils/convertMinutesToHours';
import { Link } from 'react-router-dom';

function Film({ film }) {
  const { nameRU: title, image, duration, trailerLink } = film;
  const isLiked = !!film?._id;
  const setLikeFilm = useFilmsStore((store) => store.setLikeFilm);
  const deleteLikeFilm = useFilmsStore((store) => store.deleteLikeFilm);
  const { pathname } = useLocation();
  const likeStyle = classNames(
    'film-like',
    { 'film-like_active_like': isLiked && pathname === '/movies' },
    { 'film-like_active_delete': pathname === '/saved-movies' }
  );
  const handleLike = isLiked ? deleteLikeFilm : setLikeFilm;
  
  return (
    <li className="film">
      <Link to={trailerLink} className='film__movie-trailer-link' target='_blank'>
        <img
          src={image}
          alt={title}
          className="film__image"
        />
      </Link>
      <div className="film-info">
        <h2 className="film-title">{title}</h2>
        <button
          className={likeStyle}
          aria-label="лайк"
          onClick={() => {
            handleLike(film);
          }}
        />
        <div className="film-details">
          <hr className="film-line" />
          <p className="film-duration">{convertMinutesToHours(duration)}</p>
        </div>
      </div>
    </li>
  );
}

export default Film;
