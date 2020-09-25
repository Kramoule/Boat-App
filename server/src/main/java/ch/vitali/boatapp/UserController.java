package ch.vitali.boatapp;

import javax.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

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
    public ResponseEntity<Response> loginUser(@RequestBody UserInput user) {
        String token = "";
        HttpStatus status = HttpStatus.BAD_REQUEST;
        try {
            User u = repository.getOne(user.getUsername());
            boolean res = IdentityUtils.isPasswordOK(u.getHashedPassword(), user.getPassword());
            if(res) {
                token = generateToken(user.getUsername());
                status = HttpStatus.ACCEPTED;
            } else throw new AccessDeniedException("");
        } catch (EntityNotFoundException | AccessDeniedException e) {
            token = "Wrong credentials";
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(new Response(token), status);
    }

    @CrossOrigin("*")
    @PostMapping("/register")
    public ResponseEntity<Response> registerUser(@RequestBody UserInput user){

        //Check if user already exists
        if(repository.existsById(user.getUsername()))
            return new ResponseEntity<>(
                    new Response(String.format("User %s already exists", user.getUsername())), HttpStatus.CONFLICT);

        User newUser = new User(user.getUsername(), IdentityUtils.hashPassword(user.getPassword()));
        repository.save(newUser);

        return new ResponseEntity<>(new Response("Successfully registered"), HttpStatus.CREATED);
    }

    @CrossOrigin("*")
    @GetMapping("/verify")
    public boolean verifyToken(@RequestHeader("authorization") String token) {
        //From the "Bearer <token>", we get only the <token>
        String strippedToken = token.split(" ")[1];
        return IdentityUtils.verifyJWT(strippedToken);
    }

    private String generateToken(String username) {
        return IdentityUtils.issueJWT(username);
    }
}
