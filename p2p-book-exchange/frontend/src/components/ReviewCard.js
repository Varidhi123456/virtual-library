import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ReviewCard = ({ user, review }) => {
  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="subtitle1">{user}</Typography>
        <Typography variant="body2">{review}</Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
