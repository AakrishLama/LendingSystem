package com.backend.bakend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configurers.userdetails.DaoAuthenticationConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
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
        .csrf(customizer -> customizer.disable())
        .authorizeHttpRequests(requests -> requests.anyRequest().authenticated())
        // .formLogin(Customizer.withDefaults()) //formlogin in browser
        .httpBasic(Customizer.withDefaults()) // allows postman to work.
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .build();
  }

  @SuppressWarnings("deprecation")
  @Bean
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
    provider.setUserDetailsService(userDetailsService());
    return provider;
  }

  // @Bean
  // public UserDetailsService userDetailsService() {
  // return new InMemoryUserDetailsManager();
  // }
}