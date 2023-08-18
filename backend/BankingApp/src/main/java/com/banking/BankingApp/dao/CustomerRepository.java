package com.banking.BankingApp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.banking.BankingApp.model.Customer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository

public interface CustomerRepository extends JpaRepository<Customer,String>{

        @Query("select c FROM Customer c WHERE c.customerId = ?1")
        public List<Customer> findByProfileData(String custId);
}
