# Kota Skillz - Progress Checklist

## 📖 Backend Bibles Ingestion
- [x] Designing Data-Intensive Applications (DDIA)
    - [x] Foundation (Ch. 1-4)
    - [x] Distributed Data (Ch. 5-9)
    - [x] Derived Data (Ch. 10-12)
- [x] Building Microservices (Sam Newman)
    - [x] Service Boundaries & Bounded Contexts (Ch. 1-3)
    - [x] Service Communication & Integration (Ch. 4)
    - [x] Splitting Monoliths (Ch. 5)
- [/] Ingest Literature & Synthesize Heuristics
    - [x] Clean Code (Ch. 1-14)
    - [x] The Pragmatic Programmer (Ch. 1-8)
    - [x] Clean Architecture (Parts I-VI)
    - [x] Designing Data-Intensive Applications (Ch. 1-7 covered, next: Ch. 8 Distributed Systems)
    - [/] Operating Systems: Three Easy Pieces (Ch. 1-4 covered, next: Ch. 5 CPU Scheduling)
    - [/] Building Microservices (Ch. 1-4 & 11 covered)
    - [/] System Design Interview (Ch. 1-4 covered)
- [/] Ingest UX/Frontend Bibles
    - [ ] Don't Make Me Think (Steve Krug)
    - [ ] The Design of Everyday Things (Don Norman)
    - [ ] Refactoring UI (Adam Wathan & Steve Schoger)

## 🏗️ Knowledge Base Synthesis
- [x] Perform Clean Code Audit on `skeleton/`
- [x] Industrialize Skeleton Backend
    - [x] Implement `Result<T, E>` pattern for Domain/Application layers
    - [x] Add Structured Logging (ConsoleLogger)
    - [x] Enhance Validation (Design by Contract)
    - [x] Implement Custom Error Hierarchy
    - [x] Add Performance Metrics Hooks (Logging meta)
- [/] Backend System Design Synthesis (Final Design)
- [ ] wallet integration logic (Planned)
- [x] Core Data Patterns (SSI, Linearizability, Quorums)
- [x] Resiliency Patterns (Fencing, Monotonic Clocks)
- [x] Stream Patterns (CDC, Event Sourcing)
- [x] Integration Patterns (Choreography, BFF)
- [x] Deployment Patterns (Immutable Servers, Blue/Green)
- [x] Architecture Patterns (CQRS, Service Discovery, Fan-out, CDN)
- [ ] Observability & Monitoring Patterns
- [ ] Security & IAM Patterns

## 🛠️ Tooling & Infrastructure
- [x] PDF to Text Pipeline
- [x] Pattern Extraction Template
- [x] CLI Wrapper (`kota.sh`)

## Last Known Context
- **Current Objective**: Creating the Industrial Backend Template (Synthesis Stage).
