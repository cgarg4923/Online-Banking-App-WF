package com.banking.BankingApp.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.banking.BankingApp.model.Account;

@Repository

public interface AccountRepository extends JpaRepository<Account,String> {
	
	@Query("select account.accountNo from Account account where account.customer.customerId=?1")
	public List<String> findByAccount(String custId);

}
