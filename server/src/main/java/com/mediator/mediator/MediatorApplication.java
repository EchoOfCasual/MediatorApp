package com.mediator.mediator;

import com.mediator.mediator.controller.AlgorithmController;
import com.mediator.mediator.service.AlgorithmService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class MediatorApplication {

	public static void main(String[] args)
	{
		SpringApplication.run(MediatorApplication.class, args);
	}

}
