package com.smartportal.backend.controller;

import com.smartportal.backend.dto.ApiResponse;
import com.smartportal.backend.dto.ComplaintRequest;
import com.smartportal.backend.dto.ComplaintResponse;
import com.smartportal.backend.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*") // Allows access from React frontend
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @PostMapping
    public ResponseEntity<ApiResponse<ComplaintResponse>> createComplaint(@Valid @RequestBody ComplaintRequest request) {
        ComplaintResponse savedComplaint = complaintService.raiseComplaint(request);
        return new ResponseEntity<>(new ApiResponse<>(true, "Complaint raised successfully", savedComplaint), HttpStatus.CREATED);
    }

    @GetMapping("/customer")
    public ResponseEntity<ApiResponse<List<ComplaintResponse>>> getCustomerComplaints(
            @RequestParam(required = false) Long customerId) {
        // In reality, customerId would come from JWT. We allow it as param for testing Phase 4
        List<ComplaintResponse> complaints = complaintService.getCustomerComplaints(customerId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Complaints fetched successfully", complaints));
    }
}
