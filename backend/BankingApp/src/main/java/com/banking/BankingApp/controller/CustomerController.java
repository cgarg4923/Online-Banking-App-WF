package com.banking.BankingApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.model.Customer;
import com.banking.BankingApp.model.LoginModel;
import com.banking.BankingApp.services.CustomerService;

@RestController
@CrossOrigin("http://localhost:3000")
public class CustomerController {
	
	@Autowired
	CustomerService custService;
	
	@PostMapping("/saveCustomerData")
	public Customer saveCustomerData(@RequestBody Customer cust)
	{
		Customer c = custService.saveCustomer(cust);
		return c;
	}
	
	@PostMapping("/validateCustomerData")
	public String validateCustomerData(@RequestBody LoginModel checkCust)
	{
		String output = custService.validateCustomerCredentials(checkCust);
		return output;
	}
}
