package com.mediator.mediator.controller;

import com.mediator.mediator.model.AlgorithmInput;
import com.mediator.mediator.model.AlgorithmOutput;
import com.mediator.mediator.service.AlgorithmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/algorithm")
public class AlgorithmController {

    private final AlgorithmService algorithmServie;

    @Autowired
    public AlgorithmController(AlgorithmService algorithmServiceArg)
    {
        algorithmServie = algorithmServiceArg;
    }

    @GetMapping
    public ResponseEntity<?> getAlgorithmOutput(@RequestBody AlgorithmInput algorithmInput)
    {
        try{
            return new ResponseEntity<AlgorithmOutput>(algorithmServie.doAlgorithm(algorithmInput), HttpStatus.OK);
        }
        catch (Exception exception){

            return new ResponseEntity<String>("It shouldnt occur", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
