import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import EventDetailed from '../../Components/EventDetailed/EventDetailed';
import EventCommentForm from '../../Components/EventCommentForm/EventCommentForm';

const SingleEventPage = () => {
  const { eventId } = useParams();
  
  
  return (
    <>
      <NavBar />
      <EventDetailed eventId={eventId} />
      <EventCommentForm eventId={eventId} />
      <Footer />
    </>
  );
};

export default SingleEventPage;
