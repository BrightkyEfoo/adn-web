import React from 'react';
import TeamMate from './TeamMate';
import './style.css';
const TeamSection = ({ Data }) => {
  return (
    <div className="team-section">
      <div className="team-section-sub">
        <p className="team-section-title">{Data.title}</p>
        <div className="team-section-container">
          {[0, 1, 2, 3].map(el => {
            return <TeamMate key={el} Data={Data.teams[el]} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
