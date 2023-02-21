import React, { useEffect, useState } from 'react';
import Section1 from '../../Components/Section1/Section1';
import NavBar from '../../Components/NavBar/NavBar';
import axios from 'axios';
import Calandar from '../../Components/Calandar/Calandar';
import './style.css';
import Event from '../../Components/Event/Event';
import NewsLettersSection from '../../Components/NewsLettersSection/NewsLettersSection';
import Footer from '../../Components/Footer/Footer';

const EventsPage = () => {
  const [data, setData] = useState(null);
  const [events, setEvents] = useState(null);
  useEffect(() => {
    axios
      .get('https://adn-backend-mj63t.ondigitalocean.app/page/EN/eventpage')
      .then(res => {
        setData(res.data.page);
      })
      .catch(err => console.log('err', err));
    axios.get('https://adn-backend-mj63t.ondigitalocean.app/event/?limit=4').then(res => {
      setEvents(res.data.events);
    });
  }, []);

  return data ? (
    <div className="event-page-container">
      <NavBar />
      <Section1 image={data.head.image} text={data.head.title} />
      <div className="event-page-section-calandar">
        <p className="event-page-calandar-title">{data.section1.title}</p>
        <div className="event-calandar-container">
          <Calandar size='big' />
        </div>
      </div>
      {/* <div> */}
      <div className="event-page-section-events">
        <p className="event-page-section-events-title">{data.section2.title}</p>
        <div className="event-page-section-events-container">
          {events ? (
            events.map((el, i) => {
              return <Event event={el} title={data.section2.title} key={i} />;
            })
          ) : (
            <div>loading</div>
          )}
        </div>
        {/* </div> */}
      </div>
      <div>

      </div>
      <NewsLettersSection Data = {data.section4} />
      <Footer />
    </div>
  ) : (
    <div>loading</div>
  );
};

export default EventsPage;
