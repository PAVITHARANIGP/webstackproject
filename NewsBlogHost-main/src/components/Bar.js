import { Button, Nav } from "react-bootstrap";
import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { useUserAuth } from "./Context";

const Bar = ({ handleClick, filter, idname }) => {
  const { user } = useUserAuth();
  return (
    <Navbar bg="light" variant="light" sticky="top">
      <Container>
        {idname.map((info) => {
          return (
            <Button
              variant={filter === info.uid ? "primary" : "light"}
              onClick={() => handleClick(info.uid)}
              key={info.uid}
            >
              {info.name}
            </Button>
          );
        })}

        {!user && <Nav.Link href="/Login">Login</Nav.Link>}
        {user && <Nav.Link href={`/Users/${user.uid}`}>My Account</Nav.Link>}
      </Container>
    </Navbar>
  );
};

export default Bar;
