package com.kenewang.share2teach.files;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.Claims;

import java.util.Map;

@RestController
@RequestMapping("/rate-file")
public class RatingController {

    private final RatingService ratingService;
    private final JwtUtil jwtUtil;

    public RatingController(RatingService ratingService, JwtUtil jwtUtil) {
        this.ratingService = ratingService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<?> rateFile(@RequestBody RatingRequest request,
            @RequestHeader(value = "jwt_token", required = false) String token, HttpSession session) {
        try {
            Long userId = null;

            // ✅ if a token is present, validate it and get the user ID
            if (token != null) {
                try {
                    Claims claims = jwtUtil.validateToken(token);
                    userId = Long.parseLong(claims.getSubject());
                } catch (Exception e) {
                    return ResponseEntity.status(401).body(Map.of("msg", "Token is not valid"));
                }
            }

            // ✅ pass the logic to service
            double newAverage = ratingService.rateFile(request.getFile_id(), request.getRating(), userId,
                    session.getId());

            return ResponseEntity.ok(Map.of("msg", "Rating submitted successfully", "averageRating", newAverage));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("msg", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("msg", "Server error"));
        }
    }
}
