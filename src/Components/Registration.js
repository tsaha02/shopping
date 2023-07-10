import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import firebase from "./firebaseconfig";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      if (password.length < 6) {
        setErrorMessage("Password should be at least 6 characters long.");
        return;
      }

      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log("Registration successful");
      setRegistrationSuccess(true);
    } catch (error) {
      console.error("Error during registration:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container className="registration-container">
      <div className="registration-content">
        <h2>Register First to Enter</h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {registrationSuccess ? (
          <>
            <Alert variant="success">
              Registration successful! Proceed to <Link to="/login">Login</Link>
            </Alert>
          </>
        ) : (
          <Form onSubmit={handleRegistration}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "25px" }}
            >
              Register
            </Button>

            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        )}
      </div>
    </Container>
  );
};

export default Registration;
