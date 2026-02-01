package com.kenewang.share2teach.files;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/moderation")
public class ModerationController {

    private final ModerationService moderationService;

    public ModerationController(ModerationService moderationService) {
        this.moderationService = moderationService;
    }

    @PostMapping("/document")
    public ResponseEntity<?> moderateDocument(@RequestBody Map<String, Object> payload, HttpServletRequest request) {
        try {
            Long fileId = Long.parseLong(payload.get("id").toString());
            String action = payload.get("action").toString();
            String comments = payload.get("comments") != null ? payload.get("comments").toString() : null;

            // Extract moderator user from JwtAuthFilter
            Claims claims = (Claims) request.getAttribute("user");
            if (claims == null) {
                return ResponseEntity.status(401).body(Map.of("msg", "Unauthorized"));
            }

            Long moderatorId = Long.parseLong(claims.getSubject());

            moderationService.moderateDocument(fileId, moderatorId, action, comments);

            return ResponseEntity.ok(Map.of("msg", "Document moderated successfully"));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("msg", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("msg", "Server error", "error", e.getMessage()));
        }
    }
}
