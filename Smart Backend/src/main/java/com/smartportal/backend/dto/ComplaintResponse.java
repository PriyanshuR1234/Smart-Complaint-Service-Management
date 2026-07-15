package com.smartportal.backend.dto;

import com.smartportal.backend.enums.ComplaintStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ComplaintResponse {
    private Long id;
    private String title;
    private String description;
    private String category;
    private ComplaintStatus status;
    private String resolutionRemarks;
    private Long customerId;
    private String customerName;
    private Long agentId;
    private String agentName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
