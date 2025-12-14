package com.kenewang.share2teach.files;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class PasswordController {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordService passwordService;

    // ------------------------------------------
    // 1. REQUEST PASSWORD RESET
    // ------------------------------------------
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        return passwordService.findUserByEmail(email).map(user -> {

            String token = passwordService.generateResetToken();
            long expiresAt = System.currentTimeMillis() + 15 * 60 * 1000; // 15 minutes

            user.setResetPasswordToken(token);
            user.setResetPasswordExpires(expiresAt);
            passwordService.saveUser(user);

            // SEND RESET LINK
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(email);
            mail.setSubject("Password Reset Request");
            mail.setText("Click the link to reset your password:\n" + "http://localhost:3000/reset-password/" + token);

            mailSender.send(mail);

            return ResponseEntity.ok(Map.of("msg", "Password reset link sent to " + email));

        }).orElse(ResponseEntity.badRequest().body(Map.of("msg", "User with this email does not exist")));
    }

    // ------------------------------------------
    // 2. RESET PASSWORD WITH TOKEN
    // ------------------------------------------
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {

        String token = request.get("token");
        String password = request.get("password");
        String confirmPassword = request.get("confirmPassword");

        String result = passwordService.resetPasswordWithToken(token, password, confirmPassword);

        if ("Password successfully reset".equals(result)) {
            return ResponseEntity.ok(Map.of("msg", result));
        } else {
            return ResponseEntity.badRequest().body(Map.of("msg", result));
        }
    }
}