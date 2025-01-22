package com.example.virtuallibrary.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "exchange_requests")
public class ExchangeRequest {
    @Id
    private String id;
    //private String posterId; // ID of the user owning the book
    private String requestedBook; // Book being requested
    private String offeredBook; // Book offered in exchange
    private String requesterusername; // username of the user making the request
    private boolean accepted; // Whether the request is accepted or not

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // public String getPosterId() {
    //     return posterId;
    // }

    // public void setPosterId(String posterId) {
    //     this.posterId = posterId;
    // }

    public String getRequestedBook() {
        return requestedBook;
    }

    public void setRequestedBook(String requestedBook) {
        this.requestedBook = requestedBook;
    }

    public String getOfferedBook() {
        return offeredBook;
    }

    public void setOfferedBook(String offeredBook) {
        this.offeredBook = offeredBook;
    }

    public String getRequesterusername() {
        return requesterusername;
    }

    public void setRequesterusername(String requesterusername) {
        this.requesterusername = requesterusername;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }
}
