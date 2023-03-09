import React from 'react';
import GridLoader from 'react-spinners/GridLoader'
import './style.css'

const Loader = () => {
  return (
    <div className="loader">
      <img className='loading-logo' src='http://localhost:9001/public/homePage/FR/logo.png' alt='' />
      <GridLoader
        color="#4f4f4f"
        margin={5}
        size={15}
        speedMultiplier={1}
        width={15}
      />
      <p className='loading-title'>Africa Development Network</p>
    </div>
  );
};

export default Loader;
