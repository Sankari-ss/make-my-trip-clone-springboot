package com.makemytrip.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.RequestEntity;
import org.springframework.web.bind.annotation.*;
import com.makemytrip.models.Users;
import com.makemytrip.services.UserServices;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserServices userServices;

    @PostMapping("/login")
    public Users login(@RequestParam String email, @RequestParam String password){
        return userServices.login(email,password);
    }
    @PostMapping("/signup")
    public ResponseEntity<Users> signup(@RequestBody Users user){
        return ResponseEntity.ok(userServices.signup(user));
    }
    @GetMapping("/byEmail")
    public ResponseEntity<Users> getUserByEmail(@RequestParam String email){
        Users user =userServices.getUserByEmail(email);
        if(user!= null){
            user.setPassword(null);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
    @PutMapping("/edit/{id}")
    public Users editProfile(@PathVariable String id, @RequestBody Users updatedUser){
        return userServices.editProfile(id, updatedUser);
    }
}