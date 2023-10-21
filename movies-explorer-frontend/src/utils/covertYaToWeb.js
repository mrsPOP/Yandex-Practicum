 import { YANDEX_FILMS_BD } from './globalVariables';
 
 const covertYaToWeb = (yaMovie) => {
  const {
    country,
    director,
    year,
    description,
    id,
    nameRU,
    nameEN,
    duration,
    trailerLink,
  } = yaMovie

  const image =  YANDEX_FILMS_BD + ( yaMovie.image.url)
  const thumbnail =  YANDEX_FILMS_BD + ( yaMovie.image.formats.thumbnail.url)

  return {
    country,
    director,
    year,
    description,
    movieId: id,
    nameRU,
    nameEN,
    duration,
    trailerLink,
    image,
    thumbnail
  }
}

export default covertYaToWeb
