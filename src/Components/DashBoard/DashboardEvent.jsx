import React from 'react';
import './DashboardEvent.css';
import Event from '../Event/Event';
import { BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { EventEditActions } from '../../rtk/features/EventEditSlice';

const DashboardEvent = ({ event }) => {
  const user = JSON.parse(localStorage.getItem('User'));
  const Token = 'Bearer ' + localStorage.getItem('token');
  console.log('event', event);
  const dispatch = useDispatch();
  const handleDelete = e => {
    axios
      .delete(
        'http://localhost:9001/event/' + event.id + '?userId=' + user.id,
        {
          headers: {
            Authorization: Token,
          },
        }
      )
      .then(res => {
        console.log('first', res.data);
        dispatch(EventEditActions.setToReload());
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  const handleEdit = e => {
    dispatch(EventEditActions.setEventToEdit(event))
    dispatch(EventEditActions.setMode('edit'))
    dispatch(EventEditActions.setIsEditFormDisplayed(true))
    
  };
  return (
    <div className="dashboard-event-container">
      <Event title={event.name} event={event} />
      <div className="dashboard-event-buttons">
        <button type="button" onClick={handleEdit}>
          <BsPencilSquare size={20} />
        </button>
        <button type="button" onClick={handleDelete}>
          <BsFillTrashFill size={20} />
        </button>
      </div>
    </div>
  );
};

export default DashboardEvent;
