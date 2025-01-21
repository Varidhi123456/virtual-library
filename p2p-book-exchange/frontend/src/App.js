import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";
import BookListingsPage from "./pages/BookListingsPage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AddListingPage from "./pages/AddListingPage";
import "@fortawesome/fontawesome-free/css/all.min.css";


const App = () => {
  return (
      <Routes>
      {/* <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/listings" element={<BookListingsPage />} />
        <Route path="/userpage" element={<ProfilePage />} />
        <Route path="/add-listing" element={<AddListingPage />} />
      </Routes>
  );
};

export default App;
