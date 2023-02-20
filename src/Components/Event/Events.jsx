import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Event from './Event';
import styled from 'styled-components';
import Calandar from '../Calandar/Calandar';

const Container = styled.div`
  background-color: rgba(213, 213, 213, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  padding: 15px;
  .calandar-container{
    width : 600px;
    height : 350px;
    display : flex;
    justify-content : center;
    align-items : center
  }
`;

const Events = ({ homeData }) => {
  const [data, setData] = useState({
    next: null,
    last: null,
  });
  useEffect(() => {
    axios
      .get('https://adn-api-ugp3.onrender.com/event')
      .then(res => {
        // console.log('last', res.data.events[0]);
        setData(prev => ({
          next: res.data.events[0],
          last: res.data.events.at(-1),
        }));
      })
      .catch(err => console.log('err', err));
    // console.log(homeData);
  }, []);

  return (
    <Container>
      <Event title={homeData.head1} event={data.next} />
      <Event title={homeData.head2} event={data.last} />
      <div className="calandar-container">
        <Calandar />
      </div>
    </Container>
  );
};

export default Events;
