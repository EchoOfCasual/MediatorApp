package com.mediator.mediator.model;

public class AlgorithmOutput {
    private Float purchaseCosts;
    private Float transportationCosts;
    private Float profit;
    private Float income;
    private Integer[][] optimalSellPathsTable;


    public AlgorithmOutput(Float purchaseCosts, Float transportationCosts, Float profit, Float income, Integer[][] optimalSellPathsTable) {
        this.purchaseCosts = purchaseCosts;
        this.transportationCosts = transportationCosts;
        this.profit = profit;
        this.income = income;
        this.optimalSellPathsTable = optimalSellPathsTable;
    }

    public Float getPurchaseCosts() {
        return purchaseCosts;
    }

    public void setPurchaseCosts(Float purchaseCosts) {
        this.purchaseCosts = purchaseCosts;
    }

    public Float getTransportationCosts() {
        return transportationCosts;
    }

    public void setTransportationCosts(Float transportationCosts) {
        this.transportationCosts = transportationCosts;
    }

    public Float getProfit() {
        return profit;
    }

    public void setProfit(Float profit) {
        this.profit = profit;
    }

    public Float getIncome() {
        return income;
    }

    public void setIncome(Float income) {
        this.income = income;
    }

    public Integer[][] getOptimalSellPathsTable() {
        return optimalSellPathsTable;
    }

    public void setOptimalSellPathsTable(Integer[][] optimalSellPathsTable) {
        this.optimalSellPathsTable = optimalSellPathsTable;
    }
}
