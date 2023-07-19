package com.example.stickyNotesAPI.models.Users;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import com.example.stickyNotesAPI.repository.UserRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@CrossOrigin
public class UsersController {
    @Autowired
    UserRepository usersRepo;

    // Get Mapping
    @GetMapping("/findUser")
    public boolean findUser(@RequestBody Users user) {
        Users curUser = usersRepo.findUserByUserId(user.getUserId());
        if (curUser != null) {
            return true;
        }
        return false;
    }

    // Post Mapping
    @PostMapping("/newUser")
    public boolean newUser(@RequestBody Users user) {
        Users curUser = usersRepo.findUserByUserId(user.getUserId());
        if (curUser != null) {
            return false;
        }
        Users newUser = new Users(user.getUserId());
        usersRepo.save(newUser);
        return true;
    }

    // Put Mapping

    // Delete Mapping
}
