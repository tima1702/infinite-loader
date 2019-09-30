import React, { useState, useCallback } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import * as auth from '../../Reducers/Auth/actions';

function Login(props) {
  const { blockButton } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const login = useCallback(
    (values) => {
      dispatch(auth.login(values));
    },
    [dispatch],
  );

  const defaultValues = {
    username: '',
    password: '',
    venueID: '',
  };

  const [inputs, setInputs] = useState(defaultValues);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      login({
        username: inputs.username,
        password: inputs.password,
        venueID: inputs.venueID,
      });
    }
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            onChange={handleInputChange}
            value={inputs.username}
            type="username"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            onChange={handleInputChange}
            value={inputs.password}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group controlId="formVenueID">
          <Form.Label>Venue ID</Form.Label>
          <Form.Control
            name="venueID"
            onChange={handleInputChange}
            value={inputs.venueID}
            type="text"
            placeholder="Enter venue ID"
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="login"
          className="btn btn-primary btn-lg btn-block"
          disabled={blockButton}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
