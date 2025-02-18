package com.backend.bakend.Model;

public class AuthResponse {
  private User user;
  private String token;

  public AuthResponse(User user, String token) {
      this.user = user;
      this.token = token;
  }

  public User getUser() {
      return user;
  }

  public String getToken() {
      return token;
  }
}
