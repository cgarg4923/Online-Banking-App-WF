package com.banking.BankingApp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.banking.BankingApp.model.Address;

public interface AddressRepository extends JpaRepository<Address,Integer>{

}
