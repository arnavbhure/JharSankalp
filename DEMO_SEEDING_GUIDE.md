# JharSankalp Development & Demo Data Seeding Guide

This guide details the realistic, Jharkhand-focused demonstration dataset created for **JharSankalp** (Jharkhand State Multi-Stakeholder Innovation & Civic Resolution Exchange).

---

## 1. How to Run the Seed

The seeding script uses Prisma ORM and is completely **safe to rerun (idempotent)** without destroying existing user or challenge data. It uses deterministic identifiers and `upsert` operations.

### Quick Execution
From the project root:

```bash
# Using npm
npm run db:seed

# Or directly with npx prisma
npx prisma db seed
```

### Prerequisites
- PostgreSQL service running (default `localhost:5432`)
- Database connection string in `.env` (`DATABASE_URL=postgresql://...`)

---

## 2. Demo User Accounts

All demo accounts share the standard development password:
> **Password**: `password123`

| Persona | Name | Email | Role | Organization / District |
| :--- | :--- | :--- | :--- | :--- |
| **Citizen (Water)** | Kavita Munda | `kavita.munda@jharsankalp.in` | `CITIZEN` | Murhu Jal Sahiya Collective (Khunti) |
| **Citizen (Education)** | Birsa Soren | `birsa.soren@jharsankalp.in` | `CITIZEN` | Shikaripara Gram Pradhan (Dumka) |
| **University (IoT/Telemetry)** | Prof. Anand Verma | `anand.verma@bitmesra.ac.in` | `UNIVERSITY` | BIT Mesra (Ranchi) |
| **University (Agritech)** | Dr. Sudhir Sahay | `sudhir.sahay@bauranchi.org` | `UNIVERSITY` | Birsa Agricultural University (Ranchi / Gumla) |
| **University (Geophysics)** | Dr. Amitava Roy | `amitava.roy@iitism.ac.in` | `UNIVERSITY` | IIT (ISM) Dhanbad (Dhanbad) |
| **Government (Block Admin)** | Dr. Rajesh Kumar | `rajesh.ias@jharkhand.gov.in` | `GOVERNMENT` | Block Development Officer (Murhu, Khunti) |
| **Government (State Council)**| Smt. Ananya Sen, IAS | `ananya.sen@jharkhand.gov.in` | `GOVERNMENT` | State Technical Education Innovation Council |
| **Industry Partner (CSR)** | Sanjay Oraon | `sanjay.oraon@tatasteel.com` | `INDUSTRY` | Tata Steel Rural Development Society (TSRDS) |
| **Industry Partner (Mining)** | Vikas Agarwal | `vikas.agarwal@ccl.gov.in` | `INDUSTRY` | Central Coalfields Limited (CCL Dhanbad) |
| **System Administrator** | IT Mission Admin | `admin@jharsankalp.in` | `SUPER_ADMIN`| Jharkhand State IT Mission / Innovation Exchange |

*(Note: `admin@jharsankalp.gov.in` is also seeded with identical super-admin privileges as an official govt domain alias).*

---

## 3. What Each Account Demonstrates

The accounts demonstrate distinct touchpoints and workflows across the entire civic innovation lifecycle:

### 1. Kavita Munda (`kavita.munda@jharsankalp.in`) — Grassroots Citizen Reporter
- **Demonstrates**: Frontline citizen identification of infrastructure breakdowns.
- **Storyline**: Sahiya water caretaker in Murhu block, Khunti. She submitted challenge **JS-2026-00024** regarding 14 defunct handpumps, attached groundwater fluoride lab reports, and received real-time SMS/platform notifications when BIT Mesra's IoT pilot was approved.

### 2. Birsa Soren (`birsa.soren@jharsankalp.in`) — Tribal Educator & Gram Pradhan
- **Demonstrates**: Indigenous language preservation and rural education advocacy.
- **Storyline**: Village head in Dumka who raised challenge **JS-2026-00014** regarding the lack of Santhali mother-tongue digital learning in non-electrified schools. Collaborates with local tech NGOs on solar micro-servers.

### 3. Prof. Anand Verma (`anand.verma@bitmesra.ac.in`) — University Researcher
- **Demonstrates**: Academic R&D applied to verified public challenges.
- **Storyline**: Director of BIT Mesra's Rural Telemetry Lab. Discovered Murhu's water challenge, submitted the idea for *Smart Handpump Vibration Telemetry* (TRL-6), formed a collaborative consortium with Tata Steel and Murhu Jal Sahiya, and tracks hardware telemetry milestones.

### 4. Dr. Sudhir Sahay (`sudhir.sahay@bauranchi.org`) — Agricultural Scientist
- **Demonstrates**: Extension science bridging academic research and smallholder farmers.
- **Storyline**: Agronomist at Birsa Agricultural University who submitted a portable optical soil spectrometer and decentralized cold-room design for Gumla tribal farmers (**JS-2026-00019**).

### 5. Dr. Amitava Roy (`amitava.roy@iitism.ac.in`) — Geotechnical Scientist
- **Demonstrates**: High-impact disaster prevention and mine-subsidence modeling.
- **Storyline**: IIT (ISM) Dhanbad geophysicist deploying subsurface MEMS extensometers and InSAR remote sensing arrays in Jharia's fire-affected coalfields (**JS-2024-00003**).

### 6. Dr. Rajesh Kumar (`rajesh.ias@jharkhand.gov.in`) — Local Administrative Officer
- **Demonstrates**: District governance, field verification, and pilot sanctioning.
- **Storyline**: Block Development Officer (BDO) of Murhu Block. Reviews citizen submissions, validates evidence, sanctions field pilot trials, and coordinates with university teams to track public grievance resolutions.

### 7. Smt. Ananya Sen, IAS (`ananya.sen@jharkhand.gov.in`) — State Nodal Officer
- **Demonstrates**: State-level oversight, policy-backed funding, and inter-district scaling.
- **Storyline**: State Innovation Director who monitors multi-district KPI dashboards, sanctions state grant funding, and reviews impact reports across Santhal Pargana, Kolhan, and North Chotanagpur divisions.

### 8. Sanjay Oraon (`sanjay.oraon@tatasteel.com`) — Industry & CSR Partner
- **Demonstrates**: Corporate Social Responsibility (CSR) co-funding and pilot scaling.
- **Storyline**: Tata Steel Rural Development Society leader who committed ₹12.5 Lakhs in CSR pilot matching funds for West Singhbhum's maternal health diagnostic kit and Khunti's water telemetry.

### 9. Vikas Agarwal (`vikas.agarwal@ccl.gov.in`) — Public Sector Undertaking (PSU) Industry Lead
- **Demonstrates**: Industrial public sector safety partnerships.
- **Storyline**: Central Coalfields Ltd General Manager co-funding geotechnical sensors in Dhanbad subsidence corridors with IIT (ISM) Dhanbad.

### 10. Platform Administrator (`admin@jharsankalp.in`) — Governance & Auditing
- **Demonstrates**: Platform security, audit trails, user role oversight, and system analytics.
- **Storyline**: Inspects immutable audit logs, manages system configuration, reviews flagged submissions, and views cross-departmental impact metrics.

---

## 4. Complete End-to-End Civic Ecosystem Workflow

The seeded data illustrates a complete civic problem-to-impact lifecycle:

```
[1. CITIZEN IDENTIFIES PROBLEM]
   Kavita Munda identifies frequent handpump breakdowns in Murhu (Khunti)
                 │
                 ▼
[2. CIVIC CHALLENGE CREATED & EVIDENCE ATTACHED]
   Challenge JS-2026-00024 logged with DW&S water quality tests & Gram Sabha minutes
                 │
                 ▼
[3. STAKEHOLDER DISCOVERY & AI CATEGORIZATION]
   Classified under "Water Management" (Urgency: HIGH, Affected: 2,000 tribal residents)
                 │
                 ▼
[4. RESEARCHERS & INNOVATORS PROPOSE SOLUTIONS]
   Prof. Anand Verma (BIT Mesra) proposes "Smart Water Monitoring Network" (TRL-6 IoT)
                 │
                 ▼
[5. MULTI-STAKEHOLDER CONSORTIUM FORMED]
   Consortium links: BIT Mesra (Tech) + TSRDS Tata Steel (CSR Funds) + Jal Sahiya (Care)
                 │
                 ▼
[6. GOVERNMENT VALIDATION & PILOT IMPLEMENTATION]
   Dr. Rajesh Kumar (BDO) reviews evidence, sanctions pilot, approves Milestone M1 & M2
                 │
                 ▼
[7. VERIFIED FIELD IMPACT MEASURED]
   73% reduction in handpump repair downtime (12 days → 1.8 days)
   Verified by Gram Panchayat; recorded in state impact metrics registry
```

---

## 5. Seeded Dataset Summary

- **24 Districts**: All 24 official Jharkhand administrative districts seeded with codes.
- **9 Organizations**: BIT Mesra, Birsa Agricultural University, IIT (ISM) Dhanbad, Murhu Jal Sahiya Collective, Santhal Pargana Tech Collective, Tata Steel TSRDS, Central Coalfields Ltd CSR, Dept of Higher & Technical Education, KVK Gumla.
- **10 Personas**: Full bcrypt authentication with distinct avatars, phone numbers, and bios.
- **7 Challenges**:
  1. `JS-2026-00024` — Drinking Water Handpumps (Khunti)
  2. `JS-2026-00019` — Post-Harvest Storage & Soil Health (Gumla)
  3. `JS-2024-00003` — Mine Subsidence & Subsurface Fire Early Warning (Dhanbad)
  4. `JS-2026-00008` — Maternal Anemia Diagnostics in Forest Hamlets (West Singhbhum)
  5. `JS-2026-00014` — Santhali Mother-Tongue Digital Learning (Dumka)
  6. `JS-2026-00021` — Acoustic Chainsaw Detection in Betla Buffer Zone (Latehar)
  7. `JS-2026-00033` — Monsoon Urban Drain Siltation in Harmu River (Ranchi)
- **7 Evidence Records**: Attached lab reports, Gram Sabha resolutions, and hazard surveys.
- **7 Ideas & Consortia**: Detailed technical approaches with TRL levels and multi-party rosters.
- **7 Projects & 14 Milestones**: Tracked from baseline installation to state evaluation.
- **10 District Impact Records**: Concrete quantitative outcomes (downtime reduction, yield gains, flood damage prevention).
- **Interactive Feed & Alerts**: Real notifications and audit logs for user dashboards.
