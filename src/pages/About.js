import React from "react";
import { Container, Row } from "react-bootstrap";
import styles from "../styles/About.module.css";

function About() {

    return (
        <Container className={styles.Content}>
            <h2><strong>About us:</strong></h2>
            <hr />
            <p>Here at The Red Crayon, we pride ourselver on catering to the Art community.</p>
            <p>We strive to provide you the lasted News on the art scene, as well as a list of all the upcoming, MUST SEE events.</p>
            <p>In an effort to bring the community together, we also invite our users to interact with the sites social aspect. Here, you can create a post and tell us all exactly what you're working on, as well as what external triggers are fueling your creativity, such as the music you're listening to.</p>
            <p>Users can follow each other, like each others posts, and leave a friendly comment should they wish. Tying together that feeling of "togetherness" we all crave so much.</p>
            <p>So get stuck in and have some fun!</p>
            <br />
            <h2><strong>Social Media:</strong></h2>
            <hr />
            <Row className={styles.SocialIconsAlign}>
                <a
                    href="https://facebook.com/popich.red"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit our Facebook page (opens in a new tab)"
                ><i class="fa-brands fa-facebook-f" /></a>

                <a
                    href="https://twitter.com/bikesandbaking"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit our Twitter page (opens in a new tab)"
                ><i class="fa-brands fa-twitter" /></a>

                <a
                    href="https://www.instagram.com/bikesandbaking"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit our Instagram page (opens in a new tab)"
                ><i class="fa-brands fa-instagram" /></a>

                <a
                    href="https://www.youtube.com/bikesandbaking"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit our YouTube page (opens in a new tab)"
                ><i class="fa-brands fa-youtube" /></a>

                <a
                    href="https://github.com/CluelessBiker"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit my Github page (opens in a new tab)"
                ><i class="fa-brands fa-github" /></a>

                <a
                    href="https://www.linkedin.com/in/lauren-nicole-popich-1ab87539/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit my Linkedin page (opens in a new tab)"
                ><i class="fa-brands fa-linkedin-in" /></a>
            </Row>
        </Container>
    );
};

export default About;