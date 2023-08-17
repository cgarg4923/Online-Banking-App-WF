package com.banking.BankingApp.model;

public class WithdrawTransactionModel {
    String accountNumber ;
    String transactionType;
    Float transactionAmount;
    
    public String getAccountNumber() {
        return accountNumber;
    }
    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }
    public String getTransactionType() {
        return transactionType;
    }
    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }
    public Float getTransactionAmount() {
        return transactionAmount;
    }
    public void setTransactionAmount(Float transactionAmount) {
        this.transactionAmount = transactionAmount;
    }
    
}
