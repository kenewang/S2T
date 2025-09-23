package com.kenewang.share2teach.files;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class Controller {
    @Autowired
    private final FileRepository fileRepository;
    private final Logger logger = Logger.getLogger(Controller.class.getName());
    private final SubjectRepository subjectRepository;

    private JavaMailSender mailSender;

    public Controller(FileRepository fileRepository, SubjectRepository subjectRepository) {
        this.fileRepository = fileRepository;
        this.subjectRepository = subjectRepository;
    }

    @GetMapping("/files/names")
    public List<String> getFileNames() {
        return fileRepository.findFirst20FileNames();
    }

    @GetMapping("/files/links")
    public List<String> getFileLinks() {
        return fileRepository.findFirst20FileLinks();

    }

    @GetMapping("/files/ratings")
    public List<String> getFileRatings() {
        return fileRepository.findFirst20FileRatings();
    }

    @GetMapping("/subjects/names")
    public List<String> getSubjectNames() {
        return subjectRepository.findAllSubjectNames();

    }

    @GetMapping("/files/{subject}")
    public List<String> getFileNamesBySubject(@PathVariable String subject) {
        Pageable limit = PageRequest.of(0, 20); // first 20 results
        return fileRepository.findFileNamesBySubject(subject, limit);
    }

    @GetMapping("/links/{subject}")
    public List<String> getFileLinksBySubject(@PathVariable String subject) {
        Pageable limit = PageRequest.of(0, 20);
        return fileRepository.findFileLinksBySubject(subject, limit);
    }

    @GetMapping("/ratings/{subject}")
    public List<String> getFileRatingsBySubject(@PathVariable String subject) {
        Pageable limit = PageRequest.of(0, 20);
        return fileRepository.findFileRatingsBySubject(subject, limit);
    }

    public String getMethodName(@RequestParam String param) {
        return new String();
    }

    @PostMapping("/send-email")
    public String sendEmail(@RequestBody EmailRequest request) {
        logger.info("Preparing to send email...");

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            // Set recipient, subject, and HTML content
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
            me.printStackTrace();
            return "Error sending email (MessagingException): " + me.getMessage();
        } catch (Exception e) {
            logger.severe("Exception: " + e.getMessage());
            e.printStackTrace();
            return "Error sending email (Exception): " + e.getMessage();
        }
    }
}
