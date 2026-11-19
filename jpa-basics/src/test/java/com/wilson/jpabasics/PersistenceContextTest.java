package com.wilson.jpabasics;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import org.hibernate.SessionFactory;
import org.hibernate.stat.Statistics;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;

import java.math.BigDecimal;
import java.time.LocalDate;

class PersistenceContextTest {

    private static EntityManagerFactory emf;
    private static Statistics stats;
    private Long accountId;

    @BeforeAll
    static void openFactory() {
        emf = Persistence.createEntityManagerFactory("jpa-basics");
        stats = emf.unwrap(SessionFactory.class).getStatistics();
    }

    @AfterAll
    static void closeFactory() {
        emf.close();
    }

    @BeforeEach
    void saveAccount() {
        try (EntityManager em = emf.createEntityManager()) {
            em.getTransaction().begin();
            Household household = new Household("Wilson Household");
            Account account = new Account(household, "Wilson's Cash", AccountType.CASH, new BigDecimal("1000.00"), LocalDate.of(2026, 11, 1));
            em.persist(household);
            em.persist(account);
            em.getTransaction().commit();
            accountId = account.getId();
        }
        stats.clear();
    }

    @Test
    void sameRowTwice_oneEntityManager_runsOneSelect() {
        try (EntityManager em = emf.createEntityManager()) {
            Account first = em.find(Account.class, accountId);
            Account second = em.find(Account.class, accountId);
            assertSame(first, second);
        }
        assertEquals(1, stats.getPrepareStatementCount());
    }

}