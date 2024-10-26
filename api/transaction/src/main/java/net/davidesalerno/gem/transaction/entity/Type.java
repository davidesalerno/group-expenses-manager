package net.davidesalerno.gem.transaction.entity;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

public enum Type {
    INVOICE,EXPENSE,PAYMENT
}
