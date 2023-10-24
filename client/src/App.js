import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Home from "./pages/Home"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
