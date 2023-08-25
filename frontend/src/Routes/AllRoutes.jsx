import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/log/Login";
import Register from "../Pages/register/Register";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AllRoutes;
