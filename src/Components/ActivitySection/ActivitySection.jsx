import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ActivityCard from '../ActivityCard/ActivityCard';
import './style.css';

const ActivitySection = ({ Data }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    
      axios.get('http://localhost:9001/activity?order=DESC&number=6')
      .then(res => {
        // console.log(res.data.activities);
        setData(res.data.activities);
      });
  }, []);

  return data ? (
    <div className="activity-section">
      <div>
        <p className="activity-section-head">{Data.title}</p>
        <div className="activities-container">
          {data.map((el, i) => {
            // console.log('el', el);
            return <ActivityCard key={i} activity={el} />;
          })}
        </div>
      </div>
    </div>
  ) : (
    null
  );
};

export default ActivitySection;
