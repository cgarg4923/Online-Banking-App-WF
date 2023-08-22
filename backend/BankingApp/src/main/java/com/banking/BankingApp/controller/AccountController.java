package com.banking.BankingApp.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.dto.TransactionProjection;
import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.model.Customer;
import com.banking.BankingApp.model.WithdrawTransactionModel;
import com.banking.BankingApp.services.AccountService;

import jakarta.validation.Valid;



@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/account")
public class AccountController {
	
	@Autowired
	AccountService accService;
	
	@PostMapping("/saveAccountData/{custID}")
	public String saveAccountData(@Valid @RequestBody Account acc,@PathVariable("custID") String customerId)
	{

		String c = accService.saveAccount(acc,customerId);
		return c;
	}
	@GetMapping("/fetchTransactions/{accountNo}/{from}/{to}")
	public List<TransactionProjection> fetchTransactions(@PathVariable("accountNo") String accNo,@PathVariable("from") Date from,@PathVariable("to") Date to)
	{
		return accService.fetchTransactions(accNo,from,to);
	}
	
	@PutMapping("/fundTransfer")
	public String fundTransfer(@RequestBody WithdrawTransactionModel transInstance)
	{
		String result = accService.fundTransfer(transInstance);
		return result;
	}

	@GetMapping("/fetchAccountProfile/{accountNo}")
	public List<Account> fetchProfileData(@PathVariable("accountNo") String accNo)
	{
		return accService.fetchProfileData(accNo);
	}

	@PutMapping("/updatePassword/{accountNo}/{password}")
	public String updatePassword(@PathVariable("accountNo") String accNo,@PathVariable("password") String pass)
	{
		String result = accService.updatePassword(accNo,pass);
		return result;
	}

}
