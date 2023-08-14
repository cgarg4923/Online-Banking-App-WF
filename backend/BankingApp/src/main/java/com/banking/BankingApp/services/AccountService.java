package com.banking.BankingApp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.AccountRepository;
import com.banking.BankingApp.dao.CustomerRepository;
import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.model.Customer;


@Service
public class AccountService {
	@Autowired 
	AccountRepository accRepo;
	
	@Autowired
	CustomerRepository custRepo;
	
	public String saveAccount(Account acc, String customerID)
	{
		Customer cust = custRepo.findById(customerID).get();
		acc.setCustomer(cust);
		
		String result = "";
		Account obj = accRepo.save(acc);
		if(obj != null)
		{
			result = "Account created Successfully!";
		}
		else 
		{
			result = "There is some problem with account creation!";
		}
		return result;
	}

}
