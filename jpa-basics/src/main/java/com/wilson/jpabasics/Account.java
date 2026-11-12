package com.wilson.jpabasics;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AccountType type;

    @Column(name = "opening_balance", nullable = false, precision = 15, scale = 2)
    private BigDecimal openingBalance;

    @Column(name = "opening_balance_date", nullable = false)
    private LocalDate openingBalanceDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "household_id", nullable = false)
    private Household household;

    protected Account() {
    }

    public Account(Household household, String name, AccountType type, BigDecimal openingBalance, LocalDate openingBalanceDate) {
        this.household = household;
        this.name = name;
        this.type = type;
        this.openingBalance = openingBalance;
        this.openingBalanceDate = openingBalanceDate;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AccountType getType() {
        return type;
    }

    public Household getHousehold() {
        return household;
    }

    public BigDecimal getOpeningBalance() {
        return openingBalance;
    }

    public void setOpeningBalance(BigDecimal openingBalance) {
        this.openingBalance = openingBalance;
    }

    public LocalDate getOpeningBalanceDate() {
        return openingBalanceDate;
    }

    public void setOpeningBalanceDate(LocalDate openingBalanceDate) {
        this.openingBalanceDate = openingBalanceDate;
    }

}
