import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css';

const EventCommentForm = ({ eventId }) => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(null);
  const [begin, setBegin] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  useEffect(() => {
    axios
      .get('http://localhost:9001/event/' + eventId)
      .then(res => {
        setData(res.data.event);
        setBegin(new Date(res.data.event.begin));
        setEnd(new Date(res.data.event.end));
      })
      .catch(err => console.log('err', err));
    axios
      .get('http://localhost:9001/page/EN/event')
      .then(res => {
        setPage(res.data);
      })
      .catch(err => console.log('err', err));
  }, []);

  return data && page ? (
    <div className="single-event-form-container">
      <p className="single-event-form-container-head-1">
        {page.commentSection.title}
      </p>
      <p className="single-event-form-container-head-2">
        {page.commentSection.subTitle}
      </p>
      <div className="single-event-form-form">
        <textarea className='single-event-form-text-area' placeholder={page.commentSection.placeholders[0]}></textarea>
        <input type="text" placeholder={page.commentSection.placeholders[1]} />
        <input type="email" placeholder={page.commentSection.placeholders[2]} />
        <input type="text" placeholder={page.commentSection.placeholders[3]} />
      </div>
      <div className="single-event-form-to-check">
        <input type="checkbox" />
        <p>{page.commentSection.toCheck}</p>
      </div>
      <div className="single-event-form-button-container">
        <button className="single-event-form-button">
          {page.commentSection.button}
        </button>
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default EventCommentForm;
