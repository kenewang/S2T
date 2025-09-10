package com.kenewang.share2teach.files;

import java.util.List;
import java.util.logging.Logger;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;



@RestController
public class Controller {

    private final FileRepository repository;
     private final Logger logger = Logger.getLogger(Controller.class.getName());

    @Autowired
    private JavaMailSender mailSender;

    public Controller(FileRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/files/names")
    public List<String> getFileNames() {
        return repository.findAllFileNames();
    }

    @GetMapping("/files/links")
    public List<String> getFileLinks() {
        return repository.findFileLinks();
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
                    + "<p><strong>Message:</strong></p>"
                    + "<p>" + request.getMessage() + "</p>";
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
