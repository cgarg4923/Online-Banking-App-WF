package com.banking.BankingApp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.AccountRepository;
import com.banking.BankingApp.model.Account;


@Service
public class AccountService {
	@Autowired 
	
	AccountRepository accRepo;
	public Account saveAccount(Account acc)
	{
		Account obj = accRepo.save(acc);
		return obj;
	}

}
