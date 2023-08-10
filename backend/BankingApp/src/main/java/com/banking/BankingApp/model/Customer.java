package com.banking.BankingApp.model;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
@Table(name="Customer_Data")
public class Customer {
	@Id
	@Column(name="cid")
	private Integer customerId;
	@OneToMany(mappedBy="customer",cascade=CascadeType.ALL)
	private List<Account> accountList;
	@Column(name="fname",length=20)
	private String firstName;
	@Column(name="lname",length=20)
	private String lastName;
	@Column(name="mname",length=20)
	private String middleName;
	@Column(name="email",length=20)
	private String emailId;
	@Column(name="contact")
	private Long phoneNumber;
	@Column(name="aadhar",nullable=false)
	private Long aadharNumber;
	@Column(name="DOB")
	private Date dateOfBirth;
	@Column(name="father",length=20)
	private String fatherName;
	@Column(name="password",length=20)
	private String pasword;
	@Column(name="last_logged")
	private Timestamp lastLoggedIn;
	public List<Address> getAddress() {
		return address;
	}
	public void setAddress(List<Address> address) {
		this.address = address;
	}
	@OneToMany(mappedBy="customer")
	private List<Address> address;
	
	public List<Account> getAccountList() {
		return accountList;
	}
	public void setAccountList(List<Account> accountList) {
		this.accountList = accountList;
	}
	public Integer getCustomerId() {
		return customerId;
	}
	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public Long getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(Long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public Long getAadharNumber() {
		return aadharNumber;
	}
	public void setAadharNumber(Long aadharNumber) {
		this.aadharNumber = aadharNumber;
	}
	public Date getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getFatherName() {
		return fatherName;
	}
	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}
	public String getPasword() {
		return pasword;
	}
	public void setPasword(String pasword) {
		this.pasword = pasword;
	}
	public Timestamp getLastLoggedIn() {
		return lastLoggedIn;
	}
	public void setLastLoggedIn(Timestamp lastLoggedIn) {
		this.lastLoggedIn = lastLoggedIn;
	}
	
}
