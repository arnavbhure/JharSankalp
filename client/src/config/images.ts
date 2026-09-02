/**
 * JharSankalp — Centralized Contextual Editorial Photography Assets
 * Authentic photography curated for Jharkhand's societal challenges,
 * university engineering research, and field deployments.
 */

export interface EditorialImage {
  id: string;
  url: string;
  title: string;
  caption: string;
  credit: string;
  alt: string;
}

export const IMAGES = {
  // ── Hero & Regional Landscape ────────────────────────────────
  heroLandscape: {
    id: 'hero-landscape',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    title: 'Rural Community Water Infrastructure',
    caption: 'Hand pump and community water infrastructure in rural Jharkhand',
    credit: 'Pradeep Gaurs / Unsplash',
    alt: 'Rural community gathered near a water access point in Jharkhand',
  },

  // ── Rural Water Infrastructure Challenge ──────────────────────
  waterInfrastructure: {
    id: 'water-infrastructure',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    title: 'Mechanical & Hydraulic Monitoring',
    caption: 'Field telemetry installation on community water pumps in Murhu Block, Khunti',
    credit: 'Science in HD / Unsplash',
    alt: 'Engineer inspecting a water pump pressure transducer and valve system',
  },

  // ── Agriculture & Tribal Farming ──────────────────────────────
  agricultureSoil: {
    id: 'agri-soil',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80',
    title: 'Soil Health & Crop Monitoring',
    caption: 'Tribal smallholders inspecting soil moisture and crop health in Bishunpur, Gumla',
    credit: 'Ashwin Vaswani / Unsplash',
    alt: 'Farmer holding nutrient-rich soil in an agricultural field',
  },

  // ── University Research Laboratory ───────────────────────────
  universityLab: {
    id: 'uni-lab',
    url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    title: 'IoT & Embedded Systems Prototyping',
    caption: 'Birsa Institute of Technology faculty and student research team developing low-power telemetry',
    credit: 'ThisisEngineering / Unsplash',
    alt: 'Engineering students in an electronics lab testing sensor circuits and breadboards',
  },

  // ── Mining Safety & Industrial Context ────────────────────────
  miningSafety: {
    id: 'mining-safety',
    url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80',
    title: 'Subsidence Monitoring & Topography',
    caption: 'Geotechnical monitoring equipment deployed near reclaimed mine zones in Jharia, Dhanbad',
    credit: 'Ricardo Gomez Angel / Unsplash',
    alt: 'Industrial surveying and seismic measurement equipment in a mining region',
  },

  // ── Community Assembly & PRI Verification ─────────────────────
  communityAssembly: {
    id: 'community-assembly',
    url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1000&q=80',
    title: 'Panchayat Ground Verification',
    caption: 'Village council and residents reviewing field pilot outcomes during a community social audit',
    credit: 'Annie Spratt / Unsplash',
    alt: 'Community group meeting outdoors for deliberation and planning',
  },
} as const;
