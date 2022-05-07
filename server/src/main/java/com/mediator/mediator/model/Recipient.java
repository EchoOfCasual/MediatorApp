package com.mediator.mediator.model;

public class Recipient {
    private Float buyPrice;
    private Integer desiredQuantity;

    public Recipient(Float buyPrice, Integer desiredQuantity) {
        this.buyPrice = buyPrice;
        this.desiredQuantity = desiredQuantity;
    }

    public Float getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(Float buyPrice) {
        this.buyPrice = buyPrice;
    }

    public Integer getDesiredQuantity() {
        return desiredQuantity;
    }

    public void setDesiredQuantity(Integer desiredQuantity) {
        this.desiredQuantity = desiredQuantity;
    }
}
