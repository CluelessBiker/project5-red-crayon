import axios from 'axios';
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import ToggleCollapse from '../hooks/ToggleCollapse';
import styles from '../styles/NavBar.module.css';
import { removeTokenTimestamp } from '../utils/utils';
import Avatar from "./Avatar";

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
            await axios.post("dj-rest-auth/logout/");
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
            ><i className="fa-regular fa-bookmark"></i> Favourites</NavLink>

            <NavLink
                to="/posts/create"
                className={styles.NavLink}
                activeClassName={styles.Active}
            ><i className="fa-solid fa-circle-plus"></i> Submit</NavLink>

            <NavLink
                to={`/profiles/${currentUser?.profile_id}`}
                className={`${styles.NavLink} ${styles.ProfileAvatar}`}
            ><Avatar src={currentUser?.profile_image} text="Profile" height={35} /></NavLink>

            <NavLink
                to="/"
                className={styles.NavLink}
                onClick={handleSignOut}
            ><i className="fa-solid fa-right-from-bracket"></i> Logout</NavLink>
        </>
    );

    const loggedOutIcons = (
        <>
            <NavLink
                to="/login"
                className={styles.NavLink}
                activeClassName={styles.Active}
            ><i className="fa-solid fa-right-to-bracket"></i> Login</NavLink>

            <NavLink
                to="/signup"
                className={styles.NavLink}
                activeClassName={styles.Active}
            ><i className="fa-solid fa-user-pen"></i> Sign up</NavLink>
        </>
    );

  return (
    <div>
        <Container>
            <Navbar
                bg="light"
                expand="md"
                expanded={expanded}
            >
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
                        ><i className="fa-solid fa-file-lines"></i> News</NavLink>

                        <NavLink
                            to="/posts"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        ><i className="fa-solid fa-hashtag"></i> Explore</NavLink>

                        { currentUser ? loggedInIcons : loggedOutIcons }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    </div>
  )
}

export default NavBar;