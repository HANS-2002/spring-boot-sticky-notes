package com.example.stickyNotesAPI.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.stickyNotesAPI.models.Notes.Notes;

import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface NoteRepository extends MongoRepository<Notes, String> {
    @Query("{_id: ?0}")
    Notes findNoteById(String noteId);

    @Query("{userId:'?0'}")
    List<Notes> findNoteByUserId(String userId);

    public long count();
}
