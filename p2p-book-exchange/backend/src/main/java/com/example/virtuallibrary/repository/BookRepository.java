package com.example.virtuallibrary.repository;

import com.example.virtuallibrary.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {

    // Find books containing keyword in title, author, or genre (case-insensitive)
    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrGenreContainingIgnoreCase(String title, String author, String genre);

    // Find books by exact genre
    List<Book> findByGenre(String genre);

    // Find books by author
    List<Book> findByAuthor(String author);

    // Find books by title
    List<Book> findByTitle(String title);

    // Query method for counting books
    long countByUsername(String username); 

    // Count books by genre
    long countByGenre(String genre);

    // Check if a book exists by title
    boolean existsByTitle(String title);
}
