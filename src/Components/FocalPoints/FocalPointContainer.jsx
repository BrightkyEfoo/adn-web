import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FocalPointCard from './FocalPointCard';
import './style.css';

const FocalPointContainer = ({ title }) => {
  const [focalPoints, setFocalPoints] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:9001/focalpoints').then(({ data }) => {
      console.log('data', data);
      setFocalPoints(data.focalPoints);
    });
  }, []);

  return focalPoints ? (
    <div className="focal-points">
      <p className="focal-points-title">{title}</p>
      <div className="focal-points-container">
        {focalPoints.map((focalPoint, i) => {
          return (
            <FocalPointCard
              key={i}
              image={focalPoint.image}
              name={focalPoint.firstName + ' ' + focalPoint.lastName}
              country={focalPoint.country}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default FocalPointContainer;
