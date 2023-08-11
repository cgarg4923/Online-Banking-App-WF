package com.banking.BankingApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.model.Address;
import com.banking.BankingApp.services.AddressService;



@RestController
@CrossOrigin("http://localhost:3000")
public class AddressController {
	
	@Autowired
	AddressService addressService;
	
	@PostMapping("/saveAddressData")
	public Address saveAccountData(@RequestBody Address add)
	{
		Address c = addressService.saveAccount(add);
		return c;
	}
}
