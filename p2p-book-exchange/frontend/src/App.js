import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Optional Navbar
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";
import BookListingsPage from "./pages/BookListingsPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/listings" element={<BookListingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
