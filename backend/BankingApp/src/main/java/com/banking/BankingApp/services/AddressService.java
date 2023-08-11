package com.banking.BankingApp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.AddressRepository;
import com.banking.BankingApp.model.Address;



@Service
public class AddressService {
	@Autowired 
	
	AddressRepository addressRepo;
	public Address saveAccount(Address add)
	{
		Address obj = addressRepo.save(add);
		return obj;
	}

}
