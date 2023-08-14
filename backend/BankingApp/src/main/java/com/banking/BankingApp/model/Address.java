package com.banking.BankingApp.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Address_Data")
public class Address {
	@Id
	@Column(name = "addressID")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer addressId;
	@Column(name="Address 1",length=40)
	private String addressLine1;
	@Column(name="Address 2",length=40)
	private String addressLine2;
	@Column(name="State",length=20)
	private String state;
	@Column(name="City",length=20)
	private String city;
	@Column(name="Pincode")
	private Integer pincode;
	@Column(name="Type")
	private String addressType;
	
	public String getAddressLine1() {
		return addressLine1;
	}
	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}
	public String getAddressLine2() {
		return addressLine2;
	}
	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public Integer getPincode() {
		return pincode;
	}
	public void setPincode(Integer pincode) {
		this.pincode = pincode;
	}
	public String getAddressType() {
		return addressType;
	}
	public void setAddressType(String addressType) {
		this.addressType = addressType;
	}
	
}
