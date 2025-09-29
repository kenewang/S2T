
package com.kenewang.share2teach.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

@Configuration
public class SessionConfig extends AbstractHttpSessionApplicationInitializer {

    @Bean
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        serializer.setCookieName("JSESSIONID"); // like express-session cookie name
        serializer.setUseSecureCookie(true); // only over HTTPS in production
        serializer.setSameSite("Lax"); // prevents CSRF while allowing auth
        return serializer;
    }
}
