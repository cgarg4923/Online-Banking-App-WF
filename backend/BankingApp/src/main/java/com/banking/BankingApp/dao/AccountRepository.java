package com.banking.BankingApp.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.model.Customer;

import jakarta.transaction.Transactional;

@Repository

public interface AccountRepository extends JpaRepository<Account,String> {
	
	@Query("select account.accountNo from Account account where account.customer.customerId=?1")
	public List<String> findByAccounts(String custId);

	@Query("select acc FROM Account acc WHERE acc.accountNo = ?1")
    public List<Account> findByProfileData(String accNo);
	
	@Modifying
	@Query("update Account acc set acc.balance=acc.balance-?2 where acc.accountNo=?1 ")
	public int updateBalance(String accNo,Float amount);

	
	@Modifying
	@Query("update Account acc set acc.balance=acc.balance-?2 where acc.accountNo=?1 ")
	public int updateSenderBalance(String senderAccNo, Float transactionAmount);

		
	@Modifying
	@Query("update Account acc set acc.balance=acc.balance+?2 where acc.accountNo=?1 ")
    public int updateReceiverBalance(String receiverAccNo, Float transactionAmount);

	@Modifying
    @Transactional 
	@Query("update Account acc set acc.transactionPassword=?2 where acc.accountNo=?1 ")
    public int updatePassword(String accNo, String pass);

	@Modifying
    @Transactional 
	@Query("update Account acc set acc.status=?2 where acc.accountNo=?1 ")
    public int updateAccountStatus(String accNo, String status);
}
