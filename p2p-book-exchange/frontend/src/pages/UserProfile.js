import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = ({ currentUserId }) => {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);

  // Fetch exchange requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/exchange-requests/user/${currentUserId}`
        );
        const requests = response.data;

        setIncomingRequests(
          requests.filter((req) => req.posterId === currentUserId)
        );
        setOutgoingRequests(
          requests.filter((req) => req.requesterId === currentUserId)
        );
      } catch (error) {
        console.error("Error fetching exchange requests:", error);
      }
    };

    fetchRequests();
  }, [currentUserId]);

  return (
    <div>
      <h3>Incoming Requests</h3>
      {incomingRequests.length > 0 ? (
        incomingRequests.map((req) => (
          <div key={req._id}>
            <p>
              {req.requesterId} wants to exchange {req.offeredBook} for{" "}
              {req.requestedBook}
            </p>
          </div>
        ))
      ) : (
        <p>No incoming requests.</p>
      )}

      <h3>Outgoing Requests</h3>
      {outgoingRequests.length > 0 ? (
        outgoingRequests.map((req) => (
          <div key={req._id}>
            <p>
              You requested {req.requestedBook} from {req.posterId}
            </p>
          </div>
        ))
      ) : (
        <p>No outgoing requests.</p>
      )}
    </div>
  );
};

export default UserProfile;
