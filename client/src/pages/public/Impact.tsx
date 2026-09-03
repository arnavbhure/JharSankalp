import { useState, useMemo, useEffect } from 'react';
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
import {
  fetchImpactAnalytics,
  mapDbRecordToFeedItem,
  ImpactAnalyticsResponse,
} from '../../services/api/impact';
import { ImpactFeedItem } from '../../types/impact';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export function Impact() {
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedDomain, setSelectedDomain] = useState('All Focus Areas');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('all_time');

  // API Data State
  const [apiData, setApiData] = useState<ImpactAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadImpactData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchImpactAnalytics({
        domain: selectedDomain,
        district: selectedDistrict,
      });
      setApiData(data);
    } catch (err: any) {
      setError(err?.message || 'Unable to connect to JharSankalp database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImpactData();
  }, [selectedDomain, selectedDistrict, selectedTimePeriod]);

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

  // Dynamic Activity Feed: Mapped from PostgreSQL records if available
  const feedItems: ImpactFeedItem[] = useMemo(() => {
    if (apiData?.records && apiData.records.length > 0) {
      return apiData.records.map((r, i) => mapDbRecordToFeedItem(r, i));
    }
    return RECENT_IMPACT_FEED;
  }, [apiData]);

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
        <ImpactHero onExploreDataClick={scrollToOverview} onReadStoryClick={scrollToStory} />

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

          {/* ── Loading State ── */}
          {loading && (
            <div className="py-20 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
              <Loader2 className="h-8 w-8 text-[#123B2A] animate-spin mx-auto" />
              <p className="text-[13.5px] font-mono text-[#6B5845]">
                Auditing verified field impact records from JharSankalp database...
              </p>
            </div>
          )}

          {/* ── Error State with Retry ── */}
          {!loading && error && (
            <div className="py-16 text-center rounded-3xl bg-[#FFF5F5] border border-[#FECDD3] p-8 space-y-3">
              <AlertCircle className="h-8 w-8 text-[#BE123C] mx-auto" />
              <h4 className="text-[1.1rem] font-bold text-[#BE123C]">
                Unable to load impact records
              </h4>
              <p className="text-[13px] text-[#6B5845] max-w-md mx-auto">{error}</p>
              <button
                type="button"
                onClick={loadImpactData}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#BE123C] text-white text-[12.5px] font-bold cursor-pointer hover:bg-[#9F1239]"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* ── 4. Impact Overview & District Geographic Reach ── */}
              <ImpactOverview districts={filteredDistricts} />

              {/* ── 5. Featured Human Impact Story (Murhu Block) ── */}
              <FeaturedImpactStory />

              {/* ── 6. Domain Reach & Outcomes ── */}
              <DomainImpact domains={filteredDomains} />

              {/* ── 7. Community Testimonials / Qualitative Voices ── */}
              <CommunityOutcomes quotes={COMMUNITY_QUOTES} />

              {/* ── 8. Recent Impact Activity Feed ── */}
              <RecentImpactFeed items={feedItems} />

              {/* ── 9. State Innovation Intelligence (Gov CTA) ── */}
              <GovernmentInsightCTA />

              {/* ── 10. Final Ecosystem CTA ── */}
              <ImpactFinalCTA />
            </>
          )}
        </div>
      </div>

      {/* ── 11. Footer ── */}
      <Footer />
    </div>
  );
}
