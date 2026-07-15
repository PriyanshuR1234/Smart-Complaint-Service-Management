package com.smartportal.backend.service;

import com.smartportal.backend.dto.ComplaintResponse;
import com.smartportal.backend.dto.DashboardStats;
import com.smartportal.backend.dto.UserResponse;
import com.smartportal.backend.entity.Complaint;
import com.smartportal.backend.entity.User;
import com.smartportal.backend.enums.ComplaintStatus;
import com.smartportal.backend.repository.ComplaintRepository;
import com.smartportal.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    public List<ComplaintResponse> getAllComplaints() {
        return complaintRepository.findAll().stream()
                .map(this::mapToComplaintResponse)
                .collect(Collectors.toList());
    }

    public DashboardStats getDashboardStats() {
        long totalUsers = userRepository.count();
        List<Complaint> allComplaints = complaintRepository.findAll();
        
        long openComplaints = allComplaints.stream()
                .filter(c -> c.getStatus() == ComplaintStatus.OPEN || c.getStatus() == ComplaintStatus.IN_PROGRESS)
                .count();
                
        long resolvedComplaints = allComplaints.stream()
                .filter(c -> c.getStatus() == ComplaintStatus.RESOLVED || c.getStatus() == ComplaintStatus.CLOSED)
                .count();

        return DashboardStats.builder()
                .totalUsers(totalUsers)
                .totalComplaints(allComplaints.size())
                .openComplaints(openComplaints)
                .resolvedComplaints(resolvedComplaints)
                .build();
    }

    public ComplaintResponse assignComplaintToAgent(Long complaintId, Long agentId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
                
        User agent = userRepository.findById(agentId)
                .orElseThrow(() -> new RuntimeException("Agent not found"));

        complaint.setAgent(agent);
        if (complaint.getStatus() == ComplaintStatus.OPEN) {
            complaint.setStatus(ComplaintStatus.IN_PROGRESS);
        }
        
        Complaint savedComplaint = complaintRepository.save(complaint);
        return mapToComplaintResponse(savedComplaint);
    }

    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }

    private ComplaintResponse mapToComplaintResponse(Complaint complaint) {
        return ComplaintResponse.builder()
                .id(complaint.getId())
                .title(complaint.getTitle())
                .description(complaint.getDescription())
                .category(complaint.getCategory())
                .status(complaint.getStatus())
                .resolutionRemarks(complaint.getResolutionRemarks())
                .customerId(complaint.getCustomer().getId())
                .customerName(complaint.getCustomer().getName())
                .agentId(complaint.getAgent() != null ? complaint.getAgent().getId() : null)
                .agentName(complaint.getAgent() != null ? complaint.getAgent().getName() : null)
                .createdAt(complaint.getCreatedAt())
                .updatedAt(complaint.getUpdatedAt())
                .build();
    }
}
