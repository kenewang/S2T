package com.kenewang.share2teach.files;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@RestController
public class Controller {

    private final FileService fileService;
    private final SubjectService subjectService;
    private final Logger logger = Logger.getLogger(Controller.class.getName());
    private final JavaMailSender mailSender;

    public Controller(FileService fileService, SubjectService subjectService, JavaMailSender mailSender) {
        this.fileService = fileService;
        this.subjectService = subjectService;
        this.mailSender = mailSender;
    }

    @GetMapping("/files/ids")
    public List<Long> getFileIds() {
        return fileService.getFirst20FileIds();
    }

    @GetMapping("/files/names")
    public List<String> getFileNames() {
        return fileService.getFirst20FileNames();
    }

    @GetMapping("/files/links")
    public List<String> getFileLinks() {
        return fileService.getFirst20FileLinks();
    }

    @GetMapping("/files/ratings")
    public List<Double> getFileRatings() {
        return fileService.getFirst20FileRatings();
    }

    @GetMapping("/subjects/names")
    public List<String> getSubjectNames() {
        return subjectService.getAllSubjectNames();
    }

    @GetMapping("/ids/{subject}")
    public List<Long> getFileIdsBySubject(@PathVariable String subject) {
        return fileService.getFileIdsBySubject(subject);
    }

    @GetMapping("/files/{subject}")
    public List<String> getFileNamesBySubject(@PathVariable String subject) {
        return fileService.getFileNamesBySubject(subject);
    }

    @GetMapping("/links/{subject}")
    public List<String> getFileLinksBySubject(@PathVariable String subject) {
        return fileService.getFileLinksBySubject(subject);
    }

    @GetMapping("/ratings/{subject}")
    public List<Double> getFileRatingsBySubject(@PathVariable String subject) {
        return fileService.getFileRatingsBySubject(subject);
    }

    @GetMapping("/files/search")
    public List<FileSearchResponse> searchFiles(@RequestParam String query) {
        return fileService.searchFiles(query);
    }

    @PostMapping("/send-email")
    public String sendEmail(@RequestBody EmailRequest request) {
        logger.info("Preparing to send email...");
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo("kenewangoganne@gmail.com");
            helper.setSubject("New message from " + request.getName() + " (" + request.getEmail() + ")");
            String htmlContent = "<p><strong>Sender Email:</strong> " + request.getEmail() + "</p>"
                    + "<p><strong>Message:</strong></p>" + "<p>" + request.getMessage() + "</p>";
            helper.setText(htmlContent, true);

            logger.info("Sending email...");
            mailSender.send(message);
            logger.info("Email sent successfully!");
            return "Email sent successfully!";

        } catch (MessagingException me) {
            logger.severe("MessagingException: " + me.getMessage());
            return "Error sending email (MessagingException): " + me.getMessage();
        } catch (Exception e) {
            logger.severe("Exception: " + e.getMessage());
            return "Error sending email (Exception): " + e.getMessage();
        }
    }
}
