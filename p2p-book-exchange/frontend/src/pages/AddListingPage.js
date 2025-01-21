import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddListingPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [condition, setCondition] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post the new book listing to the backend
      const response = await axios.post("http://localhost:8080/books", {
        title,
        author,
        genre,
        condition,
      });

      if (response.status === 200) {
        setMessage("Book listing added successfully!");
        setTimeout(() => navigate("/books"), 2000); // Redirect to book listings after 2 seconds
      }
    } catch (error) {
      console.error("Error adding book listing:", error);
      setMessage("Failed to add the book listing. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Book Listing</h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Book Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Author</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Genre</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Condition</label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Condition
              </option>
              <option value="New">New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListingPage;
