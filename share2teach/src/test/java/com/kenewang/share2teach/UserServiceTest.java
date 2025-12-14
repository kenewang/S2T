package com.kenewang.share2teach;

import com.kenewang.share2teach.files.*;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private InputValidator inputValidator;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoginSuccess() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");

        UserEntity user = new UserEntity();
        user.setUser_id(1L);
        user.setEmail("test@example.com");
        user.setPassword_hash("hashedPWD");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);

        when(jwtUtil.generateToken(user)).thenReturn("FAKE_JWT");

        String result = userService.loginUser(loginRequest);

        assertEquals("FAKE_JWT", result);
        verify(userRepository).save(any(UserEntity.class));
    }

    @Test
    void testRegisterUserSuccess() {
        RegisterRequest request = new RegisterRequest();
        request.setFname("John");
        request.setLname("Doe");
        request.setUsername("johndoe");
        request.setEmail("john@example.com");
        request.setPassword("password123");

        // No existing user
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.empty());

        // Mock password encoding
        when(passwordEncoder.encode("password123")).thenReturn("hashedPassword");

        // Mock JWT token generation
        UserEntity savedUser = new UserEntity();
        savedUser.setEmail("john@example.com");
        when(jwtUtil.generateToken(any(UserEntity.class))).thenReturn("FAKE_JWT");

        String token = userService.registerUser(request);

        assertEquals("FAKE_JWT", token);

        // Verify that save was called
        verify(userRepository).save(any(UserEntity.class));

        // Verify that input validation was called
        verify(inputValidator).validateRegister(request);
    }

    @Test
    void testRegisterUserInvalidInput() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("bademail"); // invalid email
        request.setPassword("pwd");
        request.setFname("F");
        request.setLname("L");
        request.setUsername("U");

        doThrow(new IllegalArgumentException("Invalid Email")).when(inputValidator).validateRegister(request);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            userService.registerUser(request);
        });

        assertEquals("Invalid Email", exception.getMessage());
        verify(userRepository, never()).save(any());
    }

    @Test
    void testRegisterUserAlreadyExists() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("existing@example.com");
        request.setPassword("pwd");
        request.setFname("Fname");
        request.setLname("Lname");
        request.setUsername("uname");

        // Simulate existing user
        when(userRepository.findByEmail("existing@example.com")).thenReturn(Optional.of(new UserEntity()));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.registerUser(request);
        });

        assertEquals("User already exists", exception.getMessage());
        verify(userRepository, never()).save(any());
    }

}
