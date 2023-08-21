package com.banking.BankingApp.dto;

import java.sql.Date;

public class TransactionProjection {
    String senderAccountNo;
    String receiverAccountNo;
    public TransactionProjection(String senderAccountNo, String receiverAccountNo, Date transactionDate,
            String transactionType, Float transactionAmount) {
        this.senderAccountNo = senderAccountNo;
        this.receiverAccountNo = receiverAccountNo;
        this.transactionDate = transactionDate;
        this.transactionType = transactionType;
        this.transactionAmount = transactionAmount;
    }
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
