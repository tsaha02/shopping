import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert("Login successful");
      setLoggedIn(true);
      navigate("/profile");
    } catch (error) {
      console.error("Error during login:", error.message);
      setErrorMessage("Invalid email or password");
    }
  };

  if (loggedIn) {
    navigate("/home");
  }

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <div className="login-form">
              <h2>Login</h2>
              {errorMessage && (
                <Alert variant="danger" style={{ marginBottom: "20px" }}>
                  {errorMessage}
                </Alert>
              )}
              <Form onSubmit={handleLogin}>
                <Form.Group style={{ marginBottom: "20px" }}>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" style={{ marginRight: "25px" }}>
                  Login
                </Button>
                If not registered: <Link to="/">Register</Link>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
