import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import styles from "../../styles/SignUpForm.module.css";

const SignUpForm = () => {

    return (
        <Container className={styles.Container}>
            <h1>WHAT?!?!</h1>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label>username</Form.Label>
                    <Form.Control type="text" placeholder="username" name="username" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password" placeholder="password" name="password"/>
                </Form.Group>

                <Form.Group controlId="password2">
                    <Form.Label>re-enter password</Form.Label>
                    <Form.Control type="password" placeholder="re-enter password" name="password2"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    sign up
                </Button>
            </Form>
        </Container>
    )

}

export default SignUpForm;