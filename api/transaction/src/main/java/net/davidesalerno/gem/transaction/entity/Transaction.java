package net.davidesalerno.gem.transaction.entity;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction extends PanacheEntity{

    @Column(name = "account_id")
    private Long accountId;

    private BigDecimal amount;

    private String description;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Temporal(TemporalType.DATE)
    private LocalDate date;


    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getAccountId() {
        return accountId;
    }

    public Type getType() {
        return type;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public void setType(Type type) {
        this.type = type;
    }
}
