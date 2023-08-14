package com.banking.BankingApp.model;

import java.math.BigInteger;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
@Table(name="Customer_Data")
public class Customer 
{
	@Id
	@Column(name="cid")
	private String customerId;
	
	@OneToMany(mappedBy="customer", cascade=CascadeType.ALL)
	private List<Account> accountList;


	@Column(name="fname", length=20, nullable = false)
	@NotBlank(message = "First Name cannot be blank")
	private String firstName;
	
	@Column(name="lname",length=20)
	private String lastName;
	
	@Column(name="mname",length=20)
	private String middleName;
	
	
	
	@Email
	@Column(name="email",length=20)
	private String emailId;

	@Size(min=10,max=10)
	@Column(name="contact")
	@Length(min=10, max=10, message = "Enter Valid 10 digit Mobile Number")
	private String phoneNumber;
	
	
	@NotNull(message = "Aadhar Number cannot be empty")
	@Length(min=12, max=12, message = "Enter valid 12 digit Aadhar Number")
	@Column(name="aadhar",nullable=false)
	private String aadharNumber;
	
	@NotNull(message = "Enter your Date Of Birth in YYYY-MM-DD format")
	@Column(name="DOB")
	private Date dateOfBirth;
	
	@NotNull(message = "Father's Name cannot be empty")
	@Column(name="father",length=20)
	private String fatherName;
	
	@Length(min=8, max=16, message = "Password Length must be between 8 and 16 characters")
	@Column(name="password",length=20)
	private String password;
	
	@Column(name="last_logged")
	private Timestamp lastLoggedIn;
	
	@Column(name="Occupation Type",length=20)
	private String occupationType;
	
	@Column(name="Source of Income",length=30)
	private String sourceOfIncome;
	
	@Min(0)
	@Column(name = "Annual Income")
	private Float grossAnnualIncome;
	
	public String getOccupationType() {
		return occupationType;
	}
	public void setOccupationType(String occupationType) {
		this.occupationType = occupationType;
	}
	public String getSourceOfIncome() {
		return sourceOfIncome;
	}
	public void setSourceOfIncome(String sourceOfIncome) {
		this.sourceOfIncome = sourceOfIncome;
	}
	public Float getGrossAnnualIncome() {
		return grossAnnualIncome;
	}
	public void setGrossAnnualIncome(Float grossAnnualIncome) {
		this.grossAnnualIncome = grossAnnualIncome;
	}
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
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
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
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getAadharNumber() {
		return aadharNumber;
	}
	public void setAadharNumber(String aadharNumber) {
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Timestamp getLastLoggedIn() {
		return lastLoggedIn;
	}
	public void setLastLoggedIn(Timestamp lastLoggedIn) {
		this.lastLoggedIn = lastLoggedIn;
	}
	
}
