import React from 'react';
import { Navbar, Container, Nav, Col } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  return (
    <div>
        <div fixed="top" className={styles.NavBar}>
            <h1>The Red Crayon</h1>
        </div>

        <Col md={3}>
            <Navbar bg="light" expand="md">
                {/* <Navbar.Brand>THE RED CRAYON</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto flex-column text-left">
                        <Nav.Link><i class="fa-solid fa-file-lines"></i> News</Nav.Link>
                        <Nav.Link><i class="fa-solid fa-hashtag"></i> Explore</Nav.Link>
                        <Nav.Link><i class="fa-regular fa-bookmark"></i> Favourites</Nav.Link>
                        <Nav.Link><i class="fa-solid fa-right-to-bracket"></i> Login</Nav.Link>
                        <Nav.Link><i class="fa-solid fa-user-pen"></i> Sign up</Nav.Link>
                        <Nav.Link><i class="fa-solid fa-right-from-bracket"></i> Log out</Nav.Link>
                        <Nav.Link><i class="fa-solid fa-circle-plus"></i> Submit</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Col>
    </div>
  )
}

export default NavBar;