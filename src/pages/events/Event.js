/* eslint-disable */
import React from 'react';
import { Container, Media } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { DropdownMenu } from '../../components/DropdownMenu';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Event.module.css';

/**
 * Display Event data in browser.
 */
function Event(props) {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    created_on,
    modified_on,
    title,
    content,
    date,
    time,
    city,
    country,
    price,
    event_link,
    eventPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  /**
   * Route user to Edit page for Event
   */
  const handleEdit = () => {
    history.push(`/events/${id}/edit`);
  };

  /**
   * Delete Event from API.
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/events/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Container className={styles.Container}>
      <br />
      <Link className={styles.OnHover} to={`/events/${id}`}>
        <h2 className={styles.OnHover}>
          <strong>{title}</strong>
        </h2>
      </Link>
      <p>Last updated: {modified_on}</p>
      <Media>
        <Link to={`events/${profile_id}`} className={styles.OnHover}>
          <Avatar src={profile_image} height={30} />
          <p className={styles.OnHover}>By: {owner}</p>
        </Link>

        {is_owner && eventPage && (
          <DropdownMenu handleEdit={handleEdit} handleDelete={handleDelete} />
        )}
      </Media>
      <p>{content}</p>
      <p>
        Date: {date} | Time: {time} | Admission: €{price}
      </p>
      <p>
        Location: {city}, {country}
      </p>
      <p>
        For more information, visit the event page:
        {' '}
        <a
          target="_blank"
          rel="noreferrer"
          href={event_link}
          className={styles.OnHover}
        >
          <strong>HERE</strong>
        </a>
      </p>
      <p>
        Submitted:
        {' '}
        {created_on}
      </p>
    </Container>
  );
}

export default Event;
