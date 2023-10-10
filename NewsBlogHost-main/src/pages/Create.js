import { Button, Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useUserAuth } from "../components/Context";

const Create = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imagetoUpload, setImagetoUpload] = useState(null);
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const { id } = useParams();
  const goBack = () => {
    navigate(`/Users/${id}`);
  };

  const removeImage = () => {
    setImagetoUpload(null);
  };

  const updateTitle = (ev) => {
    setTitle(ev.target.value);
  };

  const updateDesc = (ev) => {
    setDesc(ev.target.value);
  };

  const postCollectionRef = collection(db, "posts");

  const createPost = async () => {
    let url = "";
    if (imagetoUpload) {
      const storageRef = ref(storage, `images/${imagetoUpload.name + v4()}`);
      let snapshot = await uploadBytes(storageRef, imagetoUpload);
      url = await getDownloadURL(snapshot.ref);
    }
    removeImage();
    await addDoc(postCollectionRef, {
      title,
      imageUrl: url,
      desc,
      author: user.uid,
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
          minHeight: "80vh",
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
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3 px-3">
                <Form.Label>Insert Image</Form.Label>
                <Form.Control
                  className="mb-3 w-auto"
                  type="file"
                  onChange={(ev) => {
                    setImagetoUpload(ev.target.files[0]);
                  }}
                />
                <small>*image should be less than 4MiB</small>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-2 pb-2">
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
              onClick={createPost}
              style={{
                float: "right",
              }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Create;
