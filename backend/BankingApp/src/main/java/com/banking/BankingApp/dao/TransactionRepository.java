package com.banking.BankingApp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.banking.BankingApp.dto.TransactionProjection;
import com.banking.BankingApp.model.Transaction;
@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Integer>{
    @Query("select new com.banking.BankingApp.dto.TransactionProjection(t.sourceAccount.accountNo,t.destinationAccount.accountNo,t.timeStamp,t.transactionType,t.amount) from Transaction t  where t.sourceAccount.accountNo=?1 or t.destinationAccount.accountNo=?1")
	public List<TransactionProjection> findByTransactions(String accNo);
}
