import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import NoImage from "../Assets/no-image-icon-11.png";
import Moment from "react-moment";

const CCard = ({ id, title, image, userPage, handleDelete, timestamp }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Do you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Card>
        <Card.Img variant="top" src={image ? image : NoImage} alt="post" />
        <Card.Body>
          <Card.Title>
            <Link
              to={`/News/${id}`}
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                justifyContent: "center",
                fontSize: "30px",
              }}
              onMouseOver={({ target }) => {
                target.style.color = "blue";
              }}
              onMouseOut={({ target }) => (target.style.color = "#000")}
            >
              {title}
            </Link>
          </Card.Title>
          <Card.Text>
            <small style={{ float: "right" }}>
              <Moment interval={30000} fromNow>
                {timestamp}
              </Moment>
            </small>
          </Card.Text>
        </Card.Body>
        {userPage && (
          <Card.Footer>
            <Button
              variant="warning"
              style={{ float: "left", width: "7em" }}
              size="sm"
              onClick={() => {
                navigate(`/Edit/${id}`);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              style={{ float: "right" }}
              size="sm"
              onClick={handleShow}
            >
              Delete
            </Button>
          </Card.Footer>
        )}
      </Card>
    </>
  );
};

export default CCard;
