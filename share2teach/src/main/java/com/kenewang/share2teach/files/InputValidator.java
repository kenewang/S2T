package com.kenewang.share2teach.files;

import org.springframework.stereotype.Component;
import java.util.regex.Pattern;

@Component
public class InputValidator {

    private static final Pattern EMAIL_REGEX = Pattern.compile("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");

    public void validateRegister(RegisterRequest req) {
        if (req.getEmail() == null || req.getPassword() == null || req.getFname() == null || req.getLname() == null
                || req.getUsername() == null) {
            throw new IllegalArgumentException("Please provide all required fields");
        }
        if (!EMAIL_REGEX.matcher(req.getEmail()).matches()) {
            throw new IllegalArgumentException("Invalid Email");
        }
    }
}
