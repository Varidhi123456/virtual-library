import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfileCard from "../components/UserProfileCard";

const UserProfile = ({ currentUserId }) => {
  const [users, setUsers] = useState([]); // State to hold users
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Fetch users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        setUsers(response.data); // Set the fetched users
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User Profiles</h2>
      {loading && <p>Loading users...</p>} {/* Show loading state */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if any */}
      {!loading && users.length > 0 ? (
        users.map((user) => (
          <UserProfileCard
            key={user.id}
            userId={user.id}
            name={user.username}
            email={user.email || "No bio available"} // Optional bio fallback
            booksShared={user.booksShared || 0} // Default booksShared value
            currentUserId={currentUserId} // Logged-in user ID
          />
        ))
      ) : (
        !loading && <p>No users found.</p> // Show if no users exist
      )}
    </div>
  );
};

export default UserProfile;
