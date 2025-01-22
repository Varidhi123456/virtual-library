import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaUserCircle } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState({ username: "", email: "", profileIcon: "" });
  const [bookCount, setBookCount] = useState(0); // State to store the count of books
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [error, setError] = useState(null);

  // Fetch user details and requests
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with your API endpoints
        const userResponse = await axios.get("http://localhost:8080/users");
        const incomingResponse = await axios.get(
          "http://localhost:8080/exchange-requests/incoming"
        );
        const outgoingResponse = await axios.get(
          "http://localhost:8080/exchange-requests/outgoing"
        );

        setUser(userResponse.data);
        setIncomingRequests(incomingResponse.data);
        setOutgoingRequests(outgoingResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load profile data. Please try again later.");
      }
    };

    fetchUserData();
  }, []);

  // Fetch book count for the user
  useEffect(() => {
    const fetchBookCount = async () => {
      if (user.username) {
        try {
          const response = await axios.get(
            `http://localhost:8080/books/count/${user.username}`
          );
          setBookCount(response.data);
        } catch (err) {
          console.error("Error fetching book count:", err);
          setError("Unable to fetch the number of books shared.");
        }
      }
    };

    fetchBookCount();
  }, [user.username]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* User Information */}
        <div className="flex items-center mb-8">
          {user.profileIcon ? (
            <img
              src={user.profileIcon}
              alt="Profile Icon"
              className="w-16 h-16 rounded-full border-2 border-blue-600 mr-4"
            />
          ) : (
            <FaUserCircle size={64} className="text-blue-600 mr-4" /> // Profile icon fallback
          )}
          <div>
            <h2 className="text-xl font-bold">{user.username || "Username"}</h2>
            <p className="text-gray-600">{user.email || "user@example.com"}</p>
          </div>
        </div>

        {/* Display Book Count */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Books Shared</h3>
          <p className="text-gray-800">
            {user.username
              ? `You have shared ${bookCount} book(s).`
              : "Loading book count..."}
          </p>
        </div>

        {/* Incoming Exchange Requests */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Incoming Exchange Requests</h3>
          {incomingRequests.length === 0 ? (
            <p className="text-gray-600">No incoming requests at the moment.</p>
          ) : (
            <ul className="space-y-4">
              {incomingRequests.map((request) => (
                <li
                  key={request.id}
                  className="p-4 bg-gray-50 border rounded-md shadow-sm"
                >
                  <p>
                    <strong>From:</strong> {request.fromUser}
                  </p>
                  <p>
                    <strong>Item:</strong> {request.item}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(request.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Outgoing Exchange Requests */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Outgoing Exchange Requests</h3>
          {outgoingRequests.length === 0 ? (
            <p className="text-gray-600">No outgoing requests at the moment.</p>
          ) : (
            <ul className="space-y-4">
              {outgoingRequests.map((request) => (
                <li
                  key={request.id}
                  className="p-4 bg-gray-50 border rounded-md shadow-sm"
                >
                  <p>
                    <strong>To:</strong> {request.toUser}
                  </p>
                  <p>
                    <strong>Item:</strong> {request.item}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(request.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;

