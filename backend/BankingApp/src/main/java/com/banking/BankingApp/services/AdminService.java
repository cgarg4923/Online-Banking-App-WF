package com.banking.BankingApp.services;

import com.banking.BankingApp.model.Customer;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.AccountRepository;
import com.banking.BankingApp.dao.AdminRepository;
import com.banking.BankingApp.dao.BenificiaryRepository;
import com.banking.BankingApp.dao.CustomerRepository;
import com.banking.BankingApp.dao.TransactionRepository;
import com.banking.BankingApp.dto.TransactionProjection;
import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.model.Admin;
import com.banking.BankingApp.model.Customer;
import com.banking.BankingApp.model.LoginModel;
import com.banking.BankingApp.model.Transaction;
import com.banking.BankingApp.model.WithdrawTransactionModel;

import jakarta.transaction.Transactional;

@Service
public class AdminService {
    @Autowired
    AdminRepository adminRepo;

    @Autowired 
    TransactionRepository transRepo;

    public Admin saveAdmin(Admin adm) {
		Admin obj = adminRepo.save(adm);
		return obj;
	}

    
	public String validateAdminCredentials(LoginModel checkCust) {
		String result = "";
		Admin adm = null;

		Optional<Admin> obj = adminRepo.findById(checkCust.getCustomerId());

		if (obj.isPresent()) {
			adm = obj.get();
		}

		if (adm == null) {
			result = "NO CUSTOMER FOUND WITH GIVEN CUSTOMERID " + "\n" + " PLEASE ENTER VALID CREDENTIALS !!!";
		} 
        else {
			if (checkCust.getPassword().equals(adm.getPassword())) {
				result = "LOGGED IN SUCCESSFULLY !!";
			} else {
				result = "INCORRECT PASSWORD, TRY AGAIN !!! ";
			}
		}

		return result;
	}

    public List<TransactionProjection> fetchAccountStatement(String accNo) {
		return transRepo.fetchAccountStatement(accNo);
	}

}
