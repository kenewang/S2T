package com.kenewang.share2teach.files;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;

@RestController

@RequestMapping("/api/documents")
public class FileUploadController {

    private final FileService fileService;

    public FileUploadController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(@RequestParam("file") MultipartFile file,
            @RequestParam("subject") Long subjectId, @RequestParam("grade") Long gradeId,
            @RequestParam("keywords") String keywords, HttpServletRequest request) {

        try {
            // ✅ Get user info from JWT (set by JwtAuthFilter)
            Claims claims = (Claims) request.getAttribute("user");
            if (claims == null) {
                return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED).body(Map.of("msg", "Unauthorized"));
            }

            String role = claims.get("role", String.class);
            Long userId = Long.parseLong(claims.getSubject());

            // ✅ Check allowed roles
            List<String> allowedRoles = List.of("admin", "moderator", "educator");
            if (!allowedRoles.contains(role)) {
                return ResponseEntity.status(HttpServletResponse.SC_FORBIDDEN)
                        .body(Map.of("msg", "Access denied. Only admins, moderators, and educators can upload."));
            }

            // ✅ Delegate actual logic to service
            fileService.uploadFile(file, subjectId, gradeId, keywords, userId);

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("msg", "File uploaded successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("msg", "Server error", "error", e.getMessage()));
        }
    }
}
