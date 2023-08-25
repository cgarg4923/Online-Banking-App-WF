package com.banking.BankingApp.exception;

import java.net.http.HttpHeaders;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler{
    //@Override
    @ResponseStatus(HttpStatus.BAD_REQUEST)
   // @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<Object> handleMethodArgumentNotValid(Exception ex,HttpHeaders headers,HttpStatus status, WebRequest request)
    {
        Map<String,Object> responseBody=new LinkedHashMap<>();
        responseBody.put("timestamp",new Date());
        responseBody.put("status",status.value());
        
        List<String> errors=((BindException) ex).getBindingResult().getFieldErrors().stream().map(x->x.getDefaultMessage()).collect(Collectors.toList());
        responseBody.put("errors",errors);
       // return new ResponseEntity<>(responseBody,headers,status);
       return new ResponseEntity<Object>(responseBody, status);
       
    }

    @ExceptionHandler(value=ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public @ResponseBody  ErrorResponse handleResourceNotFoundException(ResourceNotFoundException ex)
    {
        return new ErrorResponse(HttpStatus.NOT_FOUND.value(),ex.getMessage());
    }

    
    @ExceptionHandler(value=NoDataFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public @ResponseBody  ErrorResponse handleNoDataFoundException (NoDataFoundException ex)
    {
        return new ErrorResponse(HttpStatus.NOT_FOUND.value(),ex.getMessage());
    }

    
}
