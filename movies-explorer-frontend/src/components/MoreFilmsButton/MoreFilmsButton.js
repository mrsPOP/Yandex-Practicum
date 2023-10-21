import './MoreFilmsButton.css';


const MoreFilmsButton = ({showMoreFilms}) => {
  return (
    <section className='more-films'>
      <button className='more-films__button' onClick={showMoreFilms}>Eщё</button>
    </section>
  )
};

export default MoreFilmsButton
