package com.kenewang.share2teach.files;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;

    public AuthController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
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

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpSession session) {
        try {
            // ✅ Extract the user claims from JwtAuthFilter (set in request attribute)
            Claims claims = (Claims) request.getAttribute("user");
            if (claims == null) {
                return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED)
                        .body(Map.of("msg", "Unauthorized: No token provided"));
            }

            Long userId = Long.parseLong(claims.getSubject());

            // ✅ Increment token_version in DB to invalidate current JWT
            userRepository.findById(userId).ifPresent(user -> {
                user.setToken_version(user.getToken_version() + 1);
                userRepository.save(user);
            });

            // ✅ Log the logout action (optional)
            // logUserAction(userId, "logout", "User logged out and token invalidated");

            // ✅ Destroy session
            session.invalidate();

            return ResponseEntity.ok(Map.of("msg", "Successfully logged out. Token is now invalid."));

        } catch (Exception e) {
            return ResponseEntity.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR)
                    .body(Map.of("msg", "Error logging out", "error", e.getMessage()));
        }
    }

}
