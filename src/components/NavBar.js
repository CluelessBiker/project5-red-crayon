import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
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
                        ><i class="fa-solid fa-file-lines"></i> News</NavLink>

                        <NavLink
                            to="/explore"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        ><i class="fa-solid fa-hashtag"></i> Explore</NavLink>

                        <NavLink
                            to="/favourites"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        ><i class="fa-regular fa-bookmark"></i> Favourites</NavLink>

                        <NavLink
                            to="/login"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        ><i class="fa-solid fa-right-to-bracket"></i> Login</NavLink>

                        <NavLink
                            to="/signup"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        ><i class="fa-solid fa-user-pen"></i> Sign up</NavLink>

                        <NavLink
                            to="/logout"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        ><i class="fa-solid fa-right-from-bracket"></i> Log out</NavLink>

                        <NavLink
                            to="/submit"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        ><i class="fa-solid fa-circle-plus"></i> Submit</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    </div>
  )
}

export default NavBar;