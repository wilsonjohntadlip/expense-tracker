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
            Long accountId;
            Account detachedAccount;
            try (EntityManager em = emf.createEntityManager()) {
                em.getTransaction().begin();
                Household household = new Household("Wilson Household");
                User user = new User(household, "john@example.com", "Wilson");
                Account account = new Account(household, "Wilson's Cash", AccountType.CASH, new BigDecimal("1000.00"), LocalDate.of(2026, 11, 1));

                em.persist(household);
                System.out.println("After persist: " + household.getId());
                em.persist(user);
                em.persist(account);

                em.getTransaction().commit();

                accountId = account.getId();
                System.out.println("After commit Household id: " + household.getId());
                System.out.println("After commit User id: " + user.getId());
                System.out.println("After commit Account id: " + account.getId());
            }

            try (EntityManager em2 = emf.createEntityManager()) {
                Account found = em2.find(Account.class, accountId);
                if (found != null) {
                    System.out.println("Account Name: " + found.getName());
                    System.out.println("Opening Balance: " + found.getOpeningBalance());
                    System.out.println("Household Name: " + found.getHousehold().getName());
                } else {
                    System.out.println("Account not found.");
                }
            }

            try (EntityManager em3 = emf.createEntityManager()) {
                em3.getTransaction().begin();
                Account accountToUpdate = em3.find(Account.class, accountId);
                if (accountToUpdate != null) {
                    accountToUpdate.setName("GCash");
                    System.out.println("After setName (not saved yet): " + accountToUpdate.getName());
                }
                em3.getTransaction().commit();
            }

            try (EntityManager em4 = emf.createEntityManager()) {
                em4.getTransaction().begin();
                detachedAccount = em4.find(Account.class, accountId);
                em4.detach(detachedAccount);
                detachedAccount.setName("GCash Wallet");
                em4.getTransaction().commit();
            }

            try (EntityManager em5 = emf.createEntityManager()) {
                em5.getTransaction().begin();
                Account merged = em5.merge(detachedAccount);
                em5.getTransaction().commit();
                System.out.println("merged == detachedAccount: " + (merged == detachedAccount));
                System.out.println("merged.getName(): " + merged.getName());
            }

            try (EntityManager em6 = emf.createEntityManager()) {
                em6.getTransaction().begin();
                Account toRemove = em6.find(Account.class, accountId);
                em6.remove(toRemove);
                em6.getTransaction().commit();
            }

            try (EntityManager em7 = emf.createEntityManager()) {
                Account checkRemoved = em7.find(Account.class, accountId);
                if (checkRemoved == null) {
                    System.out.println("Account not found.");
                } else {
                    System.out.println("Account Name: " + checkRemoved.getName());
                }
            }

        }
    }
}