import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import styles from "../../styles/SignUpForm.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import axios from "axios";

/**
* Render the SignUp form.
* Variables, data handling & error handling code provided in Moments walkthrough.
*/
const SignUpForm = () => {

    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    });

    const { username, password1, password2 } = signUpData;

    const history = useHistory();

    const [errors, setErrors] = useState({});

    /**
    * Convert inputed data into Key+Value pairs
    */
    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    /**
    * Push data to the API.
    * Reroute user to the login page.
    * Display error message for invalid data.
    */
     const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await axios.post("/dj-rest-auth/registration/", signUpData);
          history.push("/login");
        } catch (err) {
          setErrors(err.response?.data);
        }
    };

    return (
        <Container className={styles.Container}>
            <Form onSubmit={handleSubmit}>
                <br />
                <h1>Sign up!</h1>
                <br />
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
                {errors.username?.map((message, idx) => (
                    <Alert variant="danger" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Form.Group controlId="password1">
                    <Form.Label>password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="password"
                        name="password1"
                        value={password1}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors.password?.map((message, idx) => (
                    <Alert variant="danger" key={idx}>
                        {message}
                    </Alert>
                ))}

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
                {errors.password2?.map((message, idx) => (
                    <Alert variant="danger" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Button variant="primary" type="submit" className={btnStyles.Button}>
                    sign up
                </Button>
                {errors.non_field_errors?.map((message, idx) => (
                    <Alert variant="danger" key={idx}>
                        {message}
                    </Alert>
                ))}
            </Form>

            <br />
            <div>
                <p>Have an account? <Link to="/login">Login here!</Link></p>
            </div>
            <br />
        </Container>
    )

}

export default SignUpForm;