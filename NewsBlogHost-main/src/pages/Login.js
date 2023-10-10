import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Alert, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../components/Context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const { user, logIn } = useUserAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await logIn(email, password);
      const uid = res.user.uid;
      localStorage.setItem("uid", uid);
      navigate(`/Users/${uid}`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Container
      fluid
      className="mx-auto border"
      style={{
        minWidth: "15em",
        maxWidth: "30em",
        marginTop: "10em",
      }}
    >
      <div className="p-4 box">
        <h2 className="mb-3">Admin Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
      </div>
    </Container>
  );
};

export default Login;
