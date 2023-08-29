package com.banking.BankingApp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.banking.BankingApp.model.Customer;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository

public interface CustomerRepository extends JpaRepository<Customer,String>{

        @Query("select c FROM Customer c WHERE c.customerId = ?1")
        public List<Customer> findByProfileData(String custId);
        
        @Query("select c FROM Customer c WHERE c.aadharNumber = ?1")
        public Customer findByAadhar(String aadharNo);

        @Modifying
        @Transactional 
        @Query("update Customer cust set cust.password=?2 where cust.customerId=?1 ")
        public int updatePassword(String custId, String pass);

        @Modifying
        @Transactional 
        @Query("update Customer cust set cust.status=?2 where cust.customerId=?1 ")
        public int updateStatus(String custId, String status);
}
