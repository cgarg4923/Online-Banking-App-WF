package com.banking.BankingApp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.CustomerRepository;
import com.banking.BankingApp.model.Customer;

@Service
public class CustomerService {
	@Autowired 
	
	CustomerRepository custRepo;
	public Customer saveCustomer(Customer cust)
	{
		Customer obj = custRepo.save(cust);
		return obj;
	}

}
