package com.wilson.jpabasics;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {
        // Reads META-INF/persistence.xml, finds the unit named "jpa-basics",
        // starts Hibernate and opens the H2 database.
        try (EntityManagerFactory emf = Persistence.createEntityManagerFactory("jpa-basics")) {
//            System.out.println("Connected: " + emf.isOpen());
            try (EntityManager em = emf.createEntityManager()) {
                em.getTransaction().begin();
                Household household = new Household("Wilson Household");
                User user = new User(household, "john@example.com", "Wilson");
                Account account = new Account(household, "Wilson's Cash", AccountType.CASH, new BigDecimal("1000.00"), LocalDate.of(2026, 11, 1));

                em.persist(household);
                System.out.println("Before persist: " + household.getId());
                em.persist(user);
                em.persist(account);

                em.getTransaction().commit();

                System.out.println("After commit: " + household.getId());
            }
        }
    }
}