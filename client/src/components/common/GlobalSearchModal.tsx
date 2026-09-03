import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchEcosystem, EcosystemSearchResult } from '../../services/ecosystemApi';
import { Search, X, Target, Lightbulb, Rocket, ArrowRight, CornerDownLeft } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<EcosystemSearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults(searchEcosystem(''));
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const res = searchEcosystem(query);
    setResults(res);
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          navigate(results[selectedIndex].url);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  const getTypeBadge = (type: 'CHALLENGE' | 'IDEA' | 'PROJECT') => {
    switch (type) {
      case 'CHALLENGE':
        return {
          icon: Target,
          label: 'CHALLENGE',
          bg: 'bg-[#FEF6E9] text-[#B45309] border-[#F8CCA5]',
        };
      case 'IDEA':
        return {
          icon: Lightbulb,
          label: 'IDEA',
          bg: 'bg-[#FAF5EF] text-[#4C1E4F] border-[#E7DEC8]',
        };
      case 'PROJECT':
      default:
        return {
          icon: Rocket,
          label: 'PROJECT',
          bg: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-[#EEEAE1] overflow-hidden text-left z-10 space-y-0">
        {/* Top Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#EEEAE1]">
          <Search className="h-5 w-5 text-[#6B5845] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search challenges, ideas, or projects across Jharkhand..."
            className="w-full text-[15px] font-medium text-[#1D2522] placeholder:text-[#6B5845]/60 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-[#6B5845] hover:text-[#1D2522] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <span className="hidden sm:inline-block text-[11px] font-mono text-[#6B5845] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#EEEAE1]">
            ESC to close
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-3 divide-y divide-[#EEEAE1]/60">
          {results.length > 0 ? (
            results.map((item, idx) => {
              const badge = getTypeBadge(item.type);
              const BadgeIcon = badge.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={`${item.type}-${item.id}`}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => {
                    navigate(item.url);
                    onClose();
                  }}
                  className={`p-3.5 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#FAF9F5] border border-[#EEEAE1]' : 'hover:bg-[#FAF9F5]/60'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border ${badge.bg}`}
                    >
                      <BadgeIcon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono font-bold uppercase px-2 py-0.2 rounded border ${badge.bg}`}
                        >
                          {badge.label}
                        </span>
                        <span className="text-[11px] font-mono text-[#6B5845] truncate">
                          {item.subtitle}
                        </span>
                      </div>

                      <h4 className="text-[14px] font-bold text-[#1D2522] truncate leading-tight">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isSelected && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-[#6B5845]">
                        <span>Open</span>
                        <CornerDownLeft className="h-3 w-3" />
                      </span>
                    )}
                    <ArrowRight className="h-4 w-4 text-[#6B5845]" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center space-y-2">
              <p className="text-[14px] font-bold text-[#1D2522]">No matching initiatives found</p>
              <p className="text-[12.5px] text-[#6B5845]">
                Try searching for keywords like &ldquo;Water&rdquo;, &ldquo;Mining&rdquo;,
                &ldquo;Khunti&rdquo;, &ldquo;Dhanbad&rdquo;, or &ldquo;Soil&rdquo;.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-[#FAF9F5] border-t border-[#EEEAE1] flex items-center justify-between text-[11px] font-mono text-[#6B5845]">
          <span>Tip: Use ↑ ↓ arrows to navigate, Enter to select</span>
          <span>JharSankalp Unified Intelligence</span>
        </div>
      </div>
    </div>
  );
}
