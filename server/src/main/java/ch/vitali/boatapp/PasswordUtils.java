package ch.vitali.boatapp;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtils {
    

    public static boolean isPasswordOK(String correctHash, String password) {
        
        return BCrypt.checkpw(password, correctHash);
    }

    public static String hashPassword(String password){
        
        return BCrypt.hashpw(password, BCrypt.gensalt());
        
    }

}
