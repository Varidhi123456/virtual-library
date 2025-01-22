package com.example.virtuallibrary.repository;

import com.example.virtuallibrary.model.ExchangeRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExchangeRequestRepository extends MongoRepository<ExchangeRequest, String> {
    // List<ExchangeRequest> findByPosterId(String posterId);
    List<ExchangeRequest> findByRequesterusername(String requesterusername);
//     List<ExchangeRequest> findByPosterIdOrRequesterId(String posterId, String requesterId);
}
