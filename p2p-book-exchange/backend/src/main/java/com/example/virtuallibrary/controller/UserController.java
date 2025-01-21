package com.example.virtuallibrary.controller;

import com.example.virtuallibrary.model.User;
import com.example.virtuallibrary.repository.UserRepository;
import com.example.virtuallibrary.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    
    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // Follow a user
    @PostMapping("/{userId}/follow/{targetUserId}")
    public ResponseEntity<String> followUser(
            @PathVariable String userId,
            @PathVariable String targetUserId) {
        boolean success = userService.followUser(userId, targetUserId);
        return success
                ? ResponseEntity.ok("Followed successfully")
                : ResponseEntity.badRequest().body("Failed to follow user");
    }

    // Unfollow a user
    @PostMapping("/{userId}/unfollow/{targetUserId}")
    public ResponseEntity<String> unfollowUser(
            @PathVariable String userId,
            @PathVariable String targetUserId) {
        boolean success = userService.unfollowUser(userId, targetUserId);
        return success
                ? ResponseEntity.ok("Unfollowed successfully")
                : ResponseEntity.badRequest().body("Failed to unfollow user");
    }
}
