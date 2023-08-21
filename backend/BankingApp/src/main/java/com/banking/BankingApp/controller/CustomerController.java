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

import com.banking.BankingApp.model.Customer;
import com.banking.BankingApp.model.LoginModel;
import com.banking.BankingApp.model.WithdrawTransactionModel;
import com.banking.BankingApp.services.CustomerService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/customer")

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
	
	@GetMapping("/fetchCustomerAccounts/{customerId}")
	public List<String> fetchAccounts(@PathVariable("customerId") String custId)
	{
		List<String> accountList = custService.fetchAccounts(custId);
		return accountList;
	}

	@PutMapping("/withdraw")
	public String withdrawTransaction(@RequestBody WithdrawTransactionModel transInstance)
	{
		String result = custService.withdrawTransaction(transInstance);
		return result;
	}


	@GetMapping("/fetchCustomerProfile/{customerId}")
	public List<Customer> fetchProfileData(@PathVariable("customerId") String custId)
	{
		return custService.fetchProfileData(custId);
	}
	
	@GetMapping("/fetchBenificiary/{customerId}")
	public List<String> fetchBenificiary(@PathVariable("customerId") String custId)
	{
		List<String> accountList = custService.fetchBenificiary(custId);
		return accountList;
	}
		
}
