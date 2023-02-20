import React from 'react';
import './teamMate.css'

const TeamMate = ({Data}) => {
  return (
    <div className='team-mate-container'>
      <div className="team-mate-top">
        <img className='team-mate-top-image' src ={Data.image} alt={Data.image}/>
        <p className='team-mate-top-displayname'>{Data.displayName}</p>
        <p className='team-mate-top-grade'>{Data.grade}</p>
      </div>
        <p className='team-mate-top-desc'>{Data.desc.length > 250 ? Data.desc.slice(0 , 250)+'...' : Data.desc.slice}</p>
    </div>
  );
};

export default TeamMate;
