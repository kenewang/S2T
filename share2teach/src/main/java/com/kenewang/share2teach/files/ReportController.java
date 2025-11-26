package com.kenewang.share2teach.files;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/pending")
    public ResponseEntity<?> getPendingReports() {
        try {
            List<ReportDTO> reports = reportService.getPendingReports();
            return ResponseEntity.ok(reports);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server error: " + e.getMessage());
        }
    }

    @PostMapping("/document")
    public ResponseEntity<?> reportDocument(@RequestBody Map<String, Object> payload, HttpServletRequest request) {
        try {
            Long fileId = Long.parseLong(payload.get("file_id").toString());
            String reason = payload.get("reason").toString();

            // ✅ Extract user info from JwtAuthFilter
            Claims claims = (Claims) request.getAttribute("user");

            if (claims == null) {
                return ResponseEntity.status(401).body(Map.of("msg", "Unauthorized"));
            }

            Long userId = Long.parseLong(claims.getSubject());
            System.out.println(userId);

            // ✅ Save report
            reportService.submitReport(fileId, userId, reason);

            return ResponseEntity.status(201).body(Map.of("msg", "Report submitted successfully"));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("msg", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("msg", "Server error", "error", e.getMessage()));
        }
    }

}
