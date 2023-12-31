package com.banking.BankingApp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.banking.BankingApp.model.Admin;
import com.banking.BankingApp.model.Customer;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin,String> {
    @Modifying
    @Transactional 
	@Query("update Admin adm set adm.password=?2 where adm.adminId=?1 ")
    public int updatePassword(String admId, String pass);
}
