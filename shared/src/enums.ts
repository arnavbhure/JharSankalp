// ─────────────────────────────────────────────────────────────
// JharSankalp — Domain Enums
// All core enums from the product specification.
// These are the source of truth for both client and server.
// ─────────────────────────────────────────────────────────────

// ── User & Organization ──────────────────────────────────────

export enum UserRole {
  CITIZEN = 'CITIZEN',
  COMMUNITY = 'COMMUNITY',
  GOVERNMENT_OFFICER = 'GOVERNMENT_OFFICER',
  DISTRICT_OFFICER = 'DISTRICT_OFFICER',
  STATE_ADMIN = 'STATE_ADMIN',
  UNIVERSITY_ADMIN = 'UNIVERSITY_ADMIN',
  FACULTY = 'FACULTY',
  STUDENT = 'STUDENT',
  INDUSTRY = 'INDUSTRY',
  STARTUP = 'STARTUP',
  MSME = 'MSME',
  CSR = 'CSR',
  MENTOR = 'MENTOR',
  FIELD_OFFICER = 'FIELD_OFFICER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum OrganizationType {
  UNIVERSITY = 'UNIVERSITY',
  INDUSTRY = 'INDUSTRY',
  STARTUP = 'STARTUP',
  CSR = 'CSR',
  GOVERNMENT = 'GOVERNMENT',
  NGO = 'NGO',
  COMMUNITY = 'COMMUNITY',
  MSME = 'MSME',
}

// ── Challenge ────────────────────────────────────────────────

export enum ChallengeStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  AI_ANALYZED = 'AI_ANALYZED',
  UNDER_VALIDATION = 'UNDER_VALIDATION',
  VALIDATED = 'VALIDATED',
  ROUTINE_RESOLUTION = 'ROUTINE_RESOLUTION',
  MATCHING = 'MATCHING',
  CONSORTIUM_FORMED = 'CONSORTIUM_FORMED',
  IMPACT_CONTRACTED = 'IMPACT_CONTRACTED',
  PROJECT = 'PROJECT',
  CLOSED = 'CLOSED',
  REJECTED = 'REJECTED',
  MERGED = 'MERGED',
}

export enum SourceType {
  CITIZEN = 'CITIZEN',
  COMMUNITY = 'COMMUNITY',
  PRI = 'PRI',
  ULB = 'ULB',
  GOVERNMENT = 'GOVERNMENT',
  UNIVERSITY = 'UNIVERSITY',
  NGO = 'NGO',
  INDUSTRY = 'INDUSTRY',
  OTHER = 'OTHER',
}

export enum ActionTrack {
  RESOLVE = 'RESOLVE',
  RESEARCH = 'RESEARCH',
  INNOVATE = 'INNOVATE',
}

export enum VerificationStatus {
  UNVERIFIED = 'UNVERIFIED',
  AI_REVIEWED = 'AI_REVIEWED',
  HUMAN_REVIEWED = 'HUMAN_REVIEWED',
  FIELD_VERIFIED = 'FIELD_VERIFIED',
}

export enum Visibility {
  PUBLIC = 'PUBLIC',
  ECOSYSTEM_ONLY = 'ECOSYSTEM_ONLY',
  PROJECT_PARTICIPANTS = 'PROJECT_PARTICIPANTS',
  GOVERNMENT_ONLY = 'GOVERNMENT_ONLY',
  OWNER_ONLY = 'OWNER_ONLY',
}

export enum ModerationStatus {
  SAFE = 'SAFE',
  REVIEW_REQUIRED = 'REVIEW_REQUIRED',
  REJECTED = 'REJECTED',
}

// ── Challenge Clustering ─────────────────────────────────────

export enum ClusterLevel {
  INDIVIDUAL = 'INDIVIDUAL',
  RELATED = 'RELATED',
  CLUSTERED = 'CLUSTERED',
  SYSTEMIC_CLUSTER = 'SYSTEMIC_CLUSTER',
  MISSION_CANDIDATE = 'MISSION_CANDIDATE',
  MISSION = 'MISSION',
}

// ── Evidence ─────────────────────────────────────────────────

export enum EvidenceType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT',
  AUDIO = 'AUDIO',
}

// ── Existing Solutions ───────────────────────────────────────

export enum SolutionMatchCategory {
  ADOPT = 'ADOPT',
  ADAPT = 'ADAPT',
  INSPIRE = 'INSPIRE',
  NO_MATCH = 'NO_MATCH',
}

// ── Consortium ───────────────────────────────────────────────

export enum ConsortiumMemberStatus {
  INVITED = 'INVITED',
  VIEWED = 'VIEWED',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  EXPIRED = 'EXPIRED',
  REMOVED = 'REMOVED',
}

export enum ConsortiumRole {
  LEAD = 'LEAD',
  ACADEMIC = 'ACADEMIC',
  RESEARCH = 'RESEARCH',
  INDUSTRY = 'INDUSTRY',
  TECHNOLOGY = 'TECHNOLOGY',
  FIELD = 'FIELD',
  FUNDING = 'FUNDING',
  MENTOR = 'MENTOR',
  OTHER = 'OTHER',
}

// ── Commitment ───────────────────────────────────────────────

export enum CommitmentType {
  IOT_HARDWARE = 'IOT_HARDWARE',
  TECHNICAL_MENTOR = 'TECHNICAL_MENTOR',
  TESTING_FACILITY = 'TESTING_FACILITY',
  LABORATORY_ACCESS = 'LABORATORY_ACCESS',
  FIELD_DEPLOYMENT = 'FIELD_DEPLOYMENT',
  FUNDING_SUPPORT = 'FUNDING_SUPPORT',
  SOFTWARE_API = 'SOFTWARE_API',
  PILOT_LOCATION = 'PILOT_LOCATION',
  OTHER = 'OTHER',
}

export enum CommitmentStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  ALLOCATED = 'ALLOCATED',
  EXHAUSTED = 'EXHAUSTED',
  WITHDRAWN = 'WITHDRAWN',
}

// ── Impact Contract ──────────────────────────────────────────

export enum ImpactContractStatus {
  DRAFT = 'DRAFT',
  PROPOSED = 'PROPOSED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  LOCKED = 'LOCKED',
  AMENDED = 'AMENDED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

// ── Project ──────────────────────────────────────────────────

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  PROPOSAL_SUBMITTED = 'PROPOSAL_SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  PROTOTYPE = 'PROTOTYPE',
  LAB_TESTING = 'LAB_TESTING',
  FIELD_PILOT = 'FIELD_PILOT',
  IMPACT_VERIFICATION = 'IMPACT_VERIFICATION',
  DEPLOYED = 'DEPLOYED',
  SCALED = 'SCALED',
  PAUSED = 'PAUSED',
  CANCELLED = 'CANCELLED',
  FAILED_PILOT = 'FAILED_PILOT',
  NEEDS_REVISION = 'NEEDS_REVISION',
  ARCHIVED = 'ARCHIVED',
}

// ── Impact Metrics ───────────────────────────────────────────

export enum MetricVerificationStatus {
  REPORTED = 'REPORTED',
  MEASURED = 'MEASURED',
  VERIFIED = 'VERIFIED',
}

export enum MetricType {
  TECHNICAL = 'TECHNICAL',
  SOCIAL = 'SOCIAL',
  ENVIRONMENTAL = 'ENVIRONMENTAL',
  ECONOMIC = 'ECONOMIC',
}

// ── AI ───────────────────────────────────────────────────────

export enum AIJobStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  PARTIAL = 'PARTIAL',
  RETRYING = 'RETRYING',
  FAILED = 'FAILED',
}

export enum AIMode {
  MOCK = 'mock',
  LIVE = 'live',
  HYBRID = 'hybrid',
}

// ── Notifications ────────────────────────────────────────────

export enum NotificationEvent {
  CHALLENGE_SUBMITTED = 'CHALLENGE_SUBMITTED',
  CHALLENGE_AI_ANALYZED = 'CHALLENGE_AI_ANALYZED',
  CHALLENGE_DUPLICATE_FLAGGED = 'CHALLENGE_DUPLICATE_FLAGGED',
  CHALLENGE_VALIDATED = 'CHALLENGE_VALIDATED',
  CHALLENGE_ASSIGNED = 'CHALLENGE_ASSIGNED',
  CONSORTIUM_INVITE = 'CONSORTIUM_INVITE',
  CONSORTIUM_FORMED = 'CONSORTIUM_FORMED',
  PROPOSAL_SUBMITTED = 'PROPOSAL_SUBMITTED',
  PROJECT_APPROVED = 'PROJECT_APPROVED',
  MILESTONE_DUE = 'MILESTONE_DUE',
  MILESTONE_COMPLETED = 'MILESTONE_COMPLETED',
  PILOT_STARTED = 'PILOT_STARTED',
  VALIDATION_REQUESTED = 'VALIDATION_REQUESTED',
  IMPACT_VERIFIED = 'IMPACT_VERIFIED',
  PROJECT_DEPLOYED = 'PROJECT_DEPLOYED',
  MISSION_CREATED = 'MISSION_CREATED',
}

// ── Challenge Domains ────────────────────────────────────────

export enum ChallengeDomain {
  WATER_SANITATION = 'WATER_SANITATION',
  AGRICULTURE = 'AGRICULTURE',
  HEALTHCARE = 'HEALTHCARE',
  EDUCATION = 'EDUCATION',
  ENVIRONMENT = 'ENVIRONMENT',
  ENERGY = 'ENERGY',
  URBAN_INFRASTRUCTURE = 'URBAN_INFRASTRUCTURE',
  RURAL_LIVELIHOODS = 'RURAL_LIVELIHOODS',
  ACCESSIBILITY = 'ACCESSIBILITY',
  PUBLIC_ADMINISTRATION = 'PUBLIC_ADMINISTRATION',
  MINING_SAFETY = 'MINING_SAFETY',
  DISASTER_MANAGEMENT = 'DISASTER_MANAGEMENT',
  OTHER = 'OTHER',
}
