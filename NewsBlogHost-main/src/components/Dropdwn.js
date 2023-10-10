import React from "react";
import { Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Dropdwn = ({ handleClick, filter, idname }) => {
  const name = idname.find((post) => post.uid === filter);
  return (
    <Container>
      <DropdownButton title={name.name} className="pl-2 ml-3">
        {idname.map((info) => {
          return (
            <Dropdown.Item onClick={() => handleClick(info.uid)} key={info.uid}>
              {info.name}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </Container>
  );
};

export default Dropdwn;
