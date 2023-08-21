package com.banking.BankingApp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.AccountRepository;
import com.banking.BankingApp.dao.AddressRepository;
import com.banking.BankingApp.dao.BenificiaryRepository;
import com.banking.BankingApp.dao.CustomerRepository;
import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.model.Address;
import com.banking.BankingApp.model.Benificiary;
import com.banking.BankingApp.model.Customer;



@Service
public class BenificiaryService {
    @Autowired 
	BenificiaryRepository benRepo;

    @Autowired
    CustomerRepository custRepo;

	public String saveAccount(Benificiary ben,String custId)
	{
		Customer cust = custRepo.findById(custId).get();
		ben.setCust(cust);
		
		String result = "";
		Benificiary obj = benRepo.save(ben);
		if(obj != null)
		{
			result = "Benificiary added Successfully!";
		}
		else 
		{
			result = "There is some problem with benificiary addition!";
		}
		return result;
	}
}
