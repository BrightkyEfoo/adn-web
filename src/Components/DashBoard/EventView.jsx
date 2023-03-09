import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DashboardEvent from './DashboardEvent';
import './style.css';
import { AiFillFileAdd } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { EventEditActions } from '../../rtk/features/EventEditSlice';
const EventView = () => {
  const [events, setEvents] = useState(null);
  const eventEditState = useSelector(state => state.EventEdit);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get('http://localhost:9001/event')
      .then(res => {
        console.log('res.data', res.data);
        setEvents(res.data.events);
        setIsLoaded(true);
      })
      .catch(err => console.log('err', err));
  }, [eventEditState.toReload]);
  const handleCreateEvent = e => {
    dispatch(EventEditActions.setToReload());
    dispatch(EventEditActions.setMode('creation'));
    dispatch(EventEditActions.setIsEditFormDisplayed(true))
  };
  return isLoaded ? (
    <div className="dashboard-events-view-container">
      <div className="dashboard-events-view-sub-container">
        {events.map((event, i) => {
          return <DashboardEvent key={i} event={event} />;
        })}
      </div>
      <div>
        <button
          className="dashboard-events-view-add-button"
          type="button"
          onClick={handleCreateEvent}
        >
          <AiFillFileAdd size={25} /> Add Activities
        </button>
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default EventView;
