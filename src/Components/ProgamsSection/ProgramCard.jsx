import { MdPeople } from 'react-icons/md';
import './programSection.css';
import { GiGraduateCap } from 'react-icons/gi';
import { FaDatabase } from 'react-icons/fa';

const ProgramCard = ({ Data, index }) => {
  // console.log('Data', Data)
  return true ? (
    <div className="program-card">
      <div className="program-card-top">
        {index === 0 ? (
          <GiGraduateCap size={150} color='rgb(38, 69, 38)' />
        ) : index === 1 ? (
          <MdPeople size={150} color='rgb(38, 69, 38)'/>
        ) : (
          <FaDatabase size={150} color='rgb(38, 69, 38)'/>
        )}

        {/* <img className='program-card-image' src={Data.image} alt={Data.image} /> */}
        <p className="program-card-title">{Data.title}</p>
      </div>
      <p className="program-card-main">{Data.main}</p>
      <button className="program-card-button" type="button">
        {Data.button}
      </button>
    </div>
  ) : (
    null
  );
};

export default ProgramCard;
