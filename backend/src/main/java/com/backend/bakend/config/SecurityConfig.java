package com.backend.bakend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.backend.bakend.service.MyUserDetailsService; 

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public UserDetailsService userDetailsService() {
    return new MyUserDetailsService(); // Explicitly define your service
  }

  @Bean
  public SecurityFilterChain SecurityFilterChain(HttpSecurity http) throws Exception {

    return http
        .csrf(customizer -> customizer.disable()) // disabling cross site request forgery.
        .authorizeHttpRequests(requests -> requests
            // authentication required for routes other than login, addUser and test.
            .requestMatchers("/addUser", "/login", "/test").permitAll()
            .anyRequest().authenticated())
        // .formLogin(Customizer.withDefaults()) //formlogin in browser
        .httpBasic(Customizer.withDefaults()) // allows postman to work.
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .build();
  }

  @Bean
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider(); // A built-in authentication provider that
                                                                          // retrieves user details from
                                                                          // UserDetailsService and validates the
                                                                          // password.
    provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
    provider.setUserDetailsService(userDetailsService());
    return provider;
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }
}
