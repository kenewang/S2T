package com.kenewang.share2teach.files;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET_KEY; // must be at least 32 characters long for HS256

    @Value("${jwt.expiration}")
    private long EXPIRATION_TIME;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(UserEntity user) {
        return Jwts.builder().setSubject(user.getUser_id().toString()).claim("email", user.getEmail())
                .claim("role", user.getRole()).claim("token_version", user.getToken_version()).setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // ✅ new API
                .compact();
    }

    public Claims validateToken(String token) throws JwtException {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()) // ✅ new API
                .build().parseClaimsJws(token).getBody();
    }
}
