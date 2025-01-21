package com.example.virtuallibrary.service;

import com.example.virtuallibrary.model.User;
import com.example.virtuallibrary.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Follow a user
    public boolean followUser(String userId, String targetUserId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<User> targetUserOpt = userRepository.findById(targetUserId);

        if (userOpt.isPresent() && targetUserOpt.isPresent()) {
            User user = userOpt.get();
            user.getFollowing().add(targetUserId); // Add the target user's ID to the following list
            userRepository.save(user);
            return true;
        }
        return false;
    }

    // Unfollow a user
    public boolean unfollowUser(String userId, String targetUserId) {
        Optional<User> userOpt = userRepository.findById(userId);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.getFollowing().remove(targetUserId); // Remove the target user's ID from the following list
            userRepository.save(user);
            return true;
        }
        return false;
    }
}

