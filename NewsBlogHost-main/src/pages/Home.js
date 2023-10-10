import React, { useEffect } from "react";
import banner from "../Assets/banner.png";
import Bar from "../components/Bar";
import Dropdwn from "../components/Dropdwn";
import CardPack from "../components/CardPack";
import Image from "react-bootstrap/Image";
import { useDbContext } from "../components/DbContext";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
function Home() {
  const { getPosts } = useDbContext();
  const [filter, setFilter] = useState("home");
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const handleClick = (uid) => {
    setFilter(uid);
  };
  useEffect(() => {
    getPosts();
  }, []);
  const idname = [
    { name: "Home", uid: "home" },
    { name: "College", uid: "tUy3IedmJfYQnCBjQNLC60yWDl53" },
    { name: "dfghj", uid: "NLcqNTcLhpVFXXNioiXJMM10dSq2" },
    { name: "NSS", uid: "apWNdPOC4GXHrQ4dzE7qBzWHvOo2" },
    { name: "IEDC", uid: "DlE9407dAqYiUmPEa0myFeh9Bdh1" },
    { name: "CGPU", uid: "62f9oIJI6hNBB9hPMNV1TyoRBIf2" },
    { name: "Student Union", uid: "7YNcGcpm9WUXzsnicgm9uQtak7o1" },
  ];
  return (
    <div>
      <div
        className="d-flex justify-content-center mh-100"
        style={{ height: 180 }}
      >
        <Image
          className="m-auto h-100"
          src={banner}
          alt=""
          fluid
          style={{ overflow: "hidden" }}
        />
      </div>
      {isDesktopOrLaptop && (
        <Bar handleClick={handleClick} filter={filter} idname={idname} />
      )}
      {isMobile && (
        <Dropdwn handleClick={handleClick} filter={filter} idname={idname} />
      )}
      <CardPack filter={filter} userPage={false} />
    </div>
  );
}

export default Home;
