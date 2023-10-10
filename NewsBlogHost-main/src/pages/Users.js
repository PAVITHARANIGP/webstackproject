import React, { useState } from "react";
import CardPack from "../components/CardPack";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Button, Modal } from "react-bootstrap";
import banner from "../Assets/banner.png";
import { useUserAuth } from "../components/Context";
import createImg from "../Assets/create.png";
import exitImg from "../Assets/box-arrow-left.svg";
import homeImg from "../Assets/house.svg";

const Users = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let navigate = useNavigate();
  const { user, logOut } = useUserAuth();
  const { id } = useParams();
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  const goToHome = () => {
    navigate("/");
  };

  const goToCreate = () => {
    navigate(`/Create/${user.uid}`);
  };

  return (
    <div>
      <div className="m-3 p-2">
        <Button
          type="button"
          style={{
            position: "absolute",
            top: "10px",
            right: "5em",
            background: "none",
            border: "none",
          }}
          onClick={goToHome}
        >
          <Image src={homeImg} style={{ height: "2.5em", width: "2.5em" }} />
        </Button>

        <Button
          type="button"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
          }}
          onClick={handleShow}
        >
          <Image
            src={exitImg}
            fluid
            style={{ height: "2.5em", width: "2.5em" }}
          />
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Do you want to Logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogOut}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        className="d-flex justify-content-center mh-100"
        style={{ height: 180 }}
      >
        <Image
          className="m-auto h-100"
          src={banner}
          alt="SCT college"
          fluid
          style={{ overflow: "hidden" }}
        />
      </div>
      <CardPack filter={id} userPage={true} />
      <div
        style={{
          position: "sticky",
          bottom: "3em",
          float: "right",
          right: "5em",
          border: "none",
        }}
      >
        <Button
          type="button"
          onClick={goToCreate}
          style={{
            background: "none",
            border: "none",
          }}
        >
          <Image
            fluid
            src={createImg}
            style={{ height: "4em", width: "4em" }}
          />
        </Button>
      </div>
    </div>
  );
};

export default Users;
