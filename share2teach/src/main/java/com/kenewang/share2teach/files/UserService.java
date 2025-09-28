package com.kenewang.share2teach.files;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final InputValidator inputValidator;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository, JwtUtil jwtUtil, InputValidator inputValidator) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.inputValidator = inputValidator;
    }

    public String registerUser(RegisterRequest request) {
        inputValidator.validateRegister(request);

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        UserEntity newUser = new UserEntity();
        newUser.setFname(request.getFname());
        newUser.setLname(request.getLname());
        newUser.setUsername(request.getUsername());
        newUser.setPassword_hash(hashedPassword);
        newUser.setEmail(request.getEmail());
        newUser.setIs_active(true);
        newUser.setRole("open-access");

        userRepository.save(newUser);

        return jwtUtil.generateToken(newUser);
    }

    public boolean verifyTokenVersion(Long userId, Integer tokenVersion) {
        return userRepository.findById(userId).map(user -> user.getToken_version().equals(tokenVersion)).orElse(false);
    }
}
