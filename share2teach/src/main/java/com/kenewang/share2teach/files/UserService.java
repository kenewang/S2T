package com.kenewang.share2teach.files;

import java.time.LocalDateTime;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final InputValidator inputValidator;
    private final PasswordEncoder passwordEncoder; // <- inject it

    public UserService(UserRepository userRepository, JwtUtil jwtUtil, InputValidator inputValidator,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.inputValidator = inputValidator;
        this.passwordEncoder = passwordEncoder; // <- assign the injected mock in tests
    }

    public String registerUser(RegisterRequest request) {
        inputValidator.validateRegister(request); // validate

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");

            // check if the user already exist
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        UserEntity newUser = new UserEntity();
        newUser.setFname(request.getFname());
        newUser.setLname(request.getLname());
        newUser.setUsername(request.getUsername());
        newUser.setPassword_hash(hashedPassword);
        newUser.setEmail(request.getEmail());
        newUser.setIs_active(true);
        newUser.setRole("educator");

        userRepository.save(newUser);

        return jwtUtil.generateToken(newUser);
    }

    // Login method
    public String loginUser(LoginRequest loginRequest) {
        // Validate input
        inputValidator.validateLogin(loginRequest);

        // Find user by email
        UserEntity user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Credentials."));

        // Check password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword_hash())) {
            throw new RuntimeException("Invalid Credentials.");
        }

        // Update last login
        user.setLast_login(LocalDateTime.now());
        userRepository.save(user);

        // Generate JWT
        String jwtToken = jwtUtil.generateToken(user);

        // (Optional) Log user action like in Node.js
        // logUserAction(user.getUser_id(), "login", "User logged in successfully");

        return jwtToken;
    }

    // verify the token version of the user
    public boolean verifyTokenVersion(Long userId, Integer tokenVersion) {
        return userRepository.findById(userId).map(user -> user.getToken_version().equals(tokenVersion)).orElse(false);
    }
}
