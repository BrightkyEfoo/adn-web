import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProgramCard from './ProgramCard';
import './style.css';

const ProgramsSection = ({ Data }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get('https://adn-backend-mj63t.ondigitalocean.app/programs/?limit=3')
      .then(res => {
        console.log('res', res.data.programs);
        setData(res.data.programs);
        console.log(data);
      })
      .catch(err => console.log('err', err));
    // console.log('Data', Data)
  }, []);

  return Array.isArray(data) ? (
    <div className="program-section">
      <div className='program-section-container'>
        <p>{Data.title}</p>
        <div className="programs-container">
          {data.map((el, i) => {
            return <ProgramCard Data={el} key={i} index={i} />;
          })}
        </div>
      </div>
    </div>
  ) : (
    null
  );
};

export default ProgramsSection;
