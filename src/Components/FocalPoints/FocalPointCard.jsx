import React from 'react';
import './style.css'

const FocalPointCard = ({ image, name, country }) => {
  return (
    <div className='focal-point-card'>
      <img src={image} alt="" className='focal-point-image'/>
      <p className='focal-point-name'>{name}</p>
      <p className='focal-point-country'>{country}</p>
    </div>
  );
};

export default FocalPointCard;
