package com.kenewang.share2teach.files;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    // OncePerRequestFilter: A special Spring filter that runs once for every
    // request.

    private final JwtUtil jwtUtil; // to check if the token is valid.
    private final UserService userService; // to check if the token is still the “current” one for the user.

    public JwtAuthFilter(JwtUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)

            // ServletException and IOException are checked exception and so the "throws
            // ServletException, IOException" clause is necessary because they are not
            // handled.
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        // Looks at the HTTP request header for jwt_token.
        // If the token is there → check it.
        // If not → just let the request pass (maybe it’s a public endpoint).

        if (authHeader != null && authHeader.startsWith("Bearer")) {
            String token = authHeader.substring(7);

            // if jwt_token is there, do the following:
            try {
                Claims claims = jwtUtil.validateToken(token); // Validate the token inside the JwtUtil class using the
                                                              // method "validateToken"
                Long userId = Long.parseLong(claims.getSubject()); // Extract the userId
                Integer tokenVersion = (Integer) claims.get("token_version"); // Extract the token_version (from the
                                                                              // token claims).

                if (!userService.verifyTokenVersion(userId, tokenVersion)) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("{\"msg\":\"Token is invalid due to version mismatch\"}");
                    return;

                    // Ask UserService: “Is this token version still valid for the user?”
                    // If not → stop request and reply with 401 Unauthorized.

                    // This is useful if the user logs out or resets password → old tokens should
                    // stop working

                }

                request.setAttribute("user", claims); // If everything is okay, attach the user’s info (claims) to the
                                                      // request.

                // Now, controllers can access request.getAttribute("user") to know who the user
                // is.
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("{\"msg\":\"Token is not valid\"}");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
