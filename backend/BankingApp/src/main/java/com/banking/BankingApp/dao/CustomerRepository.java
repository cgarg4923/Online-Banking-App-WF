package com.banking.BankingApp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.banking.BankingApp.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer,String>{

}
