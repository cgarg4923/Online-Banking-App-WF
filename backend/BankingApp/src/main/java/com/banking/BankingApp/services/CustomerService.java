package com.banking.BankingApp.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.CustomerRepository;
import com.banking.BankingApp.model.Customer;
import com.banking.BankingApp.model.LoginModel;

@Service
public class CustomerService {
	
	@Autowired 
	CustomerRepository custRepo;
	public Customer saveCustomer(Customer cust)
	{
		Customer obj = custRepo.save(cust);
		return obj;
	}
	
	public String validateCustomerCredentials(LoginModel checkCust)
	{
		String result = "";
		Customer cust = null;
		
		Optional<Customer> obj = custRepo.findById(checkCust.getCustomerId());
		
		if(obj.isPresent())
		{
			cust = obj.get();
		}
		

		if(cust == null) 
		{
			result = "NO CUSTOMER FOUND WITH GIVEN CUSTOMERID " + "\n" + " PLEASE ENTER VALID CREDENTIALS !!!";
		}
		else
		{
			if(checkCust.getPassword().equals(cust.getPassword()))
			{
				result = "LOGGED IN SUCCESSFULLY !!";
			}
			else
			{
				result = "INCORRECT PASSWORD, TRY AGAIN !!! ";
			}
		}
		
		return result;
	}


}
