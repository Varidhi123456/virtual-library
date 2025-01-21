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
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const BookCard = ({
  title,
  author,
  genre,
  condition,
  // currentUserId,
  // bookOwnerId,
}) => {
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [exchangeBook, setExchangeBook] = useState(""); // State for exchange book input
  const [message, setMessage] = useState(""); // State for user message
  const [responseMessage, setResponseMessage] = useState(""); // Feedback for user
  const [loading, setLoading] = useState(false); // State to indicate loading

  // Handle dialog open and close
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  // Reset form states
  const resetForm = () => {
    setExchangeBook("");
    setMessage("");
    setResponseMessage("");
    setLoading(false);
  };

  const handleExchangeRequest = async () => {
    if (!exchangeBook.trim()) {
      setResponseMessage("Please enter a book to exchange.");
      return;
    }

    setLoading(true); // Set loading state
    try {
      // Construct request payload
      const requestPayload = {
        requestedBook: title, // The book being requested (required)
        offeredBook: exchangeBook, // The book offered in exchange (required)
        message: message || "", // Optional message
        // ...(currentUserId && { requesterId: currentUserId }), // Include if not undefined
        // ...(bookOwnerId && { posterId: bookOwnerId }), // Include if not undefined
      };

      console.log("Payload:", requestPayload);

      // Make API call
      const response = await axios.post(
        "http://localhost:8080/exchange-requests",
        requestPayload
      );

      setResponseMessage("Exchange request sent successfully!");
      console.log("Server Response:", response.data);

      resetForm(); // Clear form after successful submission
      setOpen(false); // Close dialog
    } catch (error) {
      console.error("Error sending exchange request:", error);
      // Check for backend error messages
      const errorMessage =
        error.response?.data?.error || "Failed to send request. Please try again.";
      setResponseMessage(errorMessage);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Card sx={{ margin: 2 }}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">Author: {author}</Typography>
          <Typography variant="body2">Genre: {genre}</Typography>
          <Typography variant="body2">Condition: {condition || "Unknown"}</Typography>
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
            required
          />

          {/* Input for additional message */}
          <TextField
            fullWidth
            label="Your Message (Optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            rows={3}
            sx={{ marginTop: 2 }}
            placeholder="Write a message to the book owner..."
          />

          {/* Feedback message */}
          {responseMessage && (
            <Typography
              variant="body2"
              sx={{
                marginTop: 2,
                color: responseMessage.includes("success") ? "green" : "red",
              }}
            >
              {responseMessage}
            </Typography>
          )}

          {/* Loading spinner */}
          {loading && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
              <CircularProgress />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleExchangeRequest}
            color="primary"
            disabled={loading}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookCard;
