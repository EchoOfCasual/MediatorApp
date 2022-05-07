package com.mediator.mediator.service;

import com.mediator.mediator.model.AlgorithmInput;
import com.mediator.mediator.model.AlgorithmOutput;
import org.springframework.stereotype.Service;

@Service
public class AlgorithmService {

    public AlgorithmOutput doAlgorithm(AlgorithmInput algorithmInput){

        //Here the algorithm should be used

        //================================= testing random values =================================
        Float purchaseCosts = 10000.0f;
        Float transportationCosts = 21.37f;
        Float profit = 910000.0f;
        Float income = 4200000.0f;

        Integer[][] optimalSellPathsTable = {{1,2,3},{4,5,6}};

        AlgorithmOutput algorithmOutput = new AlgorithmOutput(purchaseCosts, transportationCosts, profit, income, optimalSellPathsTable);
        //================================= end of testing =================================


        return algorithmOutput;
    }
}
