
package com.kenewang.share2teach.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

@Configuration

// session cookie class configuration
public class SessionConfig extends AbstractHttpSessionApplicationInitializer {

    // AbstractHttpSessionApplicationInitializer: makes sure Spring Session is set
    // up automatically.

    @Bean
    public CookieSerializer cookieSerializer() {

        // CookieSerializer: decides how cookies are created and sent.
        DefaultCookieSerializer serializer = new DefaultCookieSerializer(); // Spring’s default implementation that you
                                                                            // can customize.
        serializer.setCookieName("JSESSIONID"); // Sets the cookie’s name. By default, it’s already JSESSIONID, but this
                                                // makes it explicit
        serializer.setUseSecureCookie(true); // Only send this cookie if the connection is HTTPS.
        serializer.setSameSite("Lax"); // prevents CSRF while allowing auth
        return serializer;
    }
}
