import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

const BookListingsPage = () => {
  const [books, setBooks] = useState([]); // State to store books
  const [error, setError] = useState(null); // State to handle errors

  // Fetch books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios("http://localhost:8080/books"); // Replace with your API URL
        setBooks(response.data); // Set the fetched books in state
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books. Please try again later.");
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Book Listings</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error message if any */}
      {books.length > 0 ? (
        books.map((book, index) => (
          <BookCard key={index} {...book} />
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

export default BookListingsPage;
