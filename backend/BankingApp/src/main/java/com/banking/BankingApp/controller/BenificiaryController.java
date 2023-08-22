package com.banking.BankingApp.controller;

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
import com.banking.BankingApp.model.Benificiary;
import com.banking.BankingApp.model.Customer;
import com.banking.BankingApp.model.WithdrawTransactionModel;
import com.banking.BankingApp.services.AccountService;
import com.banking.BankingApp.services.BenificiaryService;

import jakarta.validation.Valid;



@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/benificiary")
public class BenificiaryController {

    @Autowired
    BenificiaryService benService;
    @PostMapping("/saveAccountData/{customerId}" ) 
	public String saveAccountData( @RequestBody Benificiary acc,@PathVariable("customerId") String  custId)
	{

		String c = benService.saveAccount(acc,custId);
		return c;
	}
}
