package com.kenewang.share2teach.files;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")

    // @ResponseEntiry sends a response back to the client (Postman, React frontend,
    // etc.).
    public ResponseEntity<?> register(@RequestBody RegisterRequest request, HttpSession session) {
        try {
            String jwtToken = userService.registerUser(request);
            session.setAttribute("jwtToken", jwtToken); // This stores the user’s JWT inside their session that is
                                                        // automatically created by Spring Boot.

            return ResponseEntity.ok().body(Map.of("jwtToken", jwtToken, "sessionId", session.getId()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("msg", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("msg", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("msg", "Server error"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        try {
            String jwtToken = userService.loginUser(loginRequest);

            // Store JWT in session like your register method
            session.setAttribute("jwtToken", jwtToken);

            return ResponseEntity.ok().body(Map.of("jwtToken", jwtToken, "sessionId", session.getId()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("msg", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("msg", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("msg", "Server error"));
        }
    }

}
