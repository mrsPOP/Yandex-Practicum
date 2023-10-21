import './FilmList.css';
import Film from '../Film/Film';
import Message from '../Message/Message';

function FilmList({ films, pathname, allFilter, hasSavedFilms }) {
  if (pathname === '/saved-movies' && !hasSavedFilms)
    return <Message>У вас нет сохранённых фильмов</Message>;
  else if (pathname === '/movies' && !allFilter.filmName)
    return <Message>Здесь пока ничего нет</Message>;
  else if (films.length === 0)
    return <Message>По вашему запросу ничего не найдено</Message>;
  else {
    return (
      <ul className="film-list">
        {films.map((film) => (
          <Film key={film.movieId} film={film} />
        ))}
      </ul>
    );
  }
}

export default FilmList;
