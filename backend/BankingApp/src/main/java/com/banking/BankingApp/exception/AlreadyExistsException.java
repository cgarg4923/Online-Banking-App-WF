package com.banking.BankingApp.exception;

public class AlreadyExistsException extends Exception {
    private String message;
    public AlreadyExistsException(String message)
    {
        super(message);
    }
    
}
