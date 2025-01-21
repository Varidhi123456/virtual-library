import React from "react";
import BookCard from "../components/BookCard";

const BookListingsPage = () => {
  const books = [
    { title: "1984", author: "George Orwell", genre: "Dystopian", condition: "Good" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", condition: "Excellent" },
  ];

  return (
    <div>
      <h2>Book Listings</h2>
      {books.map((book, index) => (
        <BookCard key={index} {...book} />
      ))}
    </div>
  );
};

export default BookListingsPage;
