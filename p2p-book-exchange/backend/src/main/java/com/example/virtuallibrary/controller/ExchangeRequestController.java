package com.example.virtuallibrary.controller;

import com.example.virtuallibrary.model.ExchangeRequest;
import com.example.virtuallibrary.repository.ExchangeRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/exchange-requests")
public class ExchangeRequestController {

    @Autowired
    private ExchangeRequestRepository exchangeRequestRepository;

    // Create a new exchange request
    @PostMapping
    public ResponseEntity<ExchangeRequest> createExchangeRequest(@RequestBody ExchangeRequest request) {
        System.out.println("Received Request Payload: " + request);

        if (request.getPosterId() == null || request.getRequesterId() == null ||
                request.getRequestedBook() == null || request.getOfferedBook() == null) {
            System.err.println("Error: Missing required fields in the request payload");
            return ResponseEntity.badRequest().body(null);
        }

        ExchangeRequest savedRequest = exchangeRequestRepository.save(request);
        return ResponseEntity.ok(savedRequest);
    }

    // Get all exchange requests for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ExchangeRequest>> getRequestsForUser(@PathVariable String userId) {
        List<ExchangeRequest> requests = exchangeRequestRepository.findByPosterIdOrRequesterId(userId, userId);
        return ResponseEntity.ok(requests);
    }

    // Update the status of an exchange request
    @PutMapping("/{id}")
    public ResponseEntity<ExchangeRequest> updateExchangeRequestStatus(
            @PathVariable String id,
            @RequestBody ExchangeRequest updatedRequest) {
        return exchangeRequestRepository.findById(id).map(request -> {
            request.setAccepted(updatedRequest.isAccepted());
            exchangeRequestRepository.save(request);
            return ResponseEntity.ok(request);
        }).orElse(ResponseEntity.notFound().build());
    }
}
