package com.banking.BankingApp.exception;

public class NegativeTransactionAmountException extends Exception {
    private String message;
    public NegativeTransactionAmountException(String message)
    {
        super(message);
    }
    
}
