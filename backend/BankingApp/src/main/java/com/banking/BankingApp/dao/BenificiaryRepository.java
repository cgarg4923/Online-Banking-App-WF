package com.banking.BankingApp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.model.Benificiary;

@Repository

public interface BenificiaryRepository extends JpaRepository<Benificiary,Integer> {
    @Query("select ben.accountNo from Benificiary ben where ben.cust.customerId=?1")
	public List<String> fetchBenificiary(String custId);
}