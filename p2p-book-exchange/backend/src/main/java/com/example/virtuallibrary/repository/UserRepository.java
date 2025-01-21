package com.example.virtuallibrary.repository;

import com.example.virtuallibrary.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username); // Find a user by username

    
}

