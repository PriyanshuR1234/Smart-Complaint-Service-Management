package com.smartportal.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardStats {
    private long totalUsers;
    private long totalComplaints;
    private long openComplaints;
    private long resolvedComplaints;
}
