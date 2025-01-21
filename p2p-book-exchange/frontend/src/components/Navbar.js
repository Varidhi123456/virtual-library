// Just use Link without wrapping in another Router
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/listings">Book Listings</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
