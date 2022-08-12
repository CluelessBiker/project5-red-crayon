import React from 'react';
import { Navbar, Container, Nav, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  return (
    <div>
        <div fixed="top" className={styles.NavBar}>
            <NavLink to="/">
                <h1>The Red Crayon</h1>
            </NavLink>
            {/* <h1>The Red Crayon</h1> */}
        </div>

        <Col md={3}>
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
                            exact
                            to="/explore"
                            className={styles.MenuLinks}
                            activeClassName={styles.Active}
                        ><i class="fa-solid fa-hashtag"></i> Explore</NavLink>
                        <NavLink
                            exact
                            to="/favourites"
                            className={styles.MenuLinks}
                            activeClassName={styles.Active}
                        ><i class="fa-regular fa-bookmark"></i> Favourites</NavLink>
                        <NavLink
                            exact
                            to="/login"
                            className={styles.MenuLinks}
                            activeClassName={styles.Active}
                        ><i class="fa-solid fa-right-to-bracket"></i> Login</NavLink>
                        <NavLink
                            exact
                            to="/signup"
                            className={styles.MenuLinks}
                            activeClassName={styles.Active}
                        ><i class="fa-solid fa-user-pen"></i> Sign up</NavLink>
                        <NavLink
                            exact
                            to="/logout"
                            className={styles.MenuLinks}
                            activeClassName={styles.Active}
                        ><i class="fa-solid fa-right-from-bracket"></i> Log out</NavLink>
                        <NavLink
                            exact
                            to="/submit"
                            className={styles.MenuLinks}
                            activeClassName={styles.Active}
                        ><i class="fa-solid fa-circle-plus"></i> Submit</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Col>
    </div>
  )
}

export default NavBar;