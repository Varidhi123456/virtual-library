package com.example.virtuallibrary.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Set;

@Document(collection = "users") 
public class User {

    @Id
    private String id;
    private String username; // Unique username
    private String email;
    private Set<String> following; // Set of user IDs the user is following

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<String> getFollowing() {
        return following;
    }

    public void setFollowing(Set<String> following) {
        this.following = following;
    }
}
