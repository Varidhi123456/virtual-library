import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const UserProfileCard = ({ name, bio, booksShared }) => {
  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">{bio}</Typography>
        <Typography variant="caption">Books Shared: {booksShared}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
