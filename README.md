# Expense Tracker

A phone-first household expense tracker: log an expense in under 10 seconds, see where the money
went this month, stay within budget, and never miss a loan, credit card or bill payment.

Built as a hands-on project to go deeper into Java, Spring Boot, JPA/Hibernate and Jakarta EE.

## Stack

- **Backend:** Java 25, Spring Boot 4.1 (Spring MVC, Spring Security 7, Spring Data JPA), Hibernate 7
- **Database:** MariaDB with Flyway migrations
- **Frontend:** React + Vite + TypeScript, phone-first web app
- **Tests:** JUnit 6, Mockito, Testcontainers
- **Hosting:** Docker Compose (Caddy, Spring Boot, MariaDB)

## Repository layout

| Folder | What it holds |
| --- | --- |
| `jpa-basics/` | A small console app exploring Hibernate without Spring |
| `backend/` | The Spring Boot REST API |
| `frontend/` | The React app |
| `deploy/` | Production Docker Compose, reverse proxy and backups |
| `design/figma-plugin/` | The Figma plugin that generated the first version of the screens |

## Status

In development. Folders appear as each part is built; how to run the app locally will be added with
the backend.
