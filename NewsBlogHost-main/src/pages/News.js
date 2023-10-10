import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDbContext } from "../components/DbContext";
import { Container, Image, Row, Col, Button } from "react-bootstrap";
import NoImage from "../Assets/no-image-icon-11.png";
import homeImg from "../Assets/house.svg";

const News = () => {
  const { postLists } = useDbContext();
  const navigate = useNavigate();
  const { docid } = useParams();
  const postDet = postLists.find((card) => {
    return card.id === docid;
  });

  return (
    <>
      <div className="my-3 ml-2">
        <Button
          className="mx-5"
          onClick={() => navigate("/")}
          style={{ background: "none", border: "none" }}
        >
          <Image src={homeImg} style={{ height: "2.5em", width: "2.5em" }} />
        </Button>
      </div>

      <Container
        className=" my-5 p-4 w-75 shadow shadow-3"
        style={{ minHeight: "100vh" }}
      >
        <Row
          className="m-auto w-auto p-2 "
          style={{ borderBottom: "1px solid gray" }}
        >
          <Col>
            <h1 style={{ textAlign: "center" }}> {postDet?.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col className="my-2 mx-auto w-100 h-100 ">
            <Image
              rounded
              fluid
              src={postDet?.imageUrl ? postDet.imageUrl : NoImage}
              style={{
                margin: "0 auto",
                display: "block",
                maxHeight: "40vh",
              }}
            />
          </Col>
        </Row>
        <Row className="mt-4  h-25 w-auto ">
          <Col>
            <p>{postDet?.desc}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default News;
