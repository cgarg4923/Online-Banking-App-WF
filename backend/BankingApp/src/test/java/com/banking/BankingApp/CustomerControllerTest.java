// package com.banking.BankingApp;

// import static org.junit.jupiter.api.Assertions.assertEquals;

// import java.util.ArrayList;
// import java.util.Date;
// import java.util.List;

// import org.junit.Test;
// import org.junit.runner.RunWith;
// import org.mockito.ArgumentMatchers;
// import org.mockito.Mockito;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.MediaType;
// import org.springframework.test.context.junit4.SpringRunner;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.MvcResult;
// import org.springframework.test.web.servlet.RequestBuilder;
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

// import com.banking.BankingApp.dao.AddressRepository;
// import com.banking.BankingApp.dao.BenificiaryRepository;
// import com.banking.BankingApp.dao.CustomerRepository;
// import com.banking.BankingApp.dao.TransactionRepository;
// import com.banking.BankingApp.model.Account;
// import com.banking.BankingApp.model.Customer;
// import com.banking.BankingApp.services.CustomerService;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.fasterxml.jackson.databind.SerializationFeature;

// @RunWith(SpringRunner.class)
// @WebMvcTest
// public class CustomerControllerTest {
//     @Autowired
//     private MockMvc mvc;
    
//     @MockBean
//     private CustomerService custService;

//     @MockBean
//     private CustomerRepository custRepo;

//     @MockBean
//     private TransactionRepository transRepo;

//     @MockBean
//     private AddressRepository addRepo;

//     @MockBean
//     private BenificiaryRepository benRepo;

//     ObjectMapper mapper =new ObjectMapper().findAndRegisterModules().disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

//    /* @Test
//     public void testFetchAllUsers() throws Exception{
//         Customer cust=new Customer();
//         List<Account> accList=new ArrayList<>();
//         Account acc=new Account();
//         accList.add(acc);
//         cust.setCustomerId("123456");
//         cust.setPassword("admin1234");
//         cust.setAadharNumber("123456781234");
//         cust.setDateOfBirth(new Date());
//         cust.setAccountList(accList);
//         List<Customer> custList=new ArrayList<>();
//         custList.add(cust);
//         Mockito.when(custService.fetchAllCustomers()).thenReturn(custList);

//         System.out.println("test method");
//     //    mvc.perform(get("/customer/fetchAllCustomers").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk).andExpect(jsonPath("$",Matchers.hasSize(2))).andExpect(jsonPath("$[0].username",Matchers.equalTo(cust.getCustomerId())));
//     }*/

//     @Test
//     public void testSaveCustomer() throws Exception{
//     	System.out.println("test method called");
//         Customer cust=new Customer();
//         List<Account> accList=new ArrayList<>();
//         Account acc=new Account();
//         accList.add(acc);
//         cust.setCustomerId("123456");
//         cust.setPassword("admin1234");
//         cust.setAadharNumber("123456781234");
//         cust.setDateOfBirth(new Date());
//         cust.setAccountList(accList);
//         List<Customer> custList=new ArrayList<>();
//         custList.add(cust);
//         Mockito.when(custService.saveCustomer(ArgumentMatchers.any())).thenReturn(cust);
//         String json=mapper.writeValueAsString(cust);
//         RequestBuilder requestBuilder=MockMvcRequestBuilders.post("/customer/saveCustomerData").
       
//         		accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(json);
        
        
//         MvcResult result=mvc.perform(requestBuilder).andReturn();
        
//         int res=result.getResponse().getStatus();
//         assertEquals(res,HttpStatus.OK);
        
//     }
        
        
// }