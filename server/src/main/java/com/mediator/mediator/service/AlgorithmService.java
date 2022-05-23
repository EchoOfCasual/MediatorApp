package com.mediator.mediator.service;

import com.mediator.algo.Mediator;
import com.mediator.mediator.model.AlgorithmInput;
import com.mediator.mediator.model.AlgorithmOutput;
import org.springframework.stereotype.Service;

@Service
public class AlgorithmService {

    public AlgorithmOutput doAlgorithm(AlgorithmInput algorithmInput){

        int[] supply = new int[algorithmInput.getSupplierTable().length];
        int[] demand = new int[algorithmInput.getRecipientTable().length];
        for(int i = 0; i < supply.length; i++) {
            supply[i] = algorithmInput.getSupplierTable()[i].getAvailableQuantity();
        }
        for(int i = 0; i < demand.length; i++) {
            demand[i] = algorithmInput.getRecipientTable()[i].getDesiredQuantity();
        }
        int[][] profitTable = new int[supply.length][demand.length];
        for(int i = 0; i < supply.length; i++) {
            for(int j = 0; j < demand.length; j++) {
                profitTable[i][j] = (int)(algorithmInput.getRecipientTable()[j].getBuyPrice() - algorithmInput.getSupplierTable()[i].getSellPrice() - algorithmInput.getTransportaionCostsTable()[i][j]);
            }
        }
        Mediator mediator = new Mediator(profitTable, supply, demand);
        mediator.calculate();

        float income = 0;
        float cost = 0;
        Integer dist[][] = mediator.getDistribution();

        for(int i = 0; i < supply.length; i++) {
            for(int j = 0; j < demand.length; j++) {
                if(dist[i][j] == null)
                    continue;

                income += dist[i][j] * algorithmInput.getRecipientTable()[j].getBuyPrice();
                cost += dist[i][j] * algorithmInput.getSupplierTable()[i].getSellPrice() + algorithmInput.getTransportaionCostsTable()[i][j] * dist[i][j];
            }
        }

        AlgorithmOutput algorithmOutput = new AlgorithmOutput(Float.valueOf(mediator.getProfit()), mediator.getDistribution(), profitTable, income, cost);

        return algorithmOutput;
    }
}
