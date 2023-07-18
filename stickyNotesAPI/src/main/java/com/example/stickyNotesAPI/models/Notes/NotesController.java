package com.example.stickyNotesAPI.models.Notes;

import java.lang.reflect.Array;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.stickyNotesAPI.models.Users.Users;
import com.example.stickyNotesAPI.repository.NoteRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@CrossOrigin
public class NotesController {
    @Autowired
    NoteRepository notesRepo;

    // Get Mapping
    @GetMapping("/getAllNotes")
    public List<Notes> showAllNotes() {
        return notesRepo.findAll();
    }

    @GetMapping("/getNotesWithUserId")
    public List<Notes> getNotesWithUserId(@RequestParam("userId") String userId) {
        return notesRepo.findNoteByUserId(userId);
    }

    // Post Mapping
    @PostMapping("/newNote")
    public Notes newNote(@RequestBody Notes note) {
        Notes newNote = new Notes(note.getTitle(), note.getContent(), note.getColor(), note.getUserId());
        notesRepo.save(newNote);
        return newNote;
    }

    // Put Mapping
    @PutMapping("/updateNote")
    public Notes updateNote(@RequestBody Notes note) {
        Optional<Notes> curNote = notesRepo.findById(note.getId());
        if (curNote == null)
            return null;
        curNote.get().setTitle(note.getTitle());
        curNote.get().setContent(note.getContent());
        curNote.get().setColor(note.getColor());
        notesRepo.save(curNote.get());
        return curNote.get();
    }

    // Delete Mapping
    @DeleteMapping("/deleteNote")
    public boolean deleteNote(@RequestBody HashMap<String, String> req) {
        Optional<Notes> curUser = notesRepo.findById(req.get("noteId"));
        if (curUser == null)
            return false;
        notesRepo.deleteById(req.get("noteId"));
        return true;
    }
}
