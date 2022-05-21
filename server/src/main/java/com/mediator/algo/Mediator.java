package com.mediator.algo;

import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

public class Mediator {
    private int[] supply;
    private int[] demand;
    private Integer[][] distribution;
    private LinkedHashMap<Point2D, Integer> costs;
    private int[][] costsTable;
    private int profit;
    Integer[] alphas;
    Integer[] betas;

    public Mediator(int[][] costs, int[] supply, int[] demand) {
        int sumSupply = Arrays.stream(supply).sum();
        int sumDemand = Arrays.stream(demand).sum();

        if (sumSupply != sumDemand) {
            this.supply = Arrays.copyOf(supply, supply.length + 1);
            this.demand = Arrays.copyOf(demand, demand.length + 1);
            this.supply[supply.length] = sumDemand;
            this.demand[demand.length] = sumSupply;
            costsTable = new int[costs.length + 1][costs[0].length + 1];
            for (int i = 0; i < costsTable.length; i++) {
                for (int j = 0; j < costsTable[0].length; j++) {
                    if (j == costsTable[0].length - 1 || i == costsTable.length - 1)
                        costsTable[i][j] = 0;
                    else
                        costsTable[i][j] = costs[i][j];
                }
            }
        } else {
            this.supply = supply;
            this.demand = demand;
            costsTable = costs;
        }

        distribution = new Integer[costsTable.length][costsTable[0].length];
        this.costs = new LinkedHashMap<>();
        for (int i = 0; i < distribution.length; ++i) {
            for (int j = 0; j < distribution[0].length; ++j) {
                distribution[i][j] = null;
                this.costs.put(new Point2D(j, i), costsTable[i][j]);
            }
        }
        this.costs = MapUtil.sortByValue(this.costs);
    }

    public void calculate() {
        calculateDistribution();
        calculateProfit();
    }

    public Integer[][] getDistribution() {
        return distribution;
    }

    public int getProfit() {
        return profit;
    }

    private void calculateProfit() {
        profit = 0;
        for (int i = 0; i < costsTable.length; i++) {
            for (int j = 0; j < costsTable[0].length; j++) {
                if (distribution[i][j] != null)
                    profit += costsTable[i][j] * distribution[i][j];
            }
        }
    }

    private void calculateDistribution() {
        int sumSupply = Arrays.stream(supply).sum();
        int sumDemand = Arrays.stream(demand).sum();

        Iterator<Map.Entry<Point2D, Integer>> iterator = costs.entrySet().iterator();

        while (sumDemand != 0 && sumSupply != 0) {
            Map.Entry element = iterator.next();
            Point2D key = (Point2D) element.getKey();
            if (supply[key.getY()] == 0 || demand[key.getX()] == 0) {
                continue;
            } else if (supply[key.getY()] > demand[key.getX()]) {
                supply[key.getY()] -= demand[key.getX()];
                distribution[key.getY()][key.getX()] = demand[key.getX()];
                sumDemand -= demand[key.getX()];
                sumSupply -= demand[key.getX()];
                demand[key.getX()] = 0;
            } else if (supply[key.getY()] < demand[key.getX()]) {
                demand[key.getX()] -= supply[key.getY()];
                distribution[key.getY()][key.getX()] = supply[key.getY()];
                sumDemand -= supply[key.getY()];
                sumSupply -= supply[key.getY()];
                supply[key.getY()] = 0;
            } else {
                distribution[key.getY()][key.getX()] = supply[key.getY()];
                sumDemand -= supply[key.getY()];
                sumSupply -= supply[key.getY()];
                demand[key.getX()] = 0;
                supply[key.getY()] = 0;
            }
        }

        Point2D toOpt;
        while (true) {
            calculateAlphasAndBetas();
            Integer[][] optimalTable = calculateOptimalTable();
            toOpt = isOptimal(optimalTable);

            if (toOpt == null)
                break;

            optimizeDistribution(toOpt, optimalTable);
        }
    }

    private void optimizeDistribution(Point2D toOpt, Integer[][] optimalTable) {
        Point2D first = null; //minus
        Point2D second = null; //plus
        Point2D third = null; //minus
        for (int i = 0; i < optimalTable[0].length; i++) {
            if (optimalTable[toOpt.getY()][i] == null) {
                for (int j = 0; j < optimalTable.length; j++) {
                    if (j == toOpt.getY())
                        continue;

                    if (optimalTable[j][i] == null) {
                        if (optimalTable[j][toOpt.getX()] == null) {
                            first = new Point2D(i, toOpt.getY());
                            second = new Point2D(i, j);
                            third = new Point2D(toOpt.getX(), j);
                        }
                    }

                    if (first != null && second != null && third != null)
                        break;
                }
            }
        }
        int diff;
        if (distribution[first.getY()][first.getX()] < distribution[third.getY()][third.getX()]) {
            diff = distribution[first.getY()][first.getX()];
        } else {
            diff = distribution[third.getY()][third.getX()];
        }
        distribution[toOpt.getY()][toOpt.getX()] = diff;
        distribution[second.getY()][second.getX()] += diff;
        distribution[first.getY()][first.getX()] -= diff;
        distribution[third.getY()][third.getX()] -= diff;
    }

    private Integer[][] calculateOptimalTable() {
        Integer[][] optimalTable = new Integer[alphas.length][betas.length];
        for (int i = 0; i < costsTable.length; i++) {
            for (int j = 0; j < costsTable[0].length; j++) {
                if (distribution[i][j] != null) {
                    optimalTable[i][j] = null;
                    continue;
                }

                optimalTable[i][j] = costsTable[i][j] - alphas[i] - betas[j];
            }
        }
        return optimalTable;
    }

    private void calculateAlphasAndBetas() {
        alphas = new Integer[supply.length];
        betas = new Integer[demand.length];
        Arrays.fill(alphas, null);
        Arrays.fill(betas, null);
        alphas[0] = 0;

        while (!isFilledTable(alphas) || !isFilledTable(betas)) {
            for (int i = 0; i < alphas.length; i++) {
                if (alphas[i] != null) {
                    for (int j = 0; j < betas.length; j++) {
                        if (betas[j] != null)
                            continue;

                        if (distribution[i][j] == null)
                            continue;

                        betas[j] = costsTable[i][j] - alphas[i];
                    }
                }
            }

            for (int i = 0; i < betas.length; i++) {
                if (betas[i] != null) {
                    for (int j = 0; j < alphas.length; j++) {
                        if (alphas[j] != null)
                            continue;

                        if (distribution[j][i] == null)
                            continue;

                        alphas[j] = costsTable[j][i] - betas[i];
                    }
                }
            }
        }
    }

    private boolean isFilledTable(Integer[] table) {
        for (int i = 0; i < table.length; i++) {
            if (table[i] == null)
                return false;
        }
        return true;
    }

    private Point2D isOptimal(Integer[][] optimalTable) {
        Point2D toOpt = null;
        for (int i = 0; i < optimalTable.length; i++) {
            for (int j = 0; j < optimalTable[0].length; j++) {
                if (optimalTable[i][j] == null)
                    continue;

                if (optimalTable[i][j] > 0)
                    if (toOpt == null) {
                        toOpt = new Point2D(j, i);
                    } else {
                        if (optimalTable[i][j] > optimalTable[toOpt.getY()][toOpt.getX()])
                            toOpt = new Point2D(j, i);
                    }
            }
        }
        return toOpt;
    }
}
