package com.banking.BankingApp;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.banking.BankingApp.dao.AccountRepository;
import com.banking.BankingApp.dao.AddressRepository;
import com.banking.BankingApp.dao.AdminRepository;
import com.banking.BankingApp.dao.BenificiaryRepository;
import com.banking.BankingApp.dao.CustomerRepository;
import com.banking.BankingApp.dao.TransactionRepository;
import com.banking.BankingApp.services.AccountService;
import com.banking.BankingApp.services.AdminService;
import com.banking.BankingApp.services.CustomerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
@ComponentScan({"com"})
//@SpringBootTest(classes=com.banking.BankingApp.CustomerControllerTest.class)
//@SpringBootTest
@RunWith(SpringRunner.class)
@WebMvcTest
class BankingAppApplicationTests {

	  @Autowired
	    protected MockMvc mvc;
	    
	    @MockBean
	    protected CustomerService custService;
	    
	    @MockBean
	    protected AdminService adminService;
	    
	    @MockBean
	    protected AccountService accService;

	    @MockBean
	    private CustomerRepository custRepo;

	    @MockBean
	    protected TransactionRepository transRepo;

	    @MockBean
	    protected AddressRepository addRepo;

	    @MockBean
	    protected BenificiaryRepository benRepo;
	    
	    @MockBean
	    protected AccountRepository accRepo;
	    
	    @MockBean
	    protected AdminRepository adminRepo;

	    ObjectMapper mapper =new ObjectMapper().findAndRegisterModules().disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);


	@Test
	void contextLoads() {
	}
	
	
	/*@Test
    public void testSaveCustomer() throws Exception{
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
        Mockito.when(custService.saveCustomer(ArgumentMatchers.any())).thenReturn(cust);
        String json=mapper.writeValueAsString(cust);
       mvc.perform(MockMvcRequestBuilders.post("/customer/saveCustomerData").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8").content(json)
        		.accept(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
     //  String result=requestResult.getResponse().getContentAsString();
       // assertEquals(result,"User inserted");
       
    }*/

//	@Test
//    public void testFetchAllAccounts() throws Exception{
//        Account acc = new Account ();
//        List<Account> accList=new ArrayList<>();
//        
//        List<Transaction> transList=new ArrayList<>();
//        Transaction trans=new Transaction();
//        transList.add(trans);
//        
//        Customer cust = new Customer();
//        
//        acc.setAccountNo("1234567891");
//        acc.setAccountType("savings");
//        acc.setBalance((float) 2543.0);
//        acc.setCustomer(cust);
//        acc.setStatus("disabled");
//        acc.setTransaction(transList);
//        acc.setTransactionPassword("admin123");
//        
//        accList.add(acc);
//        
//       
//
//        Mockito.when(custService.fetch(ArgumentMatchers.anystring())).thenReturn(cust);
//        String json=mapper.writeValueAsString(cust);
//      MvcResult requestResult =  mvc.perform(MockMvcRequestBuilders.get("/customer/fetchCustomerAccounts/{}").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8").content(json)
//        		.accept(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
//       String result=requestResult.getResponse().getContentAsString();
//        assertEquals(result,"Account fetched");
       
//    }
	
	//In get method for fetchAllCustomers we are getting some errors in the test class, could you please check it out 
	
	
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
