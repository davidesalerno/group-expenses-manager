package net.davidesalerno.gem.commons.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Transaction {
    public enum Type {
        INVOICE, EXPENSE, PAYMENT
    }

    private Long id;

    private Long accountId;

    private BigDecimal amount;

    private String description;

    private Type type;

    private LocalDate date;

    public Transaction(Long id, Long accountId, BigDecimal amount, String description, Type type, LocalDate date) {
        this.id = id;
        this.accountId = accountId;
        this.amount = amount;
        this.description = description;
        this.type = type;
        this.date = date;
    }

    public Transaction() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
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

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
