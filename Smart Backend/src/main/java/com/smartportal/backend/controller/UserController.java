package com.smartportal.backend.controller;

import com.smartportal.backend.dto.ApiResponse;
import com.smartportal.backend.dto.RegisterRequest;
import com.smartportal.backend.dto.UserResponse;
import com.smartportal.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private AuthService authService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> getProfile(Authentication authentication) {
        try {
            UserResponse profile = authService.getProfile(authentication.getName());
            return ResponseEntity.ok(new ApiResponse<>(true, "Profile fetched successfully", profile));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
    
    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(
            Authentication authentication,
            @RequestBody RegisterRequest request) {
        try {
            UserResponse profile = authService.updateProfile(authentication.getName(), request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Profile updated successfully", profile));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}
