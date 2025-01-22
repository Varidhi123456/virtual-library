import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfileCard from "../components/UserProfileCard";
import Navbar from "../components/Navbar";

const UserProfile = ({ currentUserId }) => {
  const [users, setUsers] = useState([]); // State to hold users
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [booksSharedCounts, setBooksSharedCounts] = useState({}); // State to hold booksShared counts

  // Fetch users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        const usersData = response.data;

        // Fetch book counts for all users in parallel
        const countsPromises = usersData.map(async (user) => {
          try {
            const countResponse = await axios.get(
              `http://localhost:8080/books/count/${user.username}`
            );
            return { username: user.username, booksShared: countResponse.data };
          } catch (err) {
            console.error(`Error fetching book count for ${user.username}:`, err);
            return { username: user.username, booksShared: 0 }; // Default to 0 on error
          }
        });

        // Resolve all promises and build booksSharedCounts
        const countsData = await Promise.all(countsPromises);
        const countsMap = countsData.reduce(
          (acc, { username, booksShared }) => ({ ...acc, [username]: booksShared }),
          {}
        );

        setBooksSharedCounts(countsMap); // Set the counts map
        setUsers(usersData); // Set the users
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
      <Navbar />
      <h2>User Profiles</h2>
      {loading && <p>Loading users...</p>} {/* Show loading state */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if any */}
      {!loading && users.length > 0 ? (
        users.map((user) => (
          <UserProfileCard
            key={user.id}
            userId={user.id}
            name={user.username}
            email={user.email || "No email available"} // Optional email fallback
            booksShared={booksSharedCounts[user.username] || 0} // Default booksShared value
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