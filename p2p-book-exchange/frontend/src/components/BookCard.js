import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const BookCard = ({ title, author, genre, condition }) => {
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [exchangeBook, setExchangeBook] = useState(""); // State for exchange book input
  const [message, setMessage] = useState(""); // State for user message

  // Handle dialog open and close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleExchangeRequest = () => {
    // Handle exchange logic here (e.g., call API)
    console.log("Exchange requested for:", title);
    console.log("Exchange with book:", exchangeBook);
    console.log("User message:", message);
    handleClose(); // Close the dialog after submitting
  };

  return (
    <>
      <Card sx={{ margin: 2 }}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">Author: {author}</Typography>
          <Typography variant="body2">Genre: {genre}</Typography>
          <Typography variant="body2">Condition: {condition}</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleOpen} // Open the dialog
          >
            Request Exchange
          </Button>
        </CardContent>
      </Card>

      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Request Exchange</DialogTitle>
        <DialogContent>
          <Typography>You're requesting an exchange for:</Typography>
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            {title}
          </Typography>

          {/* Input for the book user wants to exchange */}
          <TextField
            fullWidth
            label="Book to Exchange"
            value={exchangeBook}
            onChange={(e) => setExchangeBook(e.target.value)}
            sx={{ marginTop: 2 }}
            placeholder="Enter the book you'd like to exchange for this"
          />

          {/* Input for additional message */}
          <TextField
            fullWidth
            label="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            rows={4}
            sx={{ marginTop: 2 }}
            placeholder="Write a message to the book owner..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleExchangeRequest} color="primary">
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookCard;
