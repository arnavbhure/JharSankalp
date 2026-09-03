import { Link } from 'react-router-dom';
import { BrandMark } from '../common/BrandMark';

export function Footer() {
  return (
    <footer
      id="about"
      className="bg-[#123B2A] text-white pt-16 pb-12 border-t border-[#1F5A3D] text-left"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* ── Brand Narrative (5 cols) ── */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <BrandMark size="md" variant="white" />
              <div>
                <span className="text-[1.3rem] font-extrabold text-white tracking-tight leading-none font-sans block">
                  JharSankalp
                </span>
                <span className="text-[11px] font-semibold text-[#F5A623] tracking-wider uppercase mt-0.5 block font-mono">
                  Ideas · Collaboration · Impact
                </span>
              </div>
            </div>

            <p className="text-[13.5px] text-white/75 leading-relaxed max-w-sm pt-1">
              A civic innovation platform connecting citizens, universities, institutions, and
              startups to identify ground challenges and engineer sustainable solutions across
              Jharkhand.
            </p>

            <div className="pt-2 text-[12px] text-[#F8F6F1]/60 font-mono">
              Govt. of Jharkhand · Dept. of Higher & Technical Education
            </div>
          </div>

          {/* ── Column 1: Platform (2 cols) ── */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[12px] font-mono font-bold uppercase tracking-widest text-[#F5A623]">
              Platform
            </h4>
            <ul className="space-y-2 text-[14px] text-white/80 font-medium">
              <li>
                <Link to="/challenges" className="hover:text-white transition-colors">
                  Challenges
                </Link>
              </li>
              <li>
                <Link to="/ideas" className="hover:text-white transition-colors">
                  Ideas
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="hover:text-[#FA7E61] transition-colors font-bold text-[#FEE1C7]"
                >
                  Active Projects
                </Link>
              </li>
              <li>
                <Link to="/collaborations" className="hover:text-white transition-colors">
                  Collaborations
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-white transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-white transition-colors">
                  Impact
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Column 2: Organization (3 cols) ── */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[12px] font-mono font-bold uppercase tracking-widest text-[#F5A623]">
              Organization
            </h4>
            <ul className="space-y-2 text-[14px] text-white/80 font-medium">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#ecosystem" className="hover:text-white transition-colors">
                  Collaborators
                </a>
              </li>
              <li>
                <a href="#ecosystem" className="hover:text-white transition-colors">
                  Partners
                </a>
              </li>
              <li>
                <Link to="/report" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Column 3: Connect (2 cols) ── */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[12px] font-mono font-bold uppercase tracking-widest text-[#F5A623]">
              Connect
            </h4>
            <ul className="space-y-2 text-[14px] text-white/80 font-medium">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@jharsankalp.gov.in"
                  className="hover:text-white transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Strip ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-white/60">
          <div>© 2026 JharSankalp. Built for collective impact.</div>
          <div className="font-mono text-[11px] text-white/50">
            Smart India Hackathon 2026 · Problem Statement ID: 26043
          </div>
        </div>
      </div>
    </footer>
  );
}
