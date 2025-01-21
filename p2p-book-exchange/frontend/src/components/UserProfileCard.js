import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";

const UserProfileCard = ({ userId, name, email, booksShared, currentUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false); // State to track follow status
  console.log(currentUserId);
  console.log(userId);

  // Fetch the initial follow status when the component mounts
  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${currentUserId}/is-following/${userId}`);
        setIsFollowing(response.data.isFollowing); // Update the follow state based on backend data
      } catch (error) {
        console.error("Error fetching follow status:", error);
      }
    };

    fetchFollowStatus();
  }, [currentUserId, userId]);

  // Handle follow/unfollow toggle
  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        // Call the unfollow API
        await axios.post(`http://localhost:8080/users/${currentUserId}/unfollow/${userId}`);
      } else {
        // Call the follow API
        await axios.post(`http://localhost:8080/users/${currentUserId}/follow/${userId}`);
      }

      // Fetch the updated follow status from the backend
      const response = await axios.get(`http://localhost:8080/users/${currentUserId}/is-following/${userId}`);
      setIsFollowing(response.data.isFollowing); // Update the follow state
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">{email}</Typography>
        <Typography variant="caption">Books Shared: {booksShared}</Typography>
        <Button
          variant="contained"
          color={isFollowing ? "secondary" : "primary"} // Change button color
          size="small"
          sx={{ marginTop: -12, size: "small", left: 5 }}
          onClick={handleFollowToggle} // Handle button click
        >
          {isFollowing ? "Unfollow" : "Follow"} {/* Change button label */}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
