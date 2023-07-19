package com.example.stickyNotesAPI.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.stickyNotesAPI.models.Users.Users;

import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface UserRepository extends MongoRepository<Users, String> {
    @Query("{userId:'?0'}")
    Users findUserByUserId(String userId);

    public long count();
}
