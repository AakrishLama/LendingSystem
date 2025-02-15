package com.backend.bakend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  
  @Bean
  public SecurityFilterChain SecurityFilterChain(HttpSecurity http) throws Exception {
    return http
              .csrf(customizer -> customizer.disable())
              .authorizeHttpRequests(requests -> requests.anyRequest().authenticated())
              // .formLogin(Customizer.withDefaults())     //formlogin in browser
              .httpBasic(Customizer.withDefaults())       // allows postman to work.
              .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
              .build();
  }
}