package com.mediator.mediator.model;

public class AlgorithmOutput {
    private Float profit;
    private Integer[][] optimalSellPathsTable;


    public AlgorithmOutput(Float profit, Integer[][] optimalSellPathsTable) {
        this.profit = profit;
        this.optimalSellPathsTable = optimalSellPathsTable;
    }

    public Float getProfit() {
        return profit;
    }

    public void setProfit(Float profit) {
        this.profit = profit;
    }

    public Integer[][] getOptimalSellPathsTable() {
        return optimalSellPathsTable;
    }

    public void setOptimalSellPathsTable(Integer[][] optimalSellPathsTable) {
        this.optimalSellPathsTable = optimalSellPathsTable;
    }
}
