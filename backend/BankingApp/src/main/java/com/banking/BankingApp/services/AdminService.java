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

    @Autowired
    CustomerRepository custRepo;

    @Autowired 
    AccountRepository accRepo;

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

    public String updateStatus(String custId, String status) {
		String res="";
		Customer cust = custRepo.findById(custId).get();
		if(cust==null)
		{
			res="Customer doesn't exist";
		}
		else
		{
			if(status.equals("disabled"))
			{
				res="Customer disabled";
			}
			else
			{
                res="Customer activated";
			}
            cust.setStatus(status);
			int rowsAffected = custRepo.updateStatus(custId,status);
		}
		return res;
	}

    public String updatePassword(String adminId, String pass) {
		String res="";
		Admin adm = adminRepo.findById(adminId).get();
		if(adm==null)
		{
			res="Admin doesn't exist";
		}
		else
		{
			if(adm.getPassword()==pass)
			{
				res="Password matches with old password";
			}
			else
			{
				adm.setPassword(pass);
				int rowsAffected = adminRepo.updatePassword(adminId,pass);
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

    public String updateAccountStatus(String accNo, String status) {
		String res="";
		Account acc = accRepo.findById(accNo).get();
		if(acc==null)
		{
			res="Account doesn't exist";
		}
		else
		{
			if(status.equals("disabled"))
			{
				res="Account disabled";
			}
			else
			{
                res="Account activated";
			}
            acc.setStatus(status);
			int rowsAffected = accRepo.updateAccountStatus(accNo,status);
		}
		return res;
	}
}
