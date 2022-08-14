import axios from 'axios';
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };
    
    const loggedInIcons = (
        <>
        <NavLink
            to="/"
            className={styles.NavLink}
            activeClassName={styles.Active}
            onClick={handleSignOut}
        ><i className="fa-solid fa-right-from-bracket"></i> Log out</NavLink>
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
            <Navbar bg="light" expand="md">
                {/* <Navbar.Brand>THE RED CRAYON</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto flex-column text-left">
                        <NavLink
                            exact
                            to="/"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        ><i className="fa-solid fa-file-lines"></i> News</NavLink>

                        <NavLink
                            to="/explore"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        ><i className="fa-solid fa-hashtag"></i> Explore</NavLink>

                        <NavLink
                            to="/favourites"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        ><i className="fa-regular fa-bookmark"></i> Favourites</NavLink>

                        { currentUser ? loggedInIcons : loggedOutIcons }

                        

                        <NavLink
                            to="/posts/create"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        ><i className="fa-solid fa-circle-plus"></i> Submit</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    </div>
  )
}

export default NavBar;