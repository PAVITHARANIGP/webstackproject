import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import News from "./pages/News";
import Edit from "./pages/Edit";
import PageNotFound from "./pages/PageNotFound";
import Users from "./pages/Users";
import { useState } from "react";
import Create from "./pages/Create";
import { UserAuthContextProvider } from "./components/Context";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { DbContextProvider } from "./components/DbContext";
function App() {
  // eslint-disable-next-line no-unused-vars
  const [isAuth, setIsAuth] = useState(false);

  return (
    <UserAuthContextProvider>
      <DbContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="News/:docid" element={<News />} />
          <Route path="Login" element={<Login setIsAuth={setIsAuth} />} />
          <Route
            path="Users/:id"
            element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            }
          />
          <Route path="Create/:id" element={<Create />} />
          <Route path="Edit/:id" element={<Edit />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </DbContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
