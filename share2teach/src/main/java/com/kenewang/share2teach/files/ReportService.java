package com.kenewang.share2teach.files;

import org.springframework.stereotype.Service;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final FileRepository fileRepository;
    private final UserRepository userRepository;

    public ReportService(ReportRepository reportRepository, FileRepository fileRepository,
            UserRepository userRepository) {
        this.reportRepository = reportRepository;
        this.fileRepository = fileRepository;
        this.userRepository = userRepository;
    }

    public void submitReport(Long fileId, Long userId, String reason) {
        FileEntity file = fileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("File not found"));
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        ReportEntity report = new ReportEntity();
        report.setFile(file);
        report.setReporter(user);
        report.setReason(reason);
        report.setStatus("pending");

        reportRepository.save(report);
    }
}
