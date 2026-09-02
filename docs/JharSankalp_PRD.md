# Product Requirements Document (PRD)

# JharSankalp — Societal Challenge-to-Impact Exchange

**Version:** 1.0  
**Status:** Final SIH MVP Product Definition  
**Problem Statement ID:** 26043  
**Problem Statement:** A digital platform to crowdsource societal challenges and facilitate collaborative problem solving through universities and industry partnerships  
**Organization:** Government of Jharkhand  
**Department:** Department of Higher & Technical Education  
**Category:** Software  
**Theme:** Smart Education

---

## 1. Executive Summary

JharSankalp is an AI-powered **Societal Challenge-to-Impact Exchange** for Jharkhand.

The platform converts locally observed societal needs into **validated, structured, innovation-ready challenges**, then connects those challenges with the most relevant combination of:

- Higher Education Institutions (HEIs)
- Faculty and researchers
- Students
- Startups and MSMEs
- Industry partners
- CSR/impact organizations
- Government and local authorities

The platform tracks the resulting work from challenge definition through consortium formation, impact planning, prototype development, field pilot, community validation, and scale-up.

### Core product promise

> **Discover → Structure → Verify → Prioritize → Match → Form Consortium → Define Impact → Build → Pilot → Verify Impact → Scale**

JharSankalp is **not a replacement for a generic government grievance/complaint system**. Routine civic/service complaints should be redirected to or integrated with existing government resolution channels where appropriate. JharSankalp focuses on **innovation-worthy societal challenges** that benefit from research, technology, multidisciplinary collaboration, industry support, and measurable field validation.

---

# 2. Product Vision

Create the state-level operating layer that converts **local societal demand into measurable innovation outcomes**.

Today, citizen/community problems, academic capability, industry resources, and government priorities can exist in separate silos. JharSankalp creates a structured exchange between them.

### Vision

> Every meaningful local problem should be discoverable, understandable, connected to the right capability, and traceable to a measurable outcome.

---

# 3. Problem Definition

Jharkhand faces localized challenges across areas such as:

- Water resources and sanitation
- Agriculture and agribusiness
- Healthcare
- Education and skill development
- Environment and forestry
- Energy
- Urban infrastructure
- Accessibility
- Rural livelihoods
- Public service delivery
- Mining safety, subsidence, and disaster management

Communities are often the first to observe these problems, but identifying a problem does not guarantee that the problem reaches the right research institution, student team, industry partner, or government decision-maker.

At the same time:

- Universities have research and technical capability.
- Faculty have specialized expertise.
- Students need real-world experiential projects.
- Industry and startups have technology, mentors, infrastructure, funding, and deployment capability.
- Government needs evidence about which problems are systemic and which solutions actually work.

JharSankalp connects these actors around a **challenge**, not merely a complaint.

---

# 4. Product Positioning

## What JharSankalp is

A state-level **challenge intelligence and collaboration platform** that transforms societal needs into execution-ready innovation opportunities and measures real-world impact.

## What JharSankalp is NOT

- Not a replacement for existing grievance portals.
- Not merely a student project-management tool.
- Not merely an AI chatbot.
- Not simply a hackathon/challenge listing site.
- Not a generic social network.
- Not an automatic government decision-making system.
- Not a payment/escrow platform in the MVP.

---

# 5. Primary Differentiation

National and institutional initiatives already demonstrate parts of challenge-based academia/industry collaboration. JharSankalp differentiates itself through the **local, AI-assisted, closed-loop challenge lifecycle**.

### Differentiating layer

1. Local community-originated challenge intake
2. AI transformation from raw input to structured challenge
3. Semantic duplicate and related-challenge detection
4. Innovation-worthiness/readiness assessment
5. Capability-based matching across institutions, faculty, students, startups, and industry
6. Multi-organization consortium formation
7. Explicit **Impact Contract** before execution
8. Field-pilot validation and community feedback
9. District/state portfolio intelligence
10. Conversion of recurring local issues into larger **Mission Challenges**

---

# 6. Core Product Concepts

## 6.1 Challenge

The central object in the product.

A Challenge is a validated societal problem/opportunity represented in a structured form and suitable for one of the platform's action tracks.

A Challenge may originate from:

- Citizen
- Community organization
- Panchayati Raj Institution (PRI)
- Urban Local Body (ULB)
- Government department
- NGO/impact organization
- Academic/research institution
- Other approved ecosystem participants

## 6.2 Mission Challenge

A higher-level problem cluster or state/district initiative composed of multiple related local challenges.

Example:

> **Jharkhand Rural Water Reliability Mission**

may contain dozens of local water-infrastructure challenges from multiple districts.

## 6.3 Capability

A structured representation of what an organization or individual can contribute, including expertise, facilities, equipment, research areas, deployment capacity, mentoring ability, funding/support capacity, etc.

## 6.4 Commitment

A concrete offer to support a challenge.

Examples:

- Industry provides hardware.
- Industry provides a mentor.
- University provides laboratory access.
- Researcher provides domain expertise.
- CSR organization provides project support.
- Startup provides technology/API.
- Local authority provides pilot access.

## 6.5 Consortium

A set of organizations/people whose capabilities collectively satisfy the requirements of a challenge.

A consortium may contain multiple universities and one or more industry/startup/other ecosystem partners.

## 6.6 Impact Contract

A pre-agreed definition of what success means for the project.

It must include measurable baseline, target, beneficiaries, pilot scope, duration, and success metrics.

Example:

```text
Baseline: Pump downtime = 12 days
Target:   Pump downtime <= 4 days
Pilot:    10 pumps across 3 villages
Duration: 90 days
Social KPI: Community satisfaction >= 80%
Technical KPI: Failure prediction accuracy >= 85%
```

## 6.7 Project

The execution record created after a challenge forms a solution consortium and is approved to proceed.

## 6.8 Pilot

A controlled real-world deployment used to test the solution before wider scale-up.

## 6.9 Impact Record

Evidence-backed measurement of the outcome achieved by a pilot/project.

---

# 7. Target Users and Roles

## 7.1 Citizen / Community Reporter

Can:

- Submit a societal challenge
- Use text or voice input
- Upload images/videos/documents
- Share location
- Track challenge status
- Receive updates
- Provide field/community feedback

## 7.2 Government / District Officer

Can:

- Review submitted challenges
- Validate or reject challenges
- Confirm action track
- Review AI recommendations
- Approve assignments
- Monitor projects/pilots
- Validate field outcomes
- View district/state analytics
- Create or approve Mission Challenges

## 7.3 University / Institution Admin

Can:

- View matched challenges
- Accept/decline challenges
- Manage institutional capability profile
- Assign departments/faculty
- Create project teams
- Participate in consortia
- Approve proposals and milestones

## 7.4 Faculty / Researcher

Can:

- Review challenges
- Act as mentor/lead
- Form or join teams
- Submit technical proposals
- Define milestones and impact metrics
- Manage research/project activities

## 7.5 Student

Can:

- Discover eligible challenges
- Join approved teams
- Work on project tasks
- Submit deliverables
- Record project progress
- Contribute evidence

## 7.6 Industry / Startup / MSME

Can:

- Publish capability profile
- Discover matched challenges
- Offer mentorship
- Offer technology/hardware
- Offer testing/deployment support
- Offer eligible funding/support commitments
- Join a consortium

## 7.7 CSR / Impact Organization

Can:

- Publish support themes/capabilities
- Discover impact opportunities
- Commit project support
- Track supported projects

## 7.8 Super Admin / State Innovation Admin

Can:

- Manage taxonomy
- Manage users/organizations
- Manage AI configuration
- Approve institutional records
- Configure governance workflows
- Monitor all state-level analytics

---

# 8. Product Principles

1. **Challenge, not complaint, is the core object.**
2. **AI recommends; humans remain accountable for consequential decisions.**
3. **Evidence is more valuable than volume.**
4. **Do not duplicate existing government services when integration/redirection is possible.**
5. **Match capabilities, not just organization names.**
6. **Define impact before building.**
7. **Field validation matters more than prototype completion.**
8. **Use simple architecture for the SIH MVP and keep advanced infrastructure as future scale.**
9. **Every important recommendation must be explainable.**
10. **The system must remain useful even when AI is uncertain or unavailable.**

---

# 9. End-to-End Product Lifecycle

```text
1. DISCOVER
   ↓
2. STRUCTURE
   ↓
3. VERIFY
   ↓
4. DEDUPLICATE / CLUSTER
   ↓
5. CLASSIFY ACTION TRACK
   ↓
6. PRIORITIZE
   ↓
7. FIND EXISTING SOLUTIONS
   ↓
8. MATCH CAPABILITIES
   ↓
9. FORM CONSORTIUM
   ↓
10. DEFINE IMPACT CONTRACT
   ↓
11. APPROVE PROJECT
   ↓
12. BUILD / PROTOTYPE
   ↓
13. FIELD PILOT
   ↓
14. VERIFY IMPACT
   ↓
15. SCALE / RESEARCH / STARTUP / GOVERNMENT ADOPTION
   ↓
16. LEARN + CLUSTER INTO FUTURE MISSIONS
```

---

# 10. Functional Requirements

## FR-01 — Challenge Intake

The platform shall allow approved users to submit societal challenges using:

- Text description
- Voice input
- Photo upload
- Video upload
- Supporting documents
- Location/GPS
- District/block/PRI/ULB where available
- Optional affected population estimate
- Optional urgency/severity information

### MVP requirement

Support responsive web/PWA. Native Android/iOS applications are future scope.

### UX requirement

A citizen should be able to report a challenge without understanding technical terminology.

---

## FR-02 — AI Problem Structuring

The AI layer shall convert raw input into a structured Challenge Brief containing:

- Suggested title
- Problem summary
- Domain
- Subdomain
- Location
- Severity
- Urgency
- Affected population estimate (when available)
- Problem type
- Evidence summary
- Required skills/capabilities
- Potential intervention areas
- Confidence scores

### Example

```text
Raw:
"Our village water pump keeps failing and people have to walk far for water."

AI output:
Domain: Water Resources & Sanitation
Problem Type: Rural Infrastructure Failure
Severity: High
Required capabilities: IoT, Mechanical, Water Systems, Data Analytics
```

AI-generated content must be editable before final validation.

---

## FR-03 — Voice and Multilingual Input

The MVP shall support voice-to-text for Hindi and English.

Architecture should allow additional Indian/Jharkhand languages in future.

The product should avoid hard-coding a language-specific workflow.

### Future scope

- Santali
- Mundari
- Ho
- Nagpuri
- Other supported regional languages
- Translation/TTS/IVR expansion

---

## FR-04 — Evidence Handling

The system shall support:

- Images
- Video
- PDF/documents
- Metadata capture
- Secure storage
- Preview
- Association of evidence with a Challenge

The system should display evidence provenance where available.

No claim of forensic authenticity should be made in the MVP; evidence should be treated as submitted evidence and optionally flagged for verification.

---

## FR-05 — Location and Geography

Each Challenge should store:

- Latitude/longitude when permission is given
- District
- Block where available
- Panchayat/ULB where available

The platform shall support map visualization and district-level filtering.

### MVP

Use a map provider/API appropriate to the implementation. Exact provider can be chosen during engineering.

### Future

Additional authoritative geospatial datasets can be integrated.

---

## FR-06 — Challenge Verification

Before a Challenge becomes an active innovation opportunity, an authorized reviewer shall be able to:

- Approve
- Request clarification
- Merge into an existing challenge
- Mark as routine service issue
- Reject as invalid/spam

The AI may recommend actions but shall not perform irreversible consequential decisions without the configured approval policy.

---

## FR-07 — Semantic Duplicate Detection

The system shall identify potentially duplicate or highly related challenges using semantic similarity.

### Expected behavior

For a new challenge:

1. Generate embedding.
2. Search related challenges.
3. Apply optional metadata filters such as district/domain.
4. Display candidate matches.
5. Provide similarity/explanation.
6. Allow authorized human decision when ambiguity exists.

### UI example

```text
Possible related challenges found

91% semantic similarity
Same district
Same domain
Similar evidence

[Merge into existing challenge]
[Keep separate]
```

The MVP must not treat a single fixed similarity threshold as universally correct. Thresholds should be configurable and validated against test data.

---

## FR-08 — Challenge Clustering

The platform should group related challenges into clusters.

Example:

```text
17 water supply reports
23 irrigation reports
11 groundwater reports
9 crop-yield reports

→ Agriculture Water Resilience Cluster
```

Clusters can later be promoted into Mission Challenges.

---

## FR-09 — Action Track Classification

Each validated Challenge must be classified into one primary action track:

### A. Resolve

Routine service/civic issue better handled through a government mechanism.

### B. Research

Requires academic research, experimentation, validation, or deeper investigation.

### C. Innovate

Suitable for prototype development and field experimentation, potentially involving universities + industry/startups.

Optionally store a secondary track when appropriate.

---

## FR-10 — Priority Scoring

The platform shall calculate a configurable priority score using factors such as:

- Severity
- Urgency
- Population affected
- Hazard/risk
- Evidence confidence
- Recurrence
- Feasibility

The exact weights must be configurable by administrators.

### Important

The score is a decision-support signal, not an unquestionable truth.

### Example output

```text
Priority: HIGH

Severity        35%
Urgency         20%
Population      20%
Hazard          15%
Evidence        10%

Overall: 86/100
```

---

## FR-11 — Innovation Readiness Score

For Research and Innovate challenges, calculate an Innovation Readiness profile using configurable dimensions:

- Problem clarity
- Evidence quality
- Social impact
- Technical feasibility
- Research potential
- Pilot feasibility
- Ecosystem relevance
- Scalability potential

### Example

```text
Problem clarity       92
Evidence quality      85
Social impact         90
Technical feasibility 81
Research potential    88
Pilot feasibility     84
Scalability           86

Overall               87/100
```

The score must display its dimensions and explanations.

---

## FR-12 — Existing Solution Discovery

Before a new project is approved, the system should search available knowledge sources for:

- Previous JharSankalp projects
- Similar platform challenges
- Research records where available
- Patents where integrated
- Registered startups/technologies where integrated
- Government schemes/services where integrated

The goal is to identify **adopt/reuse opportunities before reinventing a solution**.

### MVP

At minimum, search the platform's own challenge/project repository.

### Future

External research/patent/startup/scheme integrations.

---

## FR-13 — Capability Profiles

Every participating organization should have a structured capability profile.

### University capability may include

- Departments
- Faculty expertise
- Research areas
- Labs
- Equipment
- Facilities
- Previous projects
- Student capacity
- Incubation capability

### Industry capability may include

- Technologies
- Industry domains
- Products
- Hardware
- Software
- Mentors
- Testing facilities
- Deployment ability
- Support capacity

### Individual capability may include

- Skills
- Certifications
- Research interests
- Previous project experience
- Availability

---

## FR-14 — AI Capability Matching

The platform shall recommend suitable collaborators using a hybrid matching system.

### Matching inputs

- Challenge domain
- Required skills
- Research needs
- Required infrastructure
- Location/deployment needs
- Availability/capacity
- Historical relevance
- Industry support needs

### Matching levels

1. Organization
2. Department/team
3. Faculty/researcher
4. Student skill pool
5. Industry/startup partner

### Example

```text
Recommended consortium

University A — 94%
✓ IoT lab
✓ Mechanical department
✓ Water research

University B — 88%
✓ ML faculty
✓ Embedded systems

Industry X — 91%
✓ Sensors
✓ Field deployment
✓ Technical mentor
```

### Explainability requirement

Every recommendation should provide a reason breakdown.

---

## FR-15 — Consortium Formation

Authorized users shall be able to form a collaboration consortium from recommended parties.

A consortium should track:

- Member organizations
- Roles
- Responsibilities
- Capabilities contributed
- Commitments
- Lead institution
- Lead faculty/mentor
- Communication channels

---

## FR-16 — Commitment Cards

Organizations may publish reusable support commitments.

### Example

```text
ABC Technologies

Can provide:
✓ IoT hardware
✓ 1 technical mentor
✓ Field testing

Availability:
5 projects/year

Domains:
Water, Agriculture
```

Commitments must be visible during matching and consortium formation.

---

## FR-17 — Challenge Marketplace

The platform shall provide searchable challenge discovery for approved ecosystem users.

### Filters

- Domain
- District
- Priority
- Innovation readiness
- Required skills
- Stage
- Funding/support need
- Organization
- Mission

### Challenge card should show

- Title
- Location
- Domain
- Impact
- Stage
- Required capabilities
- Support needed
- Matching/interest information

---

## FR-18 — Proposal Generation / Assistance

Once a challenge has a prospective consortium, AI can assist with generating an initial project proposal draft:

- Problem statement
- Objectives
- Proposed approach
- Team roles
- Required resources
- Milestones
- Pilot plan
- Impact metrics
- Risks
- Expected outcomes

AI output is a draft and must be editable and approved by humans.

---

## FR-19 — Impact Contract

Every Innovation/Research project progressing to execution must define an Impact Contract.

Required elements:

- Baseline metric
- Target metric
- Technical KPIs
- Social/beneficiary KPIs
- Pilot scope
- Duration
- Beneficiary estimate
- Measurement method
- Evidence required
- Responsible parties

No project should be considered successfully deployed solely because a prototype exists.

---

## FR-20 — Project Lifecycle

Project status stages:

```text
DRAFT
→ PROPOSAL_SUBMITTED
→ UNDER_REVIEW
→ APPROVED
→ PROTOTYPE
→ LAB_TESTING
→ FIELD_PILOT
→ IMPACT_VERIFICATION
→ DEPLOYED
→ SCALED
```

Projects may also move to:

- PAUSED
- REJECTED
- CANCELLED
- NEEDS_REVISION

---

## FR-21 — Milestones and Deliverables

Each Project should support:

- Milestones
- Tasks
- Due dates
- Responsible person/team
- Deliverables
- Evidence
- Review comments
- Status
- Approval

---

## FR-22 — Field Pilot

A Pilot shall capture:

- Deployment location
- Start/end dates
- Pilot scope
- Participating users/beneficiaries
- Evidence
- Baseline metrics
- Actual metrics
- Incidents/issues
- Community feedback

---

## FR-23 — Community Validation

After field testing, authorized community participants or field officials can provide outcome feedback.

Possible result:

```text
Solved
Partially solved
Not solved
```

with:

- Rating
- Comment
- Evidence

---

## FR-24 — Impact Measurement

The system shall compare baseline and post-pilot values.

Example:

```text
Pump downtime
Before: 12 days
After:   3.5 days
Improvement: 70.8%
```

The system should distinguish between:

- Reported value
- Measured value
- Verified value

where possible.

---

## FR-25 — Mission Challenges

The system should identify recurring clusters and allow authorized users to create Mission Challenges.

Example:

```text
Mission:
Jharkhand Rural Water Reliability

Contains:
45 local challenges
8 institutions
4 industry partners
12 pilots
```

A Mission should support:

- Objectives
- Participating districts
- Child challenges
- Portfolio KPIs
- Funding/support goals
- Timeline
- State-level impact metrics

---

## FR-26 — Government Decision Intelligence

The executive dashboard shall display:

- Total challenges
- Verified challenges
- Research challenges
- Innovation challenges
- Resolve-track volume
- Active projects
- Active pilots
- Deployed solutions
- District distribution
- Domain distribution
- University participation
- Industry participation
- Support commitments
- Impact metrics

### AI-generated portfolio insights

Example:

> Water-related challenges increased significantly across several districts. A large proportion concern infrastructure reliability rather than water availability. Multiple institutions already have relevant capabilities. Consider creating a state-level water reliability Mission Challenge.

AI insights must link to underlying data and show the reason/evidence used where practical.

---

## FR-27 — District Heatmap

Government users shall have an interactive map for all districts.

Clicking a district should reveal:

- Challenge count
- Critical/high-priority count
- Domain breakdown
- Active projects
- Pilots
- Deployed solutions
- Impact summaries

---

## FR-28 — Notifications

MVP notification channels:

- In-app
- Web push
- Email where configured

Events include:

- Challenge submission
- Validation result
- Assignment
- Proposal request
- Consortium invitation
- Milestone update
- Pilot start
- Impact validation request
- Project completion

### Future

- SMS
- WhatsApp Business API
- IVR
- Bhashini-based multilingual voice notifications

---

## FR-29 — Collaboration / Messaging

Users associated with the same challenge/consortium/project should have controlled communication.

MVP:

- Comments
- Mentions
- Activity feed
- Basic project conversation

Future:

- Rich real-time collaboration
- Video/voice meetings
- Advanced chat

---

## FR-30 — Auditability

Important actions must produce audit records:

- Who performed the action
- What changed
- When
- Previous state
- New state
- Optional reason

Examples:

- Challenge approved
- Challenge merged
- University assigned
- Proposal approved
- Pilot verified
- Deployment approved

---

# 11. AI Requirements

## AI Component A — Problem Structuring

Input:

- Text
- Voice transcript
- OCR output
- Evidence metadata

Output:

- Structured challenge JSON/object
- Summary
- Categories
- Severity/urgency suggestions
- Required capabilities

## AI Component B — Semantic Similarity

Use embeddings + vector similarity for:

- Duplicate detection
- Related challenge retrieval
- Existing solution retrieval
- Capability retrieval

## AI Component C — Classification

Classify:

- Domain
- Subdomain
- Action track
- Problem type

## AI Component D — Ranking

Rank:

- Priority
- Innovation readiness
- Institution match
- Faculty/team match
- Industry match

## AI Component E — Generative Assistance

Use an LLM for:

- Challenge refinement
- Proposal drafts
- Milestone suggestions
- Impact metric suggestions
- Government insight summaries

---

# 12. AI Guardrails

The AI must:

- Show confidence where appropriate.
- Provide reasons for recommendations.
- Allow human correction.
- Avoid making irreversible consequential decisions autonomously.
- Never invent evidence.
- Clearly distinguish AI-generated text from verified facts.
- Preserve original citizen input.
- Log important AI decisions/recommendations for auditability.

### Example

Bad:

> University A is definitely the best institution.

Good:

> University A is recommended with 94% match confidence because it has relevant IoT and water-systems expertise, a matching laboratory, and related project history.

---

# 13. AI Data Flow

```text
User Submission
      ↓
Speech-to-text / OCR (if needed)
      ↓
LLM Problem Structuring
      ↓
Structured Challenge Object
      ↓
Embedding Generation
      ↓
Semantic Similarity Search
      ↓
Duplicate / Related Challenge Candidates
      ↓
Classification + Priority + Readiness
      ↓
Existing Solution Search
      ↓
Required Capability Extraction
      ↓
Capability Matching
      ↓
Explainable Recommendations
      ↓
Human Review
```

---

# 14. Recommended System Architecture

The SIH MVP should use a modular architecture, not an unnecessarily large microservices platform.

```text
                         CLIENTS
                            |
              +-------------+-------------+
              |             |             |
           Citizen       University    Government
           PWA/Web       Web Portal    Dashboard
              |             |             |
              +-------------+-------------+
                            |
                       Next.js App
                            |
                        API Layer
                            |
                       NestJS Backend
                            |
        +-------------------+--------------------+
        |                   |                    |
   PostgreSQL            Redis              Object Storage
   + pgvector             + Queue            Images/Videos/PDFs
        |
        |
   Core Domain Data
        |
        +---------------------------+
                                    |
                              Python AI Service
                                    |
                  +-----------------+----------------+
                  |                 |                |
                 LLM           Embeddings      Speech/OCR
                  |
                  +-----------------+----------------+
                                    |
                             AI Orchestrator
```

---

# 15. Recommended Technology Stack

Frontend:
React + TypeScript + Vite

Backend:
Node.js + Express + TypeScript

ORM:
Prisma

Database:
PostgreSQL

- PostGIS
- pgvector

State/data fetching:
TanStack Query

Client state:
Zustand

Realtime:
Socket.IO

Queue:
Redis + BullMQ

Maps:
MapLibre

Charts:
Recharts

AI:
Provider-agnostic AI service/API layer or langgraph and langchain

# 16. Core Data Model

```text
User
Organization
Role
UserRole

CitizenProfile
University
Department
Faculty
Student
Industry
Startup
CSROrganization
GovernmentDepartment

Capability
Facility
ResearchArea
Skill

Challenge
ChallengeEvidence
ChallengeLocation
ChallengeAnalysis
ChallengeRelation
ChallengeCluster
Mission

ChallengeAssignment
MatchRecommendation

Commitment
Consortium
ConsortiumMember

Proposal
ImpactContract

Project
ProjectMember
Milestone
Deliverable

Pilot
FieldValidation
ImpactMetric
CitizenFeedback

Notification
Conversation
Comment

AuditLog
```

### Key relationships

```text
Challenge
  |
  +-- Evidence
  +-- Location
  +-- AI Analysis
  +-- Related Challenges
  +-- Mission
  +-- Match Recommendations
  +-- Consortium
          |
          +-- Organizations
          +-- Commitments
          +-- Project
                  |
                  +-- Impact Contract
                  +-- Milestones
                  +-- Pilot
                          |
                          +-- Field Validation
                          +-- Impact Metrics
```

---

# 17. Challenge State Machine

```text
SUBMITTED
   |
   v
AI_ANALYZED
   |
   v
UNDER_VALIDATION
   |-----------------------+
   |                       |
   v                       v
ROUTINE_RESOLUTION       VALIDATED
                           |
                  +--------+--------+
                  |                 |
                  v                 v
              RESEARCH          INNOVATE
                  |                 |
                  +--------+--------+
                           |
                           v
                      MATCHING
                           |
                           v
                    CONSORTIUM_FORMED
                           |
                           v
                    IMPACT_CONTRACTED
                           |
                           v
                         PROJECT
```

A Challenge can be closed, archived, rejected, merged, or linked to a Mission depending on its lifecycle.

---

# 18. Project State Machine

```text
DRAFT
  ↓
PROPOSAL_SUBMITTED
  ↓
UNDER_REVIEW
  ↓
APPROVED
  ↓
PROTOTYPE
  ↓
LAB_TESTING
  ↓
FIELD_PILOT
  ↓
IMPACT_VERIFICATION
  ↓
DEPLOYED
  ↓
SCALED
```

Alternative terminal states:

- CANCELLED
- FAILED_PILOT
- PAUSED
- ARCHIVED

---

# 19. Key User Journeys

## Journey A — Citizen creates an innovation challenge

```text
Open JharSankalp
  ↓
Choose "Report a Challenge"
  ↓
Speak or type
  ↓
Upload photo/video
  ↓
Allow location
  ↓
AI generates challenge brief
  ↓
Citizen reviews/edits
  ↓
Submit
  ↓
Tracking ID generated
```

## Journey B — Government validates

```text
Officer dashboard
  ↓
Review AI brief
  ↓
See duplicates/related challenges
  ↓
See existing solution suggestions
  ↓
Choose:
Resolve / Research / Innovate
  ↓
Approve
```

## Journey C — AI matches capabilities

```text
Validated Challenge
  ↓
Extract required capabilities
  ↓
Search university/faculty/industry profiles
  ↓
Rank candidates
  ↓
Show explanation
  ↓
Human selects/approves
```

## Journey D — Consortium forms

```text
Selected HEI
  ↓
Invite other HEI / industry
  ↓
Review commitments
  ↓
Assign roles
  ↓
Create consortium
```

## Journey E — Project executes

```text
Consortium
  ↓
Generate proposal
  ↓
Define Impact Contract
  ↓
Approve
  ↓
Prototype
  ↓
Lab Test
  ↓
Field Pilot
  ↓
Community Validation
  ↓
Impact Verification
```

## Journey F — Government creates Mission

```text
Dashboard detects challenge cluster
  ↓
Review related challenges
  ↓
Create Mission Challenge
  ↓
Define state/district objective
  ↓
Invite ecosystem
  ↓
Track portfolio impact
```

---

# 20. MVP Scope for SIH

The MVP must demonstrate the complete loop with a small controlled dataset.

## Must Have

### Citizen

- Challenge submission
- Text input
- Voice-to-text
- Photo upload
- Location capture
- Challenge tracking

### AI

- Problem structuring
- Classification
- Duplicate/related challenge detection
- Priority score
- Innovation readiness score
- Capability matching
- Explainable recommendation

### Government

- Validation queue
- Challenge action-track decision
- Dashboard
- District map
- Challenge/project monitoring

### University

- Capability profile
- Challenge discovery
- Accept challenge
- Team/project creation
- Faculty mentor
- Proposal
- Milestones

### Industry

- Capability profile
- Commitment card
- Discover challenge
- Join consortium

### Project

- Impact Contract
- Milestones
- Prototype stage
- Pilot stage
- Community validation
- Impact comparison

### Demonstration

One challenge must travel end-to-end:

```text
Citizen
→ AI
→ Duplicate detection
→ Government validation
→ University match
→ Industry commitment
→ Consortium
→ Impact Contract
→ Prototype
→ Pilot
→ Community validation
→ Government impact dashboard
→ Mission recommendation
```

---

# 21. Explicitly Out of Scope for SIH MVP

The following should NOT consume core hackathon development time:

- Native iOS application
- Native Android application
- Full Kafka/event-streaming architecture
- Kubernetes cluster
- Complex microservice decomposition
- Payment/escrow infrastructure
- Aadhaar e-KYC integration
- Full government procurement workflow
- Full IP licensing platform
- Automatic startup incorporation
- Fully automated academic credit integration
- Every Jharkhand language from day one
- Nationwide deployment
- Custom foundation model training
- Full enterprise BI suite
- Video-conferencing platform
- Complex social-network features

These can appear under future roadmap/scale architecture.

---

# 22. SIH Demo Scenario

The reference demo should use a realistic water-management challenge.

## Example

Citizen speaks:

> "Hamare gaon mein paani ke pumps baar-baar kharab ho jaate hain aur logon ko door se paani lana padta hai."

### AI output

```text
Challenge: Predictive Maintenance of Rural Water Pumps
Domain: Water Resources & Sanitation
District: Khunti
Severity: High
Innovation Readiness: 87/100
Required Skills:
  - IoT
  - Mechanical Engineering
  - Water Systems
  - Data Analytics
```

### Related challenge discovery

```text
13 related reports found
7 photo evidences
Same geographic cluster
```

### Capability match

```text
University A 94%
University B 88%
Industry X 91%
```

### Consortium

```text
University A:
IoT lab + Mechanical faculty

University B:
Water systems expertise

Industry X:
Sensors + mentor + field support
```

### Impact Contract

```text
Baseline: 12 days downtime
Target: <= 4 days
Pilot: 10 pumps / 3 villages
Duration: 90 days
```

### Pilot outcome

```text
Downtime: 12 → 3.5 days
Community satisfaction: 89%
Target: Achieved
```

### Government insight

```text
31 similar challenges found across 6 districts.
Recommendation: create a Rural Water Reliability Mission.
```

This single story should demonstrate the product's entire value proposition.

---

# 23. Government Dashboard Requirements

## State Summary

Display:

- Total challenges
- Verified challenges
- Innovation-ready challenges
- Active projects
- Active pilots
- Deployed solutions
- Beneficiaries
- Industry partners
- University participation

## District View

For every district:

- Challenge count
- High/Critical challenge count
- Domain breakdown
- Active projects
- Pilots
- Deployment rate
- Impact metrics

## Domain View

Examples:

- Water
- Agriculture
- Healthcare
- Education
- Environment
- Energy
- Urban infrastructure
- Rural livelihoods
- Accessibility
- Public administration
- Mine safety/disaster management

## Ecosystem View

- Active HEIs
- Active faculty
- Student participation
- Industry partners
- Commitments
- Consortia
- Mentorship hours

## Impact View

- Projects achieving targets
- Baseline vs post-pilot KPIs
- Beneficiaries reached
- Cost/time/resource improvements
- Community satisfaction

---

# 24. UX Requirements

## Citizen UX

Must be:

- Simple
- Mobile-first
- Low-literacy friendly
- Voice-first capable
- Evidence-friendly
- Minimal form fields

Do not make the citizen fill a research proposal.

## Government UX

Must optimize for:

- Triage
- Comparison
- Explainability
- Geographic context
- Portfolio monitoring

## University UX

Must optimize for:

- Capability discovery
- Team formation
- Proposal workflow
- Milestones
- Research collaboration

## Industry UX

Must optimize for:

- Finding relevant opportunities
- Understanding contribution needs
- Publishing commitments
- Joining collaborations

---

# 25. Accessibility and Resilience

The platform should support:

- Responsive mobile experience
- Keyboard accessibility
- Clear contrast
- Large touch targets
- Voice input
- Low-bandwidth optimization
- Resumable uploads
- Graceful AI failure

### Future/offline enhancement

A PWA can cache draft submissions locally and synchronize when connectivity returns.

---

# 26. Security and Privacy Requirements

The system shall implement:

- Secure authentication
- Role-based access control
- Resource-level authorization
- TLS
- Secure file upload
- Signed/private media URLs where appropriate
- Rate limiting
- Input validation
- Audit logs
- PII separation
- Consent tracking
- Backups

### PII handling

A public Challenge page should not expose unnecessary personal information.

Example:

```text
PUBLIC
- Challenge title
- Location at appropriate granularity
- Problem description
- Evidence approved for sharing
- Status

PRIVATE
- Phone
- Email
- Personal identity details
- Sensitive evidence
```

---

# 27. Non-Functional Requirements

## Performance

- Normal API interactions should feel responsive on common mobile networks.
- AI operations may be asynchronous where processing is expensive.
- File uploads should support progress state.

## Reliability

- AI outage must not make the core platform unusable.
- A challenge can be manually reviewed if AI analysis fails.

## Scalability

MVP should be modular enough to later support:

- More districts
- More HEIs
- More industries
- More challenges
- More AI workloads

## Observability

Track:

- API latency
- AI latency
- AI errors
- Queue failures
- Upload failures
- Recommendation latency
- Notification failures

---

# 28. Analytics and KPI Definitions

## Platform KPIs

### Challenge Conversion Rate

```text
Validated Challenges / Submitted Challenges
```

### Innovation Conversion Rate

```text
Innovation Challenges / Validated Challenges
```

### Collaboration Rate

```text
Challenges with Consortium / Innovation Challenges
```

### Pilot Rate

```text
Projects entering Pilot / Approved Projects
```

### Deployment Rate

```text
Deployed Solutions / Projects Entering Pilot
```

### Impact Achievement Rate

```text
Projects achieving Impact Contract targets / Impact-verified Projects
```

## Ecosystem KPIs

- Active universities
- Active faculty
- Active students
- Active industry partners
- Commitments published
- Consortia created
- Mentorship hours
- Support commitments

## Social Impact KPIs

Project-specific metrics should be primary.

Possible aggregate metrics:

- Beneficiaries reached
- Time saved
- Cost saved
- Water saved
- Energy saved
- Income generated
- Service downtime reduced
- Satisfaction improved

Avoid fake or unsupported aggregate numbers.

---

# 29. Responsible AI and Explainability

The platform must expose the difference between:

- AI suggestion
- Human decision
- Verified field evidence

### Example timeline

```text
AI suggested:
University A — 94% match

Government approved:
University A

Field verified:
Solution reduced downtime by 70.8%
```

This distinction should exist in the data model and UI.

---

# 30. Notification/Event Model

Important events should trigger system events such as:

```text
CHALLENGE_SUBMITTED
CHALLENGE_AI_ANALYZED
CHALLENGE_DUPLICATE_FLAGGED
CHALLENGE_VALIDATED
CHALLENGE_ASSIGNED
CONSORTIUM_INVITE
CONSORTIUM_FORMED
PROPOSAL_SUBMITTED
PROJECT_APPROVED
MILESTONE_DUE
MILESTONE_COMPLETED
PILOT_STARTED
VALIDATION_REQUESTED
IMPACT_VERIFIED
PROJECT_DEPLOYED
MISSION_CREATED
```

The event model should be extensible.

---

# 31. Recommended API Surface

This is a high-level API contract for implementation planning.

## Auth

```http
POST /auth/login
GET  /auth/me
```

## Challenges

```http
POST   /challenges
GET    /challenges
GET    /challenges/:id
PATCH  /challenges/:id
POST   /challenges/:id/submit
POST   /challenges/:id/validate
POST   /challenges/:id/merge
GET    /challenges/:id/related
GET    /challenges/:id/matches
```

## AI

```http
POST /ai/challenges/:id/analyze
POST /ai/challenges/:id/similar
POST /ai/challenges/:id/readiness
POST /ai/challenges/:id/recommendations
POST /ai/proposals/generate
POST /ai/insights/generate
```

## Organizations

```http
GET    /universities
GET    /universities/:id
PATCH  /universities/:id/capabilities
GET    /industry
GET    /industry/:id
PATCH  /industry/:id/capabilities
```

## Commitments

```http
POST /commitments
GET  /commitments
PATCH /commitments/:id
```

## Consortiums

```http
POST /consortiums
GET  /consortiums/:id
POST /consortiums/:id/invite
POST /consortiums/:id/accept
```

## Projects

```http
POST   /projects
GET    /projects
GET    /projects/:id
PATCH  /projects/:id
POST   /projects/:id/milestones
POST   /projects/:id/impact-contract
POST   /projects/:id/pilot
POST   /projects/:id/validate-impact
```

## Missions

```http
POST /missions
GET  /missions
GET  /missions/:id
POST /missions/:id/challenges
```

## Analytics

```http
GET /analytics/state
GET /analytics/districts
GET /analytics/domains
GET /analytics/impact
```

---

# 32. Suggested Frontend Routes

```text
/
/login
/report
/challenges
/challenges/:id
/challenges/:id/timeline
/discover
/universities
/universities/:id
/industry
/industry/:id
/consortiums/:id
/projects
/projects/:id
/projects/:id/impact
/missions
/missions/:id
/dashboard/government
/dashboard/university
/dashboard/industry
/dashboard/student
/admin
```

---

# 33. Recommended Component Areas

## Citizen

- VoiceReportButton
- ChallengeForm
- MediaUploader
- LocationPicker
- AIChallengePreview
- ChallengeTimeline
- FeedbackForm

## AI

- AIAnalysisCard
- SimilarChallengesPanel
- PriorityScoreCard
- ReadinessScoreCard
- MatchExplanationCard

## Government

- ValidationQueue
- DistrictMap
- StateKPIGrid
- PortfolioInsightCard
- ChallengeClusterView
- MissionBuilder

## University

- CapabilityProfile
- ChallengeInbox
- TeamBuilder
- ProposalEditor
- MilestoneBoard

## Industry

- CapabilityProfile
- CommitmentCard
- OpportunityFeed
- ConsortiumInvitation

## Project

- ProjectTimeline
- ImpactContractCard
- MilestoneBoard
- PilotDashboard
- ImpactComparison
- CommunityValidation

---

# 34. Example User Stories

## Citizen

**US-C01**  
As a citizen, I want to describe a local problem by speaking naturally so that I do not need to understand technical forms.

**US-C02**  
As a citizen, I want to upload evidence and location so that the challenge has useful context.

**US-C03**  
As a citizen, I want to track what happened to my challenge so that I know whether someone is acting on it.

## Government

**US-G01**  
As an officer, I want AI to summarize and structure submissions so that I can review them quickly.

**US-G02**  
As an officer, I want to see related challenges so that duplicate efforts are avoided.

**US-G03**  
As an officer, I want explainable university/industry recommendations so that I can approve assignments with confidence.

**US-G04**  
As a state administrator, I want to see geographic and thematic clusters so that I can identify systemic issues.

## University

**US-U01**  
As a university admin, I want to see challenges relevant to our capabilities so that we can choose meaningful projects.

**US-U02**  
As a faculty mentor, I want to build a multidisciplinary team so that the project has the required expertise.

## Industry

**US-I01**  
As an industry partner, I want to publish what resources I can contribute so that matching is based on actual capacity.

**US-I02**  
As an industry mentor, I want to join relevant consortia so that I can help move solutions toward deployment.

## Project team

**US-P01**  
As a project team, I want to define measurable impact targets before starting development so that success is objective.

**US-P02**  
As a project team, I want to upload pilot evidence and compare baseline vs actual results so that outcomes are verifiable.

---

# 35. Error and Edge Cases

The implementation must handle:

## Duplicate ambiguity

If similarity is high but context differs, show the candidate and let a human decide.

## No university match

Show:

> No strong match found.

Then suggest:

- Broaden skill requirements
- Search other institutions
- Invite industry/startups
- Flag as capability gap

## No industry match

Allow university-only research track.

## AI failure

Allow manual challenge creation/review.

## Missing GPS

Allow manual location selection or skip location.

## Poor connectivity

Allow resumable submission/draft behavior where supported.

## Spam/abuse

Rate limit + moderation + verification workflow.

## Sensitive challenges

Restrict public visibility based on classification and authorization.

## Project fails pilot

Do not silently mark as unsuccessful implementation. Preserve failure evidence and lessons learned.

---

# 36. Important Product Decisions

## Decision 1 — Challenge over complaint

A complaint is often a service request. A Challenge is an actionable societal opportunity.

## Decision 2 — Human-in-the-loop

AI recommendations require human oversight for consequential decisions.

## Decision 3 — Capability graph over simple university ranking

The system should be able to form a multi-organization consortium rather than assuming one institution can solve everything.

## Decision 4 — Impact Contract before execution

Projects must define measurable success before significant work begins.

## Decision 5 — Field evidence over prototype screenshots

A project is not considered successful just because a prototype exists.

## Decision 6 — Existing solutions before new builds

Search for reuse/adaptation before creating another project.

## Decision 7 — Mission Challenges for systemic problems

Repeated local challenges should be promotable into broader district/state missions.

---

# 37. Roadmap Beyond SIH

## Phase 2 — Institutional Expansion

- More HEIs
- More structured faculty profiles
- More student participation
- Better multidisciplinary team recommendations
- Advanced research integration

## Phase 3 — Ecosystem Expansion

- More industries
- CSR organizations
- Incubators
- MSMEs
- Startup ecosystem
- More commitment types

## Phase 4 — Language and Access

- More Jharkhand languages
- Improved voice UX
- IVR
- SMS/WhatsApp notifications
- Stronger offline-first capability

## Phase 5 — Knowledge and Intelligence

- External research/patent integrations
- Advanced knowledge graph
- Historical solution reuse
- Better cross-district clustering
- Predictive challenge analytics

## Phase 6 — State Scale

- Government system integrations
- Formal procurement/deployment workflows
- Large-scale Mission Challenges
- Advanced impact/SROI analytics
- Inter-state or national interoperability

---

# 38. What Success Looks Like for the SIH Prototype

The prototype is successful if a judge can understand and experience this in one continuous flow:

```text
A real citizen problem
        ↓
AI understands it
        ↓
AI detects related reports
        ↓
Government validates it
        ↓
AI finds the best capabilities
        ↓
University + industry form a consortium
        ↓
Team defines measurable impact
        ↓
Prototype/pilot is tracked
        ↓
Community verifies the outcome
        ↓
Government sees the impact
        ↓
AI recommends broader scale / Mission Challenge
```

The judge should leave with the answer to three questions:

1. **What is new?**
   - Challenge intelligence + capability exchange + impact verification.

2. **Why is AI necessary?**
   - To structure messy inputs, find semantic relationships, rank capabilities, and derive portfolio insights.

3. **Why does this matter for Jharkhand?**
   - It connects local societal demand with the state's higher-education and innovation ecosystem and creates evidence for scaling solutions.

---

# 39. Acceptance Criteria for the Core Demo

A build is considered MVP-complete when all of the following work on seeded/demo data:

- [ ] Citizen can submit a challenge using text or voice.
- [ ] Photo can be attached.
- [ ] Location can be captured or selected.
- [ ] AI generates a structured challenge brief.
- [ ] AI identifies domain/action track.
- [ ] System returns related challenges.
- [ ] Human can merge or keep separate.
- [ ] System calculates priority/readiness scores.
- [ ] System finds relevant university capabilities.
- [ ] System finds relevant industry capabilities.
- [ ] Recommendations show reasons.
- [ ] Government can validate/approve challenge.
- [ ] University can accept challenge.
- [ ] A project team can be formed.
- [ ] Industry can contribute a commitment.
- [ ] Consortium can be created.
- [ ] Impact Contract can be defined.
- [ ] Project milestones can be tracked.
- [ ] Pilot can be recorded.
- [ ] Community/field validation can be submitted.
- [ ] Baseline vs actual impact is visible.
- [ ] Government dashboard reflects project/impact state.
- [ ] Related challenges can be grouped into a Mission.

---

# 40. Final Product Definition

## One-line definition

> **JharSankalp is an AI-powered societal Challenge-to-Impact Exchange that turns local problems in Jharkhand into validated innovation opportunities, matches them with the right university-industry capabilities, and tracks measurable field impact through to scale.**

## Four product pillars

### 1. Challenge Intelligence

Understand, validate, deduplicate, prioritize, and cluster societal problems.

### 2. Capability Exchange

Match challenges with universities, faculty, students, startups, industry, and support resources.

### 3. Impact Execution

Create consortia, define impact contracts, execute projects, run pilots, and verify outcomes.

### 4. State Innovation Intelligence

Turn challenge/project data into district-level insights, systemic clusters, and Mission Challenges.

## Core loop

```text
LOCAL NEED
   ↓
CHALLENGE INTELLIGENCE
   ↓
CAPABILITY MATCHING
   ↓
COLLABORATIVE SOLUTION
   ↓
IMPACT VERIFICATION
   ↓
STATE-LEVEL LEARNING
```

This loop—not the individual dashboard, AI model, or project tracker—is the product.

---

# 41. Implementation Guidance for AI Coding Agents

When implementing from this PRD:

1. Treat **Challenge** as the central domain entity.
2. Build the core lifecycle before adding secondary features.
3. Keep AI functionality behind clear service interfaces so models/providers can be changed later.
4. Never hard-code a single AI threshold or score as an unquestionable business truth.
5. Store AI recommendations separately from human-approved decisions.
6. Preserve source/original user input and AI-transformed output separately.
7. Make every recommendation explainable in the UI.
8. Keep government authorization checks server-side.
9. Build the data model for multi-organization consortia, not just one university per challenge.
10. Make impact metrics first-class data, not free-text notes.
11. Build seeded demo data so the SIH flow can be demonstrated reliably without waiting for external users.
12. Do not implement out-of-scope infrastructure merely because it appears enterprise-grade.
13. Prefer modular monolith patterns for the MVP unless a separate service is clearly justified.
14. Every feature should map back to a user role, business objective, or core lifecycle stage.
15. The final demo must show a complete challenge from citizen submission to verified impact.

---

# 42. Non-Negotiable Product Truths

- **This is not a complaint portal.**
- **This is not just a university marketplace.**
- **This is not just an AI classifier.**
- **AI does not replace government accountability.**
- **A prototype is not the same thing as impact.**
- **The best collaborator may be a consortium, not one university.**
- **Existing solutions should be reused when possible.**
- **The strongest unit of value is a verified societal outcome.**

---

# 43. Final SIH Narrative

### Problem

Local societal challenges are observed by communities, academic expertise exists in HEIs, and technical/financial capabilities exist in industry—but these resources are fragmented and there is no coherent state-level lifecycle connecting demand to validated impact.

### Solution

JharSankalp transforms raw societal needs into structured challenges, intelligently discovers duplicates and existing solutions, recommends the right institutional/industry capabilities, forms multidisciplinary consortia, defines measurable impact, coordinates pilots, and verifies field outcomes.

### Innovation

The innovation is the combination of:

> **Challenge Intelligence + Capability Graph + Consortium Formation + Impact Contract + Field Validation + Mission-level State Intelligence**

### Outcome

Jharkhand gets a continuously improving innovation ecosystem where local problems become research opportunities, prototypes, pilots, deployments, startups, and measurable public impact.

---

**End of PRD**
