package com.banking.BankingApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.model.Account;
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
}
