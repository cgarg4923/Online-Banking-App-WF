package com.banking.BankingApp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.AccountRepository;
import com.banking.BankingApp.dao.BenificiaryRepository;
import com.banking.BankingApp.dao.CustomerRepository;
import com.banking.BankingApp.dao.TransactionRepository;
import com.banking.BankingApp.exception.AlreadyExistsException;
import com.banking.BankingApp.exception.NegativeTransactionAmountException;
import com.banking.BankingApp.exception.NoDataFoundException;
import com.banking.BankingApp.exception.ResourceNotFoundException;
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

	public Customer saveCustomer(Customer cust)  throws AlreadyExistsException {
		Customer customer=custRepo.findByAadhar(cust.getAadharNumber());
		if(customer!=null)
		{
			throw new AlreadyExistsException("Customer with given aadhar already exists, Please contact admin");
		}
		Customer obj = custRepo.save(cust);
		return obj;
	}

	public String validateCustomerCredentials(LoginModel checkCust) throws ResourceNotFoundException {
		String result = "";
		Customer cust = custRepo.findById(checkCust.getCustomerId()).orElse(null);

		//Optional<Customer> obj = custRepo.findById(checkCust.getCustomerId());

		// if (obj.isPresent()) {
		// 	cust = obj.get();
		// }

		if (cust == null) {
			throw new  ResourceNotFoundException("Customer not found");
		} 
		else {
			if(cust.getStatus().equals("disabled"))
			{
				result="Account disabled login not allowed "+"\n"+"Please contact admin";
			}
			else{
				if (checkCust.getPassword().equals(cust.getPassword())) {
					result = "LOGGED IN SUCCESSFULLY !!";
				} 
				else {
					result = "INCORRECT PASSWORD, TRY AGAIN !!! ";
				}
			}
		}

		return result;
	}

	public List<String> fetchAccounts(String custId) throws NoDataFoundException {
		List<String> accountList=accRepo.findByAccounts(custId);
		if(accountList.size()==0)
		{
			throw new NoDataFoundException("No accounts exist");
		}
		List<String> accList=new ArrayList<>();
		for(String str:accountList)
			{
			  	Account acc=accRepo.findById(str).get();
				String status=acc.getStatus(); 
				if(status.equals("active"))
				{
					accList.add(str);
				}
			}
		return accList;
	}

	
	public List<String> fetchBenificiary(String custId) throws ResourceNotFoundException {
		List<String> benList= benRepo.fetchBenificiary(custId);
		if(benList.size()==0)
		{
			throw new ResourceNotFoundException("No benificiary accounts added");
		}
		return benList;
	}

	public List<Customer> fetchProfileData(String custId)
	{
		return custRepo.findByProfileData(custId);
	}

	@Transactional
	public String withdrawTransaction(WithdrawTransactionModel transInstance) throws NegativeTransactionAmountException
	{
		if(transInstance.getTransactionAmount()<0)
		{
			throw new NegativeTransactionAmountException("Transaction amount can't be negative");
		}
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

	public List<Customer> fetchAllCustomers() throws NoDataFoundException{
		List<Customer> custList=custRepo.findAll();
		if(custList.size()==0)
		{
			throw new NoDataFoundException("No customers exist");
		}
		return custList;
	}

}
