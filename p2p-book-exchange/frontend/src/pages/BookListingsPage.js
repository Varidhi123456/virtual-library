import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";

const BookListingsPage = () => {
  const [books, setBooks] = useState([]); // State to store books
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // For navigation to add listing page

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

  // Handler for Add Listing button
  const handleAddListing = () => {
    navigate("/add-listing"); // Navigate to the add listing page
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-between items-center my-4 px-4">
        <h2 className="text-2xl font-bold">Book Listings</h2>
        <button
          onClick={handleAddListing}
          className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          <i className="fas fa-plug mr-2"></i> Add Listing
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            genre={book.genre}
            condition={book.condition}
          />
        ))}
      </div>
    </div>
  );
};

export default BookListingsPage;
