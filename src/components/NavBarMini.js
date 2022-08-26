import axios from 'axios';
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../contexts/CurrentUserContext';
import ToggleCollapse from '../hooks/ToggleCollapse';
import navStyles from '../styles/NavBar.module.css';
import styles from '../styles/NavBarMini.module.css';
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
        className={navStyles.NavLink}
        activeClassName={navStyles.Active}
        aria-label="fourite posts"
        rel="noreferrer"
      >
        <i className="fa-regular fa-bookmark" /> Favourites
      </NavLink>

      <NavLink
        to="/articles/create"
        className={navStyles.NavLink}
        activeClassName={styles.Active}
        aria-label="submit article"
        rel="noreferrer"
      >
        <i className="fa-solid fa-file-pen" /> Add Article
      </NavLink>

      <NavLink
        to="/events/create"
        className={navStyles.NavLink}
        activeClassName={styles.Active}
        aria-label="submit event"
        rel="noreferrer"
      >
        <i className="fa-regular fa-calendar-plus" /> Add Event
      </NavLink>

      <NavLink
        to="/posts/create"
        className={navStyles.NavLink}
        activeClassName={navStyles.Active}
        aria-label="submit post"
        rel="noreferrer"
      >
        <i className="fa-solid fa-circle-plus" /> Post
      </NavLink>

      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={`${navStyles.NavLink} ${navStyles.ProfileAvatar}`}
        aria-label="user profile"
        rel="noreferrer"
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={35} />
      </NavLink>

      <NavLink
        to="/"
        className={navStyles.NavLink}
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
        className={navStyles.NavLink}
        activeClassName={navStyles.Active}
        aria-label="login"
        rel="noreferrer"
      >
        <i className="fa-solid fa-right-to-bracket" /> Login
      </NavLink>

      <NavLink
        to="/signup"
        className={navStyles.NavLink}
        activeClassName={navStyles.Active}
        aria-label="signup page"
        rel="noreferrer"
      >
        <i className="fa-solid fa-user-pen" /> Sign up
      </NavLink>
    </>
  );

  return (
    <div className={styles.Container}>
      <Navbar bg="white" expand="lg" expanded={expanded}>
        <Container className={styles.Navbar}>
          <Link to="/" className={styles.Header}>
            <Navbar.Brand className={styles.Test}>
              <h1>The Red Crayon</h1>
            </Navbar.Brand>
          </Link>
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
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
                aria-label="home page"
                rel="noreferrer"
              >
                <i className="fa-solid fa-file-lines" /> News
              </NavLink>

              <NavLink
                to="/events"
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
                aria-label="events"
                rel="noreferrer"
              >
                <i className="fa-solid fa-calendar-days" /> Events
              </NavLink>

              <NavLink
                to="/posts"
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
                aria-label="user posts"
                rel="noreferrer"
              >
                <i className="fa-solid fa-hashtag" /> Explore
              </NavLink>

              {currentUser ? loggedInIcons : loggedOutIcons}

              <NavLink
                to="/about"
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
                aria-label="about page"
                rel="noreferrer"
              >
                <i className="fa-solid fa-book-open" /> About
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
