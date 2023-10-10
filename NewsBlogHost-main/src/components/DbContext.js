import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

const dbContext = createContext();

export function DbContextProvider({ children }) {
  const initialState = [];
  const [postLists, setPostList] = useState(() => {
    const persisted = localStorage.getItem("posts");
    return persisted ? JSON.parse(persisted) : initialState;
  });
  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(postLists));
  }, [postLists]);

  const getPosts = async () => {
    const data = await getDocs(postCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <dbContext.Provider value={{ postLists, getPosts, setPostList }}>
      {children}
    </dbContext.Provider>
  );
}

export function useDbContext() {
  return useContext(dbContext);
}
