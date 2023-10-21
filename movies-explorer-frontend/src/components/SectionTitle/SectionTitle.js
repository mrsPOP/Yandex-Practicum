import './SectionTitle.css';

const SectionTitle = ({title}) => {
  return (
    <div className="section-title">
      <h2 className="section-title__text">{title}</h2>
    </div>
  )
};

export default SectionTitle
