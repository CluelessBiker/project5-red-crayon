/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Event from './Event';

/**
 * Display content of a single Event.
 */
function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: event }] = await Promise.all([
          axiosReq.get(`/events/${id}`),
        ]);
        setEvent({ results: [event] });
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Container>
      <Event {...event.results[0]} setEvent={setEvent} eventPage />
    </Container>
  );
}

export default EventPage;
