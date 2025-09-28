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

    private final JwtUtil jwtUtil;
    private final UserService userService;

    public JwtAuthFilter(JwtUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = request.getHeader("jwt_token");
        if (token != null) {
            try {
                Claims claims = jwtUtil.validateToken(token);
                Long userId = Long.parseLong(claims.getSubject());
                Integer tokenVersion = (Integer) claims.get("token_version");

                if (!userService.verifyTokenVersion(userId, tokenVersion)) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("{\"msg\":\"Token is invalid due to version mismatch\"}");
                    return;
                }

                request.setAttribute("user", claims);
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("{\"msg\":\"Token is not valid\"}");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
