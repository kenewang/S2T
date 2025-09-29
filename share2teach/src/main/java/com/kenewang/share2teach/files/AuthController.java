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
    public ResponseEntity<?> register(@RequestBody RegisterRequest request, HttpSession session) {
        try {
            String jwtToken = userService.registerUser(request);
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
