import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";

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
      <Navbar/>
      <h2>Book Listings</h2>
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          genre={book.genre}
          condition={book.condition}
          currentUserId={currentUserId} // Pass logged-in user's ID
          bookOwnerId={book.ownerId} // Pass the owner of the book
        />
      ))}
    </div>
  );
};

export default BookListingsPage;
