import './Techs.css';
import SectionTitle from '../SectionTitle/SectionTitle';

const Techs = () => {
  return (
    <section className='techs'>
      <SectionTitle title={'Технологии'}/>
      <h2 className='techs__title'>7&#160;технологий</h2>
      <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='techs__technologies'>
        <li className="techs__technology">HTML</li>
        <li className="techs__technology">CSS</li>
        <li className="techs__technology">JS</li>
        <li className="techs__technology">React</li>
        <li className="techs__technology">Git</li>
        <li className="techs__technology">Express.js</li>
        <li className="techs__technology">mongoDB</li>
      </ul>
    </section>
  )
};

export default Techs
