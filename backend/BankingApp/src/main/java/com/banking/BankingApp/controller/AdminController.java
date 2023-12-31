package com.banking.BankingApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.dao.AccountRepository;
import com.banking.BankingApp.dto.TransactionProjection;
import com.banking.BankingApp.model.Admin;
import com.banking.BankingApp.model.Customer;
import com.banking.BankingApp.model.LoginModel;
import com.banking.BankingApp.model.WithdrawTransactionModel;
import com.banking.BankingApp.services.AccountService;
import com.banking.BankingApp.services.AdminService;
import com.banking.BankingApp.services.CustomerService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/admin")

public class AdminController {
    @Autowired
	AdminService adminService;

	@Autowired
	AccountService accService;
	
	@PostMapping("/saveAdminData")
	public Admin saveAdminData(@RequestBody Admin adm)
	{
		Admin admin = adminService.saveAdmin(adm);
		return admin;
	}

    @PostMapping("/validateAdminData")
	public String validateAdminData(@RequestBody LoginModel checkAdm)
	{
		String output = adminService.validateAdminCredentials(checkAdm);
		return output;
	}

	@GetMapping("/fetchStatement/{accountNo}")
	public List<TransactionProjection> fetchStatement(@PathVariable("accountNo") String accNo)
	{
		return adminService.fetchAccountStatement(accNo);
	}

	@PutMapping("/updateStatus/{customerId}/{status}")
	public String updateStatus(@PathVariable("customerId") String custId,@PathVariable("status") String status)
	{
		String result = adminService.updateStatus(custId,status);
		return result;
	}

	@PutMapping("/updateAccountStatus/{accountNo}/{status}")
	public String updateAccountStatus(@PathVariable("accountNo") String accNo,@PathVariable("status") String status)
	{
		String result = adminService.updateAccountStatus(accNo,status);
		return result;
	}

	@PutMapping("/updatePassword/{adminId}/{password}")
	public String updatePassword(@PathVariable("adminId") String adminId,@PathVariable("password") String pass)
	{
		String result = adminService.updatePassword(adminId,pass);
		return result;
	}

}
