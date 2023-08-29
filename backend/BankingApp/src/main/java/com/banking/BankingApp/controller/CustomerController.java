package com.banking.BankingApp.controller;

import java.util.ArrayList;
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

import com.banking.BankingApp.dao.AccountRepository;
import com.banking.BankingApp.exception.AlreadyExistsException;
import com.banking.BankingApp.exception.NegativeTransactionAmountException;
import com.banking.BankingApp.exception.NoDataFoundException;
import com.banking.BankingApp.exception.ResourceNotFoundException;
import com.banking.BankingApp.model.Account;
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

	@Autowired
	AccountRepository accRepo;
	
	@PostMapping("/saveCustomerData")
	public Customer saveCustomerData(@RequestBody Customer cust) throws AlreadyExistsException
	{
		Customer c = custService.saveCustomer(cust);
		return c;
	}
	
	@PostMapping("/validateCustomerData")
	public String validateCustomerData(@RequestBody LoginModel checkCust) throws ResourceNotFoundException
	{
		String output = custService.validateCustomerCredentials(checkCust);
		return output;
	}

	@GetMapping("/fetchAllCustomers")
	public List<Customer> fetchAllCustomers() throws NoDataFoundException
	{
		return custService.fetchAllCustomers();
	}
	
	@GetMapping("/fetchCustomerAccounts/{customerId}")
	public List<String> fetchAccounts(@PathVariable("customerId") String custId) throws NoDataFoundException
	{
		List<String> accList = custService.fetchAccounts(custId);
		return accList;
	}

	@PutMapping("/withdraw")
	public String withdrawTransaction(@RequestBody WithdrawTransactionModel transInstance) throws NegativeTransactionAmountException
	{
		String result = custService.withdrawTransaction(transInstance);
		return result;
	}

	@PutMapping("/updatePassword/{customerId}/{password}")
	public String updatePassword(@PathVariable("customerId") String custId,@PathVariable("password") String pass)
	{
		String result = custService.updatePassword(custId,pass);
		return result;
	}

	@GetMapping("/fetchCustomerProfile/{customerId}") 
	public List<Customer> fetchProfileData(@PathVariable("customerId") String custId)
	{
		return custService.fetchProfileData(custId);
	}
	
	@GetMapping("/fetchBenificiary/{customerId}") 
	public List<String> fetchBenificiary(@PathVariable("customerId") String custId) throws ResourceNotFoundException
	{
		List<String> accountList = custService.fetchBenificiary(custId);
		return accountList;
	}
		
}
