import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import styles from "../../styles/SignUpForm.module.css";
import axios from "axios";

const SignUpForm = () => {

    const [signUpData, setSignUpData] = useState({
        username: "",
        password: "",
        password2: "",
    });

    const { username, password, password2 } = signUpData;

    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };


    return (
        <Container className={styles.Container}>
            <h1>WHAT?!?!</h1>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label>username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="password2">
                    <Form.Label>re-enter password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="re-enter password"
                        name="password2"
                        value={password2}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    sign up
                </Button>

            </Form>

            <div>
                <Link to="/login">Have an account? Sign in</Link>
            </div>
        </Container>
    )

}

export default SignUpForm;