import { useState, useMemo } from 'react';
import { ImpactHero } from '../../components/impact/ImpactHero';
import { ImpactJourney } from '../../components/impact/ImpactJourney';
import { ImpactFilters } from '../../components/impact/ImpactFilters';
import { ImpactOverview } from '../../components/impact/ImpactOverview';
import { FeaturedImpactStory } from '../../components/impact/FeaturedImpactStory';
import { DomainImpact } from '../../components/impact/DomainImpact';
import { CommunityOutcomes } from '../../components/impact/CommunityOutcomes';
import { RecentImpactFeed } from '../../components/impact/RecentImpactFeed';
import { GovernmentInsightCTA } from '../../components/impact/GovernmentInsightCTA';
import { ImpactFinalCTA } from '../../components/impact/ImpactFinalCTA';
import { Footer } from '../../components/layout/Footer';
import {
  DISTRICTS_IMPACT_DATA,
  DOMAINS_IMPACT_DATA,
  COMMUNITY_QUOTES,
  RECENT_IMPACT_FEED,
} from '../../data/impactData';

export function Impact() {
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedDomain, setSelectedDomain] = useState('All Focus Areas');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('all_time');

  // Filtered Districts
  const filteredDistricts = useMemo(() => {
    let list = [...DISTRICTS_IMPACT_DATA];
    if (selectedDistrict !== 'All Districts') {
      list = list.filter((d) => d.name.toLowerCase() === selectedDistrict.toLowerCase());
    }
    if (selectedDomain !== 'All Focus Areas') {
      list = list.filter((d) => d.primaryDomain.toLowerCase() === selectedDomain.toLowerCase());
    }
    return list.length > 0 ? list : DISTRICTS_IMPACT_DATA;
  }, [selectedDistrict, selectedDomain]);

  // Filtered Domains
  const filteredDomains = useMemo(() => {
    let list = [...DOMAINS_IMPACT_DATA];
    if (selectedDomain !== 'All Focus Areas') {
      list = list.filter((d) => d.name.toLowerCase() === selectedDomain.toLowerCase());
    }
    return list.length > 0 ? list : DOMAINS_IMPACT_DATA;
  }, [selectedDomain]);

  // Filtered Feed Items
  const filteredFeed = useMemo(() => {
    let list = [...RECENT_IMPACT_FEED];
    if (selectedDistrict !== 'All Districts') {
      list = list.filter((f) => f.district.toLowerCase() === selectedDistrict.toLowerCase());
    }
    if (selectedDomain !== 'All Focus Areas') {
      list = list.filter((f) => f.domain.toLowerCase() === selectedDomain.toLowerCase());
    }
    return list.length > 0 ? list : RECENT_IMPACT_FEED;
  }, [selectedDistrict, selectedDomain]);

  const hasActiveFilters =
    selectedDistrict !== 'All Districts' ||
    selectedDomain !== 'All Focus Areas' ||
    selectedTimePeriod !== 'all_time';

  const handleClearFilters = () => {
    setSelectedDistrict('All Districts');
    setSelectedDomain('All Focus Areas');
    setSelectedTimePeriod('all_time');
  };

  const scrollToOverview = () => {
    const el = document.getElementById('analytics-overview');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStory = () => {
    const el = document.getElementById('featured-story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col justify-between relative">
      <div>
        {/* ── 1. Impact Hero ── */}
        <ImpactHero
          onExploreDataClick={scrollToOverview}
          onReadStoryClick={scrollToStory}
        />

        {/* ── Main Content Area ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
          {/* ── 2. Transformation Pipeline Journey ── */}
          <ImpactJourney />

          {/* ── 3. Client-Side Audit Filters ── */}
          <ImpactFilters
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
            selectedDomain={selectedDomain}
            onDomainChange={setSelectedDomain}
            selectedTimePeriod={selectedTimePeriod}
            onTimePeriodChange={setSelectedTimePeriod}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* ── 4. Impact Overview & District Geographic Reach ── */}
          <ImpactOverview districts={filteredDistricts} />

          {/* ── 5. Featured Human Impact Story (Murhu Block) ── */}
          <FeaturedImpactStory />

          {/* ── 6. Domain Reach & Outcomes ── */}
          <DomainImpact domains={filteredDomains} />

          {/* ── 7. Community Testimonials / Qualitative Voices ── */}
          <CommunityOutcomes quotes={COMMUNITY_QUOTES} />

          {/* ── 8. Recent Impact Activity Feed ── */}
          <RecentImpactFeed items={filteredFeed} />

          {/* ── 9. State Innovation Intelligence (Gov CTA) ── */}
          <GovernmentInsightCTA />

          {/* ── 10. Final Ecosystem CTA ── */}
          <ImpactFinalCTA />
        </div>
      </div>

      {/* ── 11. Footer ── */}
      <Footer />
    </div>
  );
}
