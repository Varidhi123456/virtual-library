import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const BookCard = ({ title, author, genre, condition }) => {
  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">Author: {author}</Typography>
        <Typography variant="body2">Genre: {genre}</Typography>
        <Typography variant="body2">Condition: {condition}</Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Request Exchange
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookCard;
