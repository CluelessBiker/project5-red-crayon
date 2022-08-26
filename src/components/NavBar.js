import axios from 'axios';
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../contexts/CurrentUserContext';
import ToggleCollapse from '../hooks/ToggleCollapse';
import styles from '../styles/NavBar.module.css';
import { removeTokenTimestamp } from '../utils/utils';
import Avatar from './Avatar';

/**
 * Navigation bar.
 */
const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = ToggleCollapse();

  /**
   * Log user out from API.
   */
  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        to="/favourites"
        className={styles.NavLink}
        activeClassName={styles.Active}
        aria-label="favourite posts"
        rel="noreferrer"
      >
        <i className="fa-regular fa-bookmark" /> Favourites
      </NavLink>

      <NavLink
        to="/articles/create"
        className={styles.NavLink}
        activeClassName={styles.Active}
        aria-label="post an article"
        rel="noreferrer"
      >
        <i className="fa-solid fa-file-pen" /> Add Article
      </NavLink>

      <NavLink
        to="/events/create"
        className={styles.NavLink}
        activeClassName={styles.Active}
        aria-label="create an event"
        rel="noreferrer"
      >
        <i className="fa-regular fa-calendar-plus" /> Add Event
      </NavLink>

      <NavLink
        to="/posts/create"
        className={styles.NavLink}
        activeClassName={styles.Active}
        aria-label="create post"
        rel="noreferrer"
      >
        <i className="fa-solid fa-circle-plus" /> Post
      </NavLink>

      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={`${styles.NavLink} ${styles.ProfileAvatar}`}
        aria-label="user profile"
        rel="noreferrer"
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={35} />
      </NavLink>

      <NavLink
        to="/"
        className={styles.NavLink}
        onClick={handleSignOut}
        aria-label="signout"
        rel="noreferrer"
      >
        <i className="fa-solid fa-right-from-bracket" /> Logout
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        to="/login"
        className={styles.NavLink}
        activeClassName={styles.Active}
        aria-label="login"
        rel="noreferrer"
      >
        <i className="fa-solid fa-right-to-bracket" /> Login
      </NavLink>

      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
        aria-label="sign up"
        rel="noreferrer"
      >
        <i className="fa-solid fa-user-pen" /> Sign up
      </NavLink>
    </>
  );

  return (
    <Container>
      <Navbar expand="lg" expanded={expanded}>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          ref={ref}
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto flex-column text-left">
            <NavLink
              exact
              to="/"
              className={styles.NavLink}
              activeClassName={styles.Active}
              aria-label="home page"
              rel="noreferrer"
            >
              <i className="fa-solid fa-file-lines" /> News
            </NavLink>

            <NavLink
              to="/events"
              className={styles.NavLink}
              activeClassName={styles.Active}
              aria-label="events"
              rel="noreferrer"
            >
              <i className="fa-solid fa-calendar-days" /> Events
            </NavLink>

            <NavLink
              to="/posts"
              className={styles.NavLink}
              activeClassName={styles.Active}
              aria-label="user posts"
              rel="noreferrer"
            >
              <i className="fa-solid fa-hashtag" /> Explore
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}

            <NavLink
              to="/about"
              className={styles.NavLink}
              activeClassName={styles.Active}
              aria-label="about page"
              rel="noreferrer"
            >
              <i className="fa-solid fa-book-open" /> About
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavBar;
