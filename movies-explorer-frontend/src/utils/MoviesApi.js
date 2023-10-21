import { BASE_URL, YANDEX_FILMS_BD, TOKEN_KEY } from './globalVariables';
import covertYaToWeb from './covertYaToWeb';

class MoviesApi {
  constructor() {
    this._baseUrl = BASE_URL;
    this._yaUrl = YANDEX_FILMS_BD;
  }

  async getMovies() {
    const res1 = fetch(this._baseUrl + '/movies', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    }).then(res => res.json()).then(
      movies => {
        return new Map(movies.map((movie) => {
          return [movie.movieId, movie._id]
        }))
      }
    )

    const res2 = fetch(this._yaUrl + '/beatfilm-movies', {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(yaMovies => {
      return yaMovies.map(covertYaToWeb)
    })

    const [main, ya] = await Promise.all([res1, res2]);
    for (const movie of ya) {
      const movieId = movie.movieId
      if (main.has(movieId)) {
        movie['_id'] = main.get(movieId)
      }
    }
    return ya
  }
}

const movieApi = new MoviesApi();

export default movieApi;
