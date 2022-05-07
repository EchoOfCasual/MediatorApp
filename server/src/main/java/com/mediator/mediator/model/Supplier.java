package com.mediator.mediator.model;

public class Supplier {
    private Float sellPrice;
    private Integer availableQuantity;

    public Supplier(Float sellPrice, Integer availableQuantity) {
        this.sellPrice = sellPrice;
        this.availableQuantity = availableQuantity;
    }

    public Float getSellPrice() {
        return sellPrice;
    }

    public void setSellPrice(Float sellPrice) {
        this.sellPrice = sellPrice;
    }

    public Integer getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(Integer availableQuantity) {
        this.availableQuantity = availableQuantity;
    }
}
