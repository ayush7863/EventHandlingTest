import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/log/Login";
import Register from "../Pages/register/Register";
import Record from "../Pages/recording/Record";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/record"
        element={
          <PrivateRoute>
            <Record />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
