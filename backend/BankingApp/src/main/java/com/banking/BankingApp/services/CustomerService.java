package com.banking.BankingApp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.AccountRepository;
import com.banking.BankingApp.dao.BenificiaryRepository;
import com.banking.BankingApp.dao.CustomerRepository;
import com.banking.BankingApp.dao.TransactionRepository;
import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.model.Customer;
import com.banking.BankingApp.model.LoginModel;
import com.banking.BankingApp.model.Transaction;
import com.banking.BankingApp.model.WithdrawTransactionModel;

import jakarta.transaction.Transactional;

@Service
public class CustomerService {

	@Autowired
	CustomerRepository custRepo;

	@Autowired
	AccountRepository accRepo;

	@Autowired 
	TransactionRepository transRepo;

	@Autowired
	BenificiaryRepository benRepo;

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

	public List<String> fetchAccounts(String custId) {
		return accRepo.findByAccounts(custId);
	}

	
	public List<String> fetchBenificiary(String custId) {
		return benRepo.fetchBenificiary(custId);
	}

	public List<Customer> fetchProfileData(String custId)
	{
		return custRepo.findByProfileData(custId);
	}

	@Transactional
	public String withdrawTransaction(WithdrawTransactionModel transInstance) 
	{
		String res = "";
		Account senderAcc = accRepo.findById(transInstance.getSenderAccountNo()).get();
		Account receiverAcc = accRepo.findById(transInstance.getReceiverAccountNo()).get();
		String accNo = senderAcc.getAccountNo();
		Float balance = senderAcc.getBalance();

		if (balance - transInstance.getTransactionAmount() < 0) 
		{
			res = "This transaction is not possible due to insufficient funds!";
		} 
		else if (balance - transInstance.getTransactionAmount() < 1000)
		{
			res = "Transaction Successful  !!!\nNOTICE : Your balance is dropped below the Minimum Account Balance limit !";
			int rowsAffected = accRepo.updateBalance(accNo, transInstance.getTransactionAmount());
		}
		else 
		{
			int rowsAffected = accRepo.updateBalance(accNo, transInstance.getTransactionAmount());
			if(rowsAffected>0)
			{
				String result = "";
			
				Transaction transobj = new Transaction();
				transobj.setAmount(transInstance.getTransactionAmount());
				transobj.setDestinationAccount(senderAcc);
				transobj.setSourceAccount(senderAcc);
				transobj.setTimeStamp(transInstance.getTransactionDate());
				transobj.setTransactionType(transInstance.getTransactionType());

				Transaction obj = transRepo.save(transobj);
			}
			res = "Transaction successful  !!!";
		}
		return res;
	}

	public String updatePassword(String custId, String pass) {
		String res="";
		Customer cust = custRepo.findById(custId).get();
		if(cust==null)
		{
			res="Customer doesn't exist";
		}
		else
		{
			if(cust.getPassword()==pass)
			{
				res="Password matches with old password";
			}
			else
			{
				cust.setPassword(pass);
				int rowsAffected = custRepo.updatePassword(custId,pass);
				if(rowsAffected>0)
				{
					res="Passsword updated Succewssfully";
				}
				else
				{
					res="Try again to change password";
				}
			}
		}
		return res;
	}

}
