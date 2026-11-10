package com.wilson.jpabasics;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class Main {

    public static void main(String[] args) {
        // Reads META-INF/persistence.xml, finds the unit named "jpa-basics",
        // starts Hibernate and opens the H2 database.
        try (EntityManagerFactory emf = Persistence.createEntityManagerFactory("jpa-basics")) {
            System.out.println("Connected: " + emf.isOpen());
        }
    }
}