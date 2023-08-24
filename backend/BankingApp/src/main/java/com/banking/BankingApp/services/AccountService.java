package com.banking.BankingApp.services;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.AccountRepository;
import com.banking.BankingApp.dao.BenificiaryRepository;
import com.banking.BankingApp.dao.CustomerRepository;
import com.banking.BankingApp.dao.TransactionRepository;
import com.banking.BankingApp.dto.TransactionProjection;
import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.model.Customer;
import com.banking.BankingApp.model.Transaction;
import com.banking.BankingApp.model.WithdrawTransactionModel;

import jakarta.transaction.Transactional;


@Service
public class AccountService {
	@Autowired 
	AccountRepository accRepo;
	
	@Autowired
	CustomerRepository custRepo;

	@Autowired
	TransactionRepository transRepo;

	@Autowired
	BenificiaryRepository benRepo;
	
	public String saveAccount(Account acc, String customerID)
	{
		Customer cust = custRepo.findById(customerID).get();
		acc.setCustomer(cust);
		
		String result = "";
		Account obj = accRepo.save(acc);
		if(obj != null)
		{
			result = "Account created Successfully!";
		}
		else 
		{
			result = "There is some problem with account creation!";
		}
		return result;
	}


	public List<TransactionProjection> fetchTransactions(String accNo,Date from,Date to) {
		return transRepo.findByTransactions(accNo,from,to);
	}

	
	public List<TransactionProjection> fetchStatement(String accNo) {
		return transRepo.fetchStatement(accNo);
	}

	@Transactional
	public String fundTransfer(WithdrawTransactionModel transInstance) 
	{
		String res = "";
		Account senderAcc = accRepo.findById(transInstance.getSenderAccountNo()).get();
		Account receiverAcc = accRepo.findById(transInstance.getReceiverAccountNo()).get();
		String senderAccNo = senderAcc.getAccountNo();
		String receiverAccNo= receiverAcc.getAccountNo();
		Float balance = senderAcc.getBalance();

		if (balance - transInstance.getTransactionAmount() < 0) 
		{
			res = "This transaction is not possible due to insufficient funds!";
		} 
		else if (balance - transInstance.getTransactionAmount() < 1000)
		{
			
			int rowsAffected = accRepo.updateSenderBalance(senderAccNo, transInstance.getTransactionAmount());
			int row_sAffected = accRepo.updateReceiverBalance(receiverAccNo, transInstance.getTransactionAmount());
			if(rowsAffected>0 && row_sAffected>0)
			{
				String result = "";
			
				Transaction transobj = new Transaction();
				transobj.setAmount(transInstance.getTransactionAmount());
				transobj.setDestinationAccount(receiverAcc);
				transobj.setSourceAccount(senderAcc);
				transobj.setTimeStamp(transInstance.getTransactionDate());
				transobj.setTransactionType(transInstance.getTransactionType());

				Transaction obj = transRepo.save(transobj);
			}
			res = "Transaction Successful  !!!\nNOTICE : Your balance is dropped below the Minimum Account Balance limit !";
		}
		else 
		{
			int rowsAffected = accRepo.updateSenderBalance(senderAccNo, transInstance.getTransactionAmount());
			int row_sAffected = accRepo.updateReceiverBalance(receiverAccNo, transInstance.getTransactionAmount());
			if(rowsAffected>0)
			{
				String result = "";
			
				Transaction transobj = new Transaction();
				transobj.setAmount(transInstance.getTransactionAmount());
				transobj.setDestinationAccount(receiverAcc);
				transobj.setSourceAccount(senderAcc);
				transobj.setTimeStamp(transInstance.getTransactionDate());
				transobj.setTransactionType(transInstance.getTransactionType());

				Transaction obj = transRepo.save(transobj);
			}
			res = "Transaction successful  !!!";
		}
		return res;
	}

	public List<Account> fetchProfileData(String accNo)
	{
		return accRepo.findByProfileData(accNo);
	}

	public String updatePassword(String accNo, String pass) {
		String res="";
		Account acc = accRepo.findById(accNo).get();
		if(acc==null)
		{
			res="Account doesn't exist";
		}
		else
		{
			if(acc.getTransactionPassword()==pass)
			{
				res="Password matches with old password";
			}
			else
			{
				acc.setTransactionPassword(pass);
				int rowsAffected = accRepo.updatePassword(accNo,pass);
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
