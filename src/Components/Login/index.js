import React, { useState, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";

import ApiService from "../../Service/ApiService";
import StorageService from "../../Service/StorageService";

import * as auth from "../../Reducers/Auth/actions";

function Login(props) {
  const { failedLogin } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const logout = useCallback(
    values => {
      dispatch(auth.login(values));
    },
    [dispatch]
  );

  const defaultValues = {
    username: "",
    password: "",
    venueID: ""
  };

  const mockValues = {
    username: "admin555@scanblox.com",
    password: "Pass5Adm5",
    venueID: "1"
  };

  // TODO replace data
  const [inputs, setInputs] = useState(mockValues);

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      logout({
        username: inputs.username,
        password: inputs.password,
        venueID: inputs.venueID
      });
    }
  };

  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
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
        <Button variant="primary" type="login">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;