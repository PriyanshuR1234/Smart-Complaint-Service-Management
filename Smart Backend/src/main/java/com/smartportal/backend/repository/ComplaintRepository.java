package com.smartportal.backend.repository;

import com.smartportal.backend.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByCustomer_Id(Long customerId);
    List<Complaint> findByAgent_Id(Long agentId);
}
