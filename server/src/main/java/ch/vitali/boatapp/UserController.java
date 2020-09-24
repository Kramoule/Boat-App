package ch.vitali.boatapp;

import javax.persistence.EntityNotFoundException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

class UserInput {
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    private String username;
    private String password;
}

@RestController
public class UserController {

    private final UserRepository repository;

    UserController(UserRepository repo) {
        this.repository = repo;
    }

    @CrossOrigin("*")
    @PostMapping("/login")
    public boolean loginUser(@RequestBody UserInput user) {
        try {
            User u = repository.getOne(user.getUsername());
            return PasswordUtils.isPasswordOK(u.getHashedPassword(), user.getPassword());
        } catch (EntityNotFoundException e) {
            return false;
        }
    }

    @CrossOrigin("*")
    @PostMapping("/register")
    public boolean registerUser(@RequestBody UserInput user){

        if(repository.existsById(user.getUsername()))
            return false;

        User newUser = new User(user.getUsername(), PasswordUtils.hashPassword(user.getPassword()));
        repository.save(newUser);

        return true;
    }
}
