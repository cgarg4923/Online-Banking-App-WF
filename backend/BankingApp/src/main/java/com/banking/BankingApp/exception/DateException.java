package com.banking.BankingApp.exception;

public class DateException extends Exception {
    private String message;
    public DateException(String message)
    {
        super(message);
    }
    
}
