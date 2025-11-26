package com.kenewang.share2teach.files;

import java.time.LocalDateTime;

;

public record ReportDTO(Long reportId, Long fileId, String reason, String status, LocalDateTime createdAt,
        String reporterFname, String reporterLname) {
}
