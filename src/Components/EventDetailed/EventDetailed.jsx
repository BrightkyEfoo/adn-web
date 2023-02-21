import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import {
  MdLocationPin,
  MdOutlineFolderOpen,
  MdWatchLater,
} from 'react-icons/md';
import './style.css';
import { useNavigate } from 'react-router-dom';

const EventDetailed = ({ eventId }) => {
  const navigate = useNavigate()
  const [data, setData] = useState(null);
  const [page, setPage] = useState(null);
  const [begin, setBegin] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  useEffect(() => {
    axios
      .get('https://adn-backend-mj63t.ondigitalocean.app/event/' + eventId)
      .then(res => {
        console.log('event : ', res.data.event);
        setData(res.data.event);
        setBegin(new Date(res.data.event.begin));
        setEnd(new Date(res.data.event.end));
      })
      .catch(err => console.log('err', err));
    axios
      .get('https://adn-backend-mj63t.ondigitalocean.app/page/EN/event')
      .then(res => {
        console.log('page', res.data);
        setPage(res.data);
      })
      .catch(err => console.log('err', err));
  }, []);

  return data && page ? (
    <>
      <p className="single-event-details-top-title">
        <p>{data.name}</p>
        <p className='single-event-details-top-link'>
          <span onClick={()=>navigate('/')}>Home</span> <span>/</span> <span onClick={()=>navigate('/events')}>Event</span> <span>/</span>{' '}
          <span>{data.name}</span>
        </p>
      </p>
      <div className="single-event-details-container">
        <img
          className="single-event-details-image"
          src={data.image}
          alt="event-pic"
        />
        <div className="single-event-details-right">
          <div className="single-event-details-sub-containers">
            <div className="single-event-details-icon">
              <AiTwotoneCalendar size={20} />
            </div>
            <div>
              <p className="single-event-details-title">
                {page.detailsSection.date}
              </p>
              <p>{begin.toDateString()}</p>
              <p>{end.toDateString()}</p>
            </div>
          </div>

          {/* pour time */}
          <div className="single-event-details-sub-containers">
            <div className="single-event-details-icon">
              <MdWatchLater size={20} />
            </div>
            <div>
              <p className="single-event-details-title">
                {page.detailsSection.time}
              </p>
              <p>
                {begin.getHours() +
                  'h' +
                  begin.getMinutes() +
                  ' - ' +
                  end.getHours() +
                  'h' +
                  begin.getMinutes()}
              </p>
            </div>
          </div>

          {/* pour local time */}
          <div className="single-event-details-sub-containers">
            <div className="single-event-details-icon">
              <MdWatchLater size={20} />
            </div>
            <div>
              <p className="single-event-details-title">
                {page.detailsSection.localTime}
              </p>
              <p>
                TimeZone : {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </p>
              <p>
                Date : {begin.toLocaleDateString()} - {end.toLocaleDateString()}
              </p>
              <p>
                Hour :{' '}
                {begin.getHours() +
                  'h' +
                  begin.getMinutes() +
                  ' - ' +
                  end.getHours() +
                  'h' +
                  begin.getMinutes()}
              </p>
            </div>
          </div>

          {/* pour more info */}
          <div className="single-event-details-sub-containers">
            <div className="single-event-details-icon">
              <BsInfoCircle size={20} />
            </div>
            <div>
              <p className="single-event-details-title">
                {page.detailsSection.moreInfo}
              </p>
              <p>inscription</p>
            </div>
          </div>

          {/* pour location */}
          <div className="single-event-details-sub-containers">
            <div className="single-event-details-icon">
              <MdLocationPin size={20} />
            </div>
            <div>
              <p className="single-event-details-title">
                {page.detailsSection.location}
              </p>
              {data.location.split('$br$').map((el, i) => {
                return <p key={i}>{el}</p>;
              })}
            </div>
          </div>

          {/* pour category */}
          <div className="single-event-details-sub-containers">
            <div className="single-event-details-icon">
              <MdOutlineFolderOpen size={20} />
            </div>
            <div>
              <p className="single-event-details-title">
                {page.detailsSection.category}
              </p>
              <p>{data.category}</p>
            </div>
          </div>

          {/* pour organizer */}
          <div className="single-event-details-last-sub-containers3">
            <p className="single-event-details-title">
              {page.detailsSection.organizer}
            </p>
            <div className="single-event-details-last-sub-containers2">
              <FaHome size={20} className="single-event-details-icon" />
              <p className="">{data.organizer}</p>
            </div>
          </div>

          <button className="single-event-details-button">
            {page.detailsSection.button}
          </button>
        </div>
      </div>
    </>
  ) : (
    <div>loading</div>
  );
};

export default EventDetailed;
