package com.wilson.jpabasics;

import jakarta.persistence.*;

@Entity                                  // "this class is a table"
@Table(name = "households")              // table name, as in the HLD
public class Household {

    @Id                                                   // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)   // database assigns it (auto-increment)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "time_zone", nullable = false, length = 50)
    private String timeZone = "Asia/Manila";

    protected Household() { }            // for Hibernate: it creates objects when reading rows

    public Household(String name) {
        this.name = name;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getTimeZone() { return timeZone; }
}
