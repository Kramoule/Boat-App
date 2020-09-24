package ch.vitali.boatapp;

import java.util.Objects;

import javax.persistence.*;

@Entity
public class User {
    
    @Id String username;
    String hashedPassword;

    public User(){}

    public User(String username, String hashedPassword){
        this.username = username;
        this.hashedPassword = hashedPassword;
    }

    public String getUsername(){ return this.username; }

    public void setUsername(String newUsername){ this.username = newUsername; }

    public String getHashedPassword(){ return this.hashedPassword; }

    public void setHashedPassword(String newPassword){ this.hashedPassword = newPassword; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return username.equals(user.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username);
    }

    
}
