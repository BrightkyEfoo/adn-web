import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border : 1px solid var(--primary-green);
  justify-content: center;
`;
const Top = styled.div`
  background-image: Url('${props => props.image}');
  flex-grow: 1;
  width: 100%;
  background-size: cover;
  /* color:white; */
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 15px 35px;
  font-size: 1.1em;
  font-weight: 700;
  /* padding: 25px; */
`;

const Bottom = styled.p`
  font-size: 0.7rem;
  padding : 10px 15px;
  text-align : justify
`;
const ActivityCard = ({ activity }) => {
  return (
    <Container>
      <Top image={activity.image}>{activity.title}</Top>
      <Bottom>{activity.main}</Bottom>
    </Container>
  );
};

export default ActivityCard;
