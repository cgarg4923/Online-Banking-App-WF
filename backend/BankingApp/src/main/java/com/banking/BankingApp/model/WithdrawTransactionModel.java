package com.banking.BankingApp.model;

import java.sql.Date;

public class WithdrawTransactionModel 
{
    String senderAccountNo;
    String receiverAccountNo;
    Date transactionDate;
    String transactionType;
    Float transactionAmount;
    
    public String getSenderAccountNo() {
        return senderAccountNo;
    }
    public void setSenderAccountNo(String senderAccountNo) {
        this.senderAccountNo = senderAccountNo;
    }
    public String getReceiverAccountNo() {
        return receiverAccountNo;
    }
    public void setReceiverAccountNo(String receiverAccountNo) {
        this.receiverAccountNo = receiverAccountNo;
    }
    public Date getTransactionDate() {
        return transactionDate;
    }
    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
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
