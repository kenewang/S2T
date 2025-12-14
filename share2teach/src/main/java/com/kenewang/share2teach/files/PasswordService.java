package com.kenewang.share2teach.files;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class PasswordService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public PasswordService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<UserEntity> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void saveUser(UserEntity user) {
        userRepository.save(user);
    }

    // Generate secure random token
    public String generateResetToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[24];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    // Token-based password reset
    public String resetPasswordWithToken(String token, String password, String confirmPassword) {

        if (token == null || password == null || confirmPassword == null) {
            return "Missing fields";
        }

        if (!password.equals(confirmPassword)) {
            return "Passwords do not match";
        }

        Optional<UserEntity> userOpt = userRepository.findByResetPasswordToken(token);
        if (userOpt.isEmpty()) {
            return "Invalid or expired token";
        }

        UserEntity user = userOpt.get();

        // Expired?
        if (user.getResetPasswordExpires() == null || user.getResetPasswordExpires() < System.currentTimeMillis()) {
            return "Token expired";
        }

        // Update password
        user.setPassword_hash(passwordEncoder.encode(password));
        user.setResetPasswordToken(null);
        user.setResetPasswordExpires(null);
        userRepository.save(user);

        return "Password successfully reset";
    }
}