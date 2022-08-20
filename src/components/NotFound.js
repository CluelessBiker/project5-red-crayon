import React from 'react';
import styles from "../styles/NotFound.module.css";
import FourOFour from "../assets/notfound.png";
import { Container } from 'react-bootstrap';

/**
* Display error graphic for non-existent pages.
*/
const NotFound = () => {

    return (
        <Container>
            <div className={styles.ErrorGraphic}>
                <img src={FourOFour} alt="404 Error. Page not found."/>
            </div>
        </Container>
    )
}

export default NotFound;