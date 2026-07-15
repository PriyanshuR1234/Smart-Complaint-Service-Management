package com.smartportal.backend.service;

import com.smartportal.backend.dto.ComplaintRequest;
import com.smartportal.backend.dto.ComplaintResponse;
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
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    public ComplaintResponse raiseComplaint(ComplaintRequest request) {
        // In a real app with auth, we'd get customerId from SecurityContext.
        // Here we use the one passed in, or default to customer ID 3 (seeded customer)
        Long custId = request.getCustomerId() != null ? request.getCustomerId() : 3L;

        User customer = userRepository.findById(custId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Complaint complaint = Complaint.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .status(ComplaintStatus.OPEN)
                .customer(customer)
                .build();

        Complaint savedComplaint = complaintRepository.save(complaint);
        return mapToResponse(savedComplaint);
    }

    public List<ComplaintResponse> getCustomerComplaints(Long customerId) {
        // Default to ID 3 if null for testing without auth
        Long id = customerId != null ? customerId : 3L;
        return complaintRepository.findByCustomer_Id(id)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ComplaintResponse mapToResponse(Complaint complaint) {
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
