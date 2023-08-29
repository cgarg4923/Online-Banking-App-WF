package com.banking.BankingApp;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hamcrest.Matchers;
import org.junit.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.banking.BankingApp.dao.AccountRepository;
import com.banking.BankingApp.dao.AddressRepository;
import com.banking.BankingApp.dao.AdminRepository;
import com.banking.BankingApp.dao.BenificiaryRepository;
import com.banking.BankingApp.dao.CustomerRepository;
import com.banking.BankingApp.dao.TransactionRepository;
import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.model.Address;
import com.banking.BankingApp.model.Admin;
import com.banking.BankingApp.model.Benificiary;
import com.banking.BankingApp.model.Customer;
import com.banking.BankingApp.services.CustomerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;


//@RunWith(SpringRunner.class)
//@WebMvcTest
public class AdminControllerTest extends BankingAppApplicationTests{
  /*  @Autowired
    private MockMvc mvc;
    
    @MockBean
    private CustomerService custService;

    @MockBean
    private CustomerRepository custRepo;

    @MockBean
    private TransactionRepository transRepo;

    @MockBean
    private AddressRepository addRepo;

    @MockBean
    private BenificiaryRepository benRepo;
   

   
    
    @MockBean
    private AccountRepository accRepo;
    
    @MockBean
    private AdminRepository adminRepo;

    ObjectMapper mapper =new ObjectMapper().findAndRegisterModules().disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);*/

//    @Test
//    public void testFetchAllUsers() throws Exception{
//        Customer cust=new Customer();
//        List<Account> accList=new ArrayList<>();
//        Account acc=new Account();
//        accList.add(acc);
//        cust.setCustomerId("123456");
//        cust.setPassword("admin1234");
//        cust.setAadharNumber("123456781234");
//        cust.setDateOfBirth(new Date());
//        cust.setAccountList(accList);
//        List<Customer> custList=new ArrayList<>();
//        custList.add(cust);
//        Mockito.when(custService.fetchAllCustomers()).thenReturn(custList);
//
//        System.out.println("test method");
//    //    mvc.perform(get("/customer/fetchAllCustomers").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk).andExpect(jsonPath("$",Matchers.hasSize(2))).andExpect(jsonPath("$[0].username",Matchers.equalTo(cust.getCustomerId())));
//    }

    @Test
    public void testSaveAdmin() throws Exception{
    	Admin adm=new Admin();
        adm.setAdminId("123456");
        adm.setPassword("admin1234");
        List<Admin> adminList=new ArrayList<>();
        adminList.add(adm);
        Mockito.when(adminService.saveAdmin(ArgumentMatchers.any())).thenReturn(adm);
        String json=mapper.writeValueAsString(adm);
        MvcResult requestResult=mvc.perform(MockMvcRequestBuilders.post("/admin/saveAdminData").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8").content(json)
        		.accept(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
      // String result=requestResult.getResponse().getContentAsString();
       // assertEquals(result,"User inserted");
       
    }

	/*@Test
    public void testFetchCustomer() throws Exception {
        Customer cust=new Customer();
        List<Account> accList=new ArrayList<>();
        List<Address> addList=new ArrayList<>();
        Address add=new Address();
        List<Benificiary> benList=new ArrayList<>();
        Benificiary ben=new Benificiary();
        Account acc=new Account();
        accList.add(acc);
        addList.add(add);
        benList.add(ben);
        cust.setCustomerId("123456");
        cust.setPassword("admin1234");
        cust.setAadharNumber("123456781234");
        cust.setFatherName("Bk");
        cust.setFirstName("raj");
        cust.setEmailId("abc@gmail.com");
        cust.setAddress(addList);
        cust.setBenificiaryAccount(benList);
        cust.setDateOfBirth(new Date());
        cust.setAccountList(accList);
        List<Customer> custList=new ArrayList<>();
        custList.add(cust);
        Mockito.when(custService.fetchAllCustomers()).thenReturn(custList);
        
        mvc.perform(MockMvcRequestBuilders.get("/customer/fetchAllCustomers").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
        		.accept(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isOk()).
        andExpect(MockMvcResultMatchers.jsonPath("$[0].customerId", Matchers.equalTo(cust.getCustomerId())));
        
        
//         String json=mapper.writeValueAsString(cust);
      // mvc.perform((RequestBuilder) ((ResultActions) MockMvcRequestBuilders.get("/customer/fetchAllCustomers").contentType(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$",Matchers.hasSize(1))).
        //		andExpect(MockMvcResultMatchers.jsonPath("$[0].customerId", Matchers.equalTo(cust.getCustomerId()))));
     //  String result=requestResult.getResponse().getContentAsString();
       // assertEquals(result,"User inserted");
        
       
    }*/

}

