package com.banking.BankingApp.dao;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.banking.BankingApp.dto.TransactionProjection;
import com.banking.BankingApp.model.Transaction;
@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Integer>{
    @Query("select new com.banking.BankingApp.dto.TransactionProjection(t.sourceAccount.accountNo,t.destinationAccount.accountNo,t.timeStamp,t.transactionType,t.amount) from Transaction t  where (t.sourceAccount.accountNo=?1 or t.destinationAccount.accountNo=?1) and t.timeStamp between ?2 and ?3")
	public List<TransactionProjection> findByTransactions(String accNo,Date from,Date to);

    @Query("select new com.banking.BankingApp.dto.TransactionProjection(t.sourceAccount.accountNo,t.destinationAccount.accountNo,t.timeStamp,t.transactionType,t.amount) from Transaction t  where t.sourceAccount.accountNo=?1 order by t.timeStamp desc limit 5")
	public List<TransactionProjection> fetchStatement(String accNo);
}
