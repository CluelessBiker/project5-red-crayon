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
                        <Nav.Link>Articles</Nav.Link>
                        <Nav.Link>Posts</Nav.Link>
                        <Nav.Link>Login</Nav.Link>
                        <Nav.Link>Sign up</Nav.Link>
                        <Nav.Link>Log out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Col>
    </div>
  )
}

export default NavBar;