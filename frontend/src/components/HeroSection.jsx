import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, MapPin, Briefcase, Building2, Users, ArrowRight, Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import NestLogo from "@/assets/NestLogo.svg";

/* ── Vetted · Hireable · Ready pill badge ─────────────────────────── */
const VettedBadge = () => (
  <svg viewBox="0 0 320 40" width="320" height="40" xmlns="http://www.w3.org/2000/svg" aria-label="Vetted · Hireable · Ready">
    <rect x="1" y="1" width="318" height="38" rx="19" ry="19" fill="#f0ebe0" stroke="#c8b99a" strokeWidth="1.2" />
    <path d="M22 20 L26 16 L30 20 L26 24 Z" fill="#4a6741" opacity="0.85" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
      fontFamily="'Georgia', 'Times New Roman', serif"
      fontSize="11.5" letterSpacing="2.8" fill="#4a6741" fontWeight="600">
      VETTED · HIREABLE · READY
    </text>
    <path d="M290 20 L294 16 L298 20 L294 24 Z" fill="#4a6741" opacity="0.85" />
  </svg>
);

/* ── Trending roles shown in hero ─────────────────────────────────── */
const trendingRoles = [
  "Frontend Developer",
  "Data Science",
  "Product Manager",
  "DevOps Engineer",
  "UI/UX Designer",
];

/* ── Mini stat pill ───────────────────────────────────────────────── */
const StatPill = ({ icon: Icon, value, label }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: "8px",
    padding: "0.55rem 1rem",
    backgroundColor: "#fdfaf4",
    border: "1px solid #e0d5c0",
    borderRadius: "999px",
    boxShadow: "0 1px 4px rgba(74,103,65,0.07)",
  }}>
    <div style={{
      width: "28px", height: "28px", borderRadius: "8px",
      backgroundColor: "#eaf2e4", display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Icon size={14} style={{ color: "#4a6741" }} />
    </div>
    <div style={{ lineHeight: 1.2 }}>
      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#2c2415", fontFamily: "Georgia, serif" }}>{value}</div>
      <div style={{ fontSize: "0.68rem", color: "#9a8a6a", letterSpacing: "0.03em" }}>{label}</div>
    </div>
  </div>
);

/* ── Component ────────────────────────────────────────────────────── */
const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleRoleClick = (role) => {
    dispatch(setSearchedQuery(role));
    navigate("/browse");
  };

  return (
    <div
      className="text-center min-h-[88vh] flex items-center justify-center"
      style={{ background: "linear-gradient(170deg, #f8f5ec 0%, #f0ebe0 60%, #eae3d0 100%)" }}
    >
      <div className="flex flex-col items-center gap-5 my-10 w-full max-w-2xl px-4"
        style={{ marginTop: "-1rem" }}
      >

        {/* ── Logo ── */}
        <img
          src={NestLogo}
          alt="Hire Nest Logo"
          className="w-50 h-50 object-contain"
          style={{ filter: "drop-shadow(0 2px 8px rgba(74,103,65,0.14))" }}
        />

        {/* ── Live badge ── */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "4px 14px 4px 8px",
          backgroundColor: "#eaf2e4",
          border: "1px solid #b8d4a8",
          borderRadius: "999px",
          fontSize: "0.72rem",
          fontWeight: 600,
          color: "#3a5a1c",
          letterSpacing: "0.05em",
        }}>
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%",
            backgroundColor: "#4a6741",
            boxShadow: "0 0 0 3px rgba(74,103,65,0.2)",
            display: "inline-block",
          }} />
          320+ NEW JOBS THIS WEEK
        </div>

        {/* ── HIRE NEST heading ── */}
        <h1 style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: "clamp(2.6rem, 6vw, 4rem)",
          fontWeight: 800,
          letterSpacing: "0.18em",
          lineHeight: 1,
          margin: 0,
        }}>
          <span style={{ color: "#2c2415" }}>HIRE </span>
          <span style={{ color: "#4a6741" }}>NEST</span>
        </h1>

        {/* ── Vetted badge ── */}
        <VettedBadge />

        {/* ── Sub-tagline ── */}
        <p style={{
          fontFamily: "Georgia, serif",
          color: "#7a6a52",
          fontSize: "0.95rem",
          letterSpacing: "0.03em",
          lineHeight: 1.75,
          maxWidth: "440px",
          marginTop: "-4px",
        }}>
          Discover opportunities matched to your skills — every role curated,
          every candidate career-ready.
        </p>

        {/* ── Search bar ── */}
        <div style={{
          display: "flex", width: "100%",
          boxShadow: "0 4px 20px rgba(74,100,65,0.13)",
          border: "1px solid #d9cdb8",
          borderRadius: "999px",
          backgroundColor: "#fff",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0 0 0 1rem",
        }}>
          <Search size={16} style={{ color: "#9a8a6a", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
            style={{
              outline: "none", border: "none", width: "100%",
              fontSize: "0.875rem", padding: "0.85rem 0",
              backgroundColor: "transparent", color: "#2c2415",
            }}
          />
          <span style={{ width: "1px", background: "#d9cdb8", alignSelf: "stretch", margin: "10px 0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0 0.75rem", whiteSpace: "nowrap" }}>
            <MapPin size={14} style={{ color: "#9a8a6a" }} />
            <span style={{ fontSize: "0.78rem", color: "#9a8a6a" }}>India</span>
          </div>
          <Button
            onClick={searchJobHandler}
            style={{
              borderRadius: "0 999px 999px 0",
              padding: "0 1.5rem",
              height: "50px",
              fontSize: "0.875rem",
              fontWeight: 600,
              backgroundColor: "#4a6741",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              transition: "background 0.15s ease",
              flexShrink: 0,
              display: "flex", alignItems: "center", gap: "6px",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#3a5233"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#4a6741"}
          >
            Find Jobs
          </Button>
        </div>

        {/* ── Trending roles ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", alignItems: "center" }}>
          <span style={{ fontSize: "0.75rem", color: "#9a8a6a", letterSpacing: "0.04em", fontWeight: 500 }}>
            Trending:
          </span>
          {trendingRoles.map((role) => (
            <button
              key={role}
              onClick={() => handleRoleClick(role)}
              style={{
                padding: "0.3rem 0.85rem",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                border: "1px solid #d9cdb8",
                backgroundColor: "#fdfaf4",
                color: "#4a3f2f",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "#4a6741";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "#4a6741";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "#fdfaf4";
                e.currentTarget.style.color = "#4a3f2f";
                e.currentTarget.style.borderColor = "#d9cdb8";
              }}
            >
              {role}
            </button>
          ))}
        </div>

        {/* ── Stats pills row ── */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "0.75rem",
          justifyContent: "center", marginTop: "0.5rem",
        }}>
          <StatPill icon={Briefcase} value="12,000+" label="Jobs Posted" />
          <StatPill icon={Building2} value="800+" label="Companies" />
          <StatPill icon={Users} value="50,000+" label="Job Seekers" />
        </div>

        {/* ── CTA links ── */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "0.25rem" }}>
          <button
            onClick={() => navigate("/jobs")}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              fontSize: "0.82rem", fontWeight: 600, color: "#4a6741",
              background: "none", border: "none", cursor: "pointer",
              textDecoration: "underline", textUnderlineOffset: "3px",
            }}
          >
            Browse all jobs <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;