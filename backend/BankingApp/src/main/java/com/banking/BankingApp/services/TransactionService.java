package com.banking.BankingApp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.TransactionRepository;
import com.banking.BankingApp.model.Transaction;


@Service
public class TransactionService {
	@Autowired 
	
	TransactionRepository transRepo;
	public Transaction saveTransaction(Transaction acc)
	{
		Transaction obj = transRepo.save(acc);
		return obj;
	}

}
