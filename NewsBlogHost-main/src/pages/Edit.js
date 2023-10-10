import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useDbContext } from "../components/DbContext";
import { useUserAuth } from "../components/Context";
import { db } from "../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

const Edit = () => {
  const { postLists } = useDbContext();
  const { user } = useUserAuth();
  const { id } = useParams();
  const document = postLists.find((post) => post.id === id);
  const [title, setTitle] = useState(document.title);
  const [desc, setDesc] = useState(document.desc);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(`/Users/${user.uid}`);
  };

  const updateTitle = (ev) => {
    setTitle(ev.target.value);
  };

  const updateDesc = (ev) => {
    setDesc(ev.target.value);
  };

  const updatePost = async () => {
    await updateDoc(doc(db, "posts", id), {
      title,
      desc,
      timestamp: new Date().toISOString(),
    });
    navigate("/");
  };

  return (
    <div>
      <div className="mt-3  ml-2 p-1">
        <Button onClick={goBack} variant="primary">
          Back
        </Button>
      </div>
      <Container
        fluid
        className="mx-auto "
        style={{
          minHeight: "70vh",
          maxWidth: "45em",
          border: "solid black 1px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <Form className="w-100">
          <Row>
            <Col>
              <Form.Group
                controlId="height:5em"
                className="px-3 mt-4"
                style={{ height: "6em" }}
              >
                <Form.Control
                  size="lg"
                  className="mb-3 w-100 h-100"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={updateTitle}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="my-5 pb-2">
            <Col>
              <Form.Group className="mb-3" controlId="Form.ControlTextarea1">
                <Form.Control
                  size="lg"
                  className=" w-100"
                  as="textarea"
                  rows={10}
                  style={{ overflow: "hidden" }}
                  onChange={updateDesc}
                  value={desc}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Row className="mb-3">
          <Col>
            <Button
              variant="primary"
              type="button"
              onClick={updatePost}
              style={{
                float: "right",
              }}
            >
              Update
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Edit;
