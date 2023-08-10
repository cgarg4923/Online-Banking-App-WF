package com.banking.BankingApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.model.Transaction;
import com.banking.BankingApp.services.TransactionService;


@RestController
public class TransactionController {
	
	@Autowired
	TransactionService transactionService;
	
	@PostMapping("/saveTransactionData")
	public Transaction saveTransactionData(@RequestBody Transaction transaction)
	{
		Transaction c = transactionService.saveTransaction(transaction);
		return c;
	}
}