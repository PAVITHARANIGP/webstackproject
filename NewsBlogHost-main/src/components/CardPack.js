/* eslint-disable no-unused-vars */
import React from "react";
import CCard from "./CCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../firebaseConfig";
import { useDbContext } from "./DbContext";

const CardPack = ({ filter, userPage }) => {
  const { postLists, setPostList } = useDbContext();
  function getPathStorageFromUrl(url) {
    const baseUrl =
      "https://firebasestorage.googleapis.com/v0/b/news-blog-b5b10.appspot.com/o/";

    let imagePath = url.replace(baseUrl, "");

    const indexOfEndPath = imagePath.indexOf("?");

    imagePath = imagePath.substring(0, indexOfEndPath);

    imagePath = imagePath.replace("%2F", "/");

    return imagePath;
  }
  const handleDelete = async (id) => {
    const docref = doc(db, "posts/", id);
    const imUrl = postLists.find((post) => post.id === id);
    let impath = getPathStorageFromUrl(imUrl.imageUrl);
    if (impath) {
      const desertRef = ref(storage, impath);
      await deleteObject(desertRef);
    }
    await deleteDoc(docref);
    setPostList((postLists) => {
      return postLists.filter((post) => {
        return post.id !== id;
      });
    });
  };
  return (
    <>
      <Row xs={1} md={4} className="g-4 m-4 ">
        {postLists
          .sort((x, y) => {
            return new Date(x.timestamp) - new Date(y.timestamp);
          })
          .reverse()
          .filter((post) => {
            if (filter === "home") return true;
            return post.author === filter;
          })
          .map((post) => {
            return (
              <Col key={post.id}>

                <CCard
                  id={post.id}
                  title={post.title}
                  image={post.imageUrl}
                  desc={post.desc}
                  userPage={userPage}
                  handleDelete={handleDelete}
                  timestamp={post.timestamp}
                />
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default CardPack;
