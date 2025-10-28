package com.makemytrip.services;
import com.makemytrip.models.Users;
import com.makemytrip.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServices{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Users login(String email, String password){
        Users user = userRepository.findByEmail(email);
        if(user != null && passwordEncoder.matches(password, user.getPassword())){
            user.setPassword(null);
            return user;
        }
        return null;
    }

    public Users signup(Users user){
        if(userRepository.findByEmail(user.getEmail())!=null){
            throw new RuntimeException("Email is already registered");
        }
        user.setPassword(passwordEncoder.encode((user.getPassword())));
        if(user.getRole() == null){
            user.setRole("USER");
        }
        Users savedUser = userRepository.save(user);
        savedUser.setPassword(null); // remove before sending response
        return savedUser;


    }
    public Users getUserByEmail(String email) {
        Users user = userRepository.findByEmail(email);
        if (user != null) {
            user.setPassword(null);
        }
        return user;
    }

    public Users editProfile(String id, Users updatedUser){
        Users user =userRepository.findById(id).orElse(null);
        if(user!=null){
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setEmail(updatedUser.getEmail());
            user.setPhoneNumber(updatedUser.getPhoneNumber());
            Users saved=userRepository.save(user);
            saved.setPassword(null);
            return saved;
        }
       return null;
    }
}