package com.mediator.mediator.model;

public class AlgorithmInput {
    private Supplier[] supplierTable;
    private Recipient[] recipientTable;
    private Integer[][] transportaionCostsTable;

    public AlgorithmInput(Supplier[] supplierTable, Recipient[] recipientTable, Integer[][] transportaionCostsTable) {
        this.supplierTable = supplierTable;
        this.recipientTable = recipientTable;
        this.transportaionCostsTable = transportaionCostsTable;
    }

    public Supplier[] getSupplierTable() {
        return supplierTable;
    }

    public void setSupplierTable(Supplier[] supplierTable) {
        this.supplierTable = supplierTable;
    }

    public Recipient[] getRecipientTable() {
        return recipientTable;
    }

    public void setRecipientTable(Recipient[] recipientTable) {
        this.recipientTable = recipientTable;
    }

    public Integer[][] getTransportaionCostsTable() {
        return transportaionCostsTable;
    }

    public void setTransportaionCostsTable(Integer[][] transportaionCostsTable) {
        this.transportaionCostsTable = transportaionCostsTable;
    }
}
