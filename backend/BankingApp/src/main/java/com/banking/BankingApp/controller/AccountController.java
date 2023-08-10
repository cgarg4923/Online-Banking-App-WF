package com.banking.BankingApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.services.AccountService;



@RestController
public class AccountController {
	
	@Autowired
	AccountService accService;
	
	@PostMapping("/saveAccountData")
	public Account saveAccountData(@RequestBody Account acc)
	{
		Account c = accService.saveAccount(acc);
		return c;
	}
}
