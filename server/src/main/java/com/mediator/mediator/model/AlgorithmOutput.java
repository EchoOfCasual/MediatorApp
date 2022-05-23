package com.mediator.mediator.model;

public class AlgorithmOutput {
    private Float profit;
    private Integer[][] optimalSellPathsTable;
    private int[][] costsTable;
    private float income;
    private float cost;

    public AlgorithmOutput(Float profit, Integer[][] optimalSellPathsTable, int[][] costsTable, float income, float cost) {
        this.profit = profit;
        this.optimalSellPathsTable = optimalSellPathsTable;
        this.costsTable = costsTable;
        this.income = income;
        this.cost = cost;
    }

    public int[][] getCostsTable() {
        return costsTable;
    }

    public void setCostsTable(int[][] costsTable) {
        this.costsTable = costsTable;
    }

    public float getIncome() {
        return income;
    }

    public void setIncome(float income) {
        this.income = income;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
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
