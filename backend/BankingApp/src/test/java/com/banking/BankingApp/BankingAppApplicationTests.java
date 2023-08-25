package com.banking.BankingApp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
@ComponentScan({"com"})
@SpringBootTest(classes=com.banking.BankingApp.CustomerControllerTest.class)
class BankingAppApplicationTests {

	@Test
	void contextLoads() {
	}

}
