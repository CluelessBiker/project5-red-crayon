/* eslint-disable */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Container, Form, Button, Alert,
} from 'react-bootstrap';
import axios from 'axios';
import styles from '../../styles/LogInForm.module.css';
import btnStyles from '../../styles/Buttons.module.css';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';
import { setTokenTimestamp } from '../../utils/utils';

/**
 * Render the SignUp form.
 * Variables, data handling & error handling code provided in Moments walkthrough.
 */
function LogInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect('loggedIn');

  const [logInData, setLogInData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = logInData;

  const history = useHistory();

  const [errors, setErrors] = useState({});

  /**
   * Convert inputed data into Key+Value pairs
   */
  const handleChange = (event) => {
    setLogInData({
      ...logInData,
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
      const { data } = await axios.post('/dj-rest-auth/login/', logInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container className={styles.Container}>
      <Form onSubmit={handleSubmit}>
        <br />
        <h1>Login!</h1>
        <br />
        <Form.Group controlId="username">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={handleChange}
            aria-label="username"
          />
        </Form.Group>
        {errors.username?.map((message, idx) => (
          <Alert variant="danger" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={handleChange}
            aria-label="password"
          />
        </Form.Group>
        {errors.password?.map((message, idx) => (
          <Alert variant="danger" key={idx}>
            {message}
          </Alert>
        ))}

        <Button variant="primary" type="submit" className={btnStyles.Button}>
          login
        </Button>
        {errors.non_field_errors?.map((message, idx) => (
          <Alert variant="danger" key={idx}>
            {message}
          </Alert>
        ))}
      </Form>

      <br />
      <div>
        <p>
          Don&apos;t have an account?
          <Link to="/signup" className={styles.Link}>
            <strong> Sign up!</strong>
          </Link>
        </p>
      </div>
      <br />
    </Container>
  );
}

export default LogInForm;
