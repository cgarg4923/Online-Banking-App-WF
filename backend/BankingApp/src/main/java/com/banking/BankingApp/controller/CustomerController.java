package com.banking.BankingApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.model.Customer;
import com.banking.BankingApp.services.CustomerService;

@RestController
public class CustomerController {
	
	@Autowired
	CustomerService custService;
	
	@PostMapping("/saveCustomerData")
	public Customer saveCustomerData(@RequestBody Customer cust)
	{
		Customer c = custService.saveCustomer(cust);
		return c;
	}
}
