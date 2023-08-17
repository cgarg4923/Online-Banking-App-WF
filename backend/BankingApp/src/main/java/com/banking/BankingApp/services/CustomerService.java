package com.banking.BankingApp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.AccountRepository;
import com.banking.BankingApp.dao.CustomerRepository;
import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.model.Customer;
import com.banking.BankingApp.model.LoginModel;
import com.banking.BankingApp.model.WithdrawTransactionModel;

import jakarta.transaction.Transactional;

@Service
public class CustomerService {

	@Autowired
	CustomerRepository custRepo;

	@Autowired
	AccountRepository accRepo;

	public Customer saveCustomer(Customer cust) {
		Customer obj = custRepo.save(cust);
		return obj;
	}

	public String validateCustomerCredentials(LoginModel checkCust) {
		String result = "";
		Customer cust = null;

		Optional<Customer> obj = custRepo.findById(checkCust.getCustomerId());

		if (obj.isPresent()) {
			cust = obj.get();
		}

		if (cust == null) {
			result = "NO CUSTOMER FOUND WITH GIVEN CUSTOMERID " + "\n" + " PLEASE ENTER VALID CREDENTIALS !!!";
		} else {
			if (checkCust.getPassword().equals(cust.getPassword())) {
				result = "LOGGED IN SUCCESSFULLY !!";
			} else {
				result = "INCORRECT PASSWORD, TRY AGAIN !!! ";
			}
		}

		return result;
	}

	public List<String> fetchAccount(String custId) {
		return accRepo.findByAccount(custId);
	}

	@Transactional
	public String withdrawTransaction(WithdrawTransactionModel transInstance) {
		String res = "";
		Account acc = accRepo.findById(transInstance.getAccountNumber()).get();
		String accNo = acc.getAccountNo();
		Float balance = acc.getBalance();
		if (balance - transInstance.getTransactionAmount() < 1000) {
			res = "Insufficient balance";
		} else {
			int rowsAffected = accRepo.updateBalance(transInstance.getAccountNumber(),
					transInstance.getTransactionAmount());
			// if(rowsAffected>0)
			// {
			// //
			// }
			res = "Transaction successfull";

		}
		return res;
	}

}
