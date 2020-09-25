package ch.vitali.boatapp;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Value;

import javax.annotation.PostConstruct;
import java.time.Instant;
import java.util.Date;

public class IdentityUtils {

    private final static String SECRET_KEY = "Secret key";

    public static boolean isPasswordOK(String correctHash, String password) {
        return BCrypt.checkpw(password, correctHash);
    }

    public static String hashPassword(String password){
        System.out.println(SECRET_KEY);
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public static String issueJWT(String username) {
        try {
            Algorithm algo = Algorithm.HMAC512(SECRET_KEY);
            String token = JWT.create()
                    .withIssuer("fabio")
                    .withClaim("username", username)
                    .withIssuedAt(Date.from(Instant.now()))
                    .sign(algo);

            return token;
        } catch (JWTCreationException e){
            return null;
        }
    }

    public static boolean verifyJWT(String token){
        try{
            Algorithm algo = Algorithm.HMAC512(SECRET_KEY);
            JWTVerifier verifer = JWT.require(algo)
                    .withIssuer("fabio")
                    .acceptLeeway(1)
                    .build();
            verifer.verify(token);
            return true;
        } catch (JWTVerificationException exception){
            return false;
        }
    }
}
