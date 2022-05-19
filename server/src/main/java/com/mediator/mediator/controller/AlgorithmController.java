package com.mediator.mediator.controller;

import com.mediator.mediator.model.AlgorithmInput;
import com.mediator.mediator.model.AlgorithmOutput;
import com.mediator.mediator.service.AlgorithmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/algorithm")
public class AlgorithmController {

    private final AlgorithmService algorithmServie;

    @Autowired
    public AlgorithmController(AlgorithmService algorithmServiceArg)
    {
        algorithmServie = algorithmServiceArg;
    }

    @PostMapping
    public ResponseEntity<?> getAlgorithmOutput(@RequestBody AlgorithmInput algorithmInput)
    {
        try{
            return new ResponseEntity<AlgorithmOutput>(algorithmServie.doAlgorithm(algorithmInput), HttpStatus.OK);
        }
        catch (Exception exception){

            return new ResponseEntity<String>("It shouldnt occur " + exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
