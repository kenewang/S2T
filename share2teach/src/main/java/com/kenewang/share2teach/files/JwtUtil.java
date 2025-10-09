package com.kenewang.share2teach.files;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

/*
 This class: 
• Create a JWT token when a user logs in or registers.
• Check (validate) a JWT token when a request comes in, to make sure it’s real     and not expired

 */
@Component // Marks this class as a Spring component → Spring can find and use it
           // automatically.
public class JwtUtil {

    @Value("${jwt.secret}") // Reads a secret key from application.properties.
                            // Used to "sign" tokens (like a digital signature).
    private String SECRET_KEY; // must be at least 32 characters long for HS256

    @Value("${jwt.expiration}") // Reads the expiration time (in milliseconds) from application.properties.
    private long EXPIRATION_TIME;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        // Converts your secret into a proper cryptographic key that JWT can use
    }

    public String generateToken(UserEntity user) {
        return Jwts.builder().setSubject(user.getUser_id().toString()).claim("email", user.getEmail())
                .claim("role", user.getRole()).claim("token_version", user.getToken_version()).setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // ✅ new API
                .compact();
        // This creates a token (a long string of characters) that contains the user’s
        // ID, email, role, and when it expires.
        // It’s digitally signed with your secret key so nobody can fake it.
    }

    public Claims validateToken(String token) throws JwtException {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();

        // Validate Token
        // 1. Was it signed with the correct secret?
        // 2. Has it expired?
        // If valid → return the inside info (claims: userId, email, role, etc.).
        // If invalid → throw an error.
    }
}
