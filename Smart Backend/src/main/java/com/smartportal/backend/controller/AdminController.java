package com.smartportal.backend.controller;

import com.smartportal.backend.dto.ApiResponse;
import com.smartportal.backend.dto.ComplaintResponse;
import com.smartportal.backend.dto.DashboardStats;
import com.smartportal.backend.dto.UserResponse;
import com.smartportal.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*") // Allows access from React frontend
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        List<UserResponse> users = adminService.getAllUsers();
        return ResponseEntity.ok(new ApiResponse<>(true, "Users fetched successfully", users));
    }

    @GetMapping("/complaints")
    public ResponseEntity<ApiResponse<List<ComplaintResponse>>> getAllComplaints() {
        List<ComplaintResponse> complaints = adminService.getAllComplaints();
        return ResponseEntity.ok(new ApiResponse<>(true, "All complaints fetched successfully", complaints));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStats>> getDashboardStats() {
        DashboardStats stats = adminService.getDashboardStats();
        return ResponseEntity.ok(new ApiResponse<>(true, "Stats fetched successfully", stats));
    }

    @PostMapping("/complaints/{complaintId}/assign/{agentId}")
    public ResponseEntity<ApiResponse<ComplaintResponse>> assignComplaint(
            @PathVariable Long complaintId,
            @PathVariable Long agentId) {
        ComplaintResponse assignedComplaint = adminService.assignComplaintToAgent(complaintId, agentId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Complaint assigned successfully", assignedComplaint));
    }
}
