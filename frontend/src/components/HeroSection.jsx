import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, MapPin } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import NestLogo from "@/assets/NestLogo.svg";

/* ── Vetted · Hireable · Ready pill badge ─────────────────────────── */
const VettedBadge = () => (
  <svg
    viewBox="0 0 320 40"
    width="320"
    height="40"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Vetted · Hireable · Ready"
  >
    {/* pill background */}
    <rect x="1" y="1" width="318" height="38" rx="19" ry="19"
      fill="#f0ebe0" stroke="#c8b99a" strokeWidth="1.2" />

    {/* left decorative diamond/spark */}
    <path d="M22 20 L26 16 L30 20 L26 24 Z" fill="#4a6741" opacity="0.85" />

    {/* text */}
    <text
      x="50%" y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="'Georgia', 'Times New Roman', serif"
      fontSize="11.5"
      letterSpacing="2.8"
      fill="#4a6741"
      fontWeight="600"
    >
      VETTED · HIREABLE · READY
    </text>

    {/* right decorative diamond/spark */}
    <path d="M290 20 L294 16 L298 20 L294 24 Z" fill="#4a6741" opacity="0.85" />
  </svg>
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

  return (
    <div
      className="text-center min-h-[88vh] flex items-center justify-center"
      style={{ background: "#f5f2e8" }}
    >
      <div className="flex flex-col items-center gap-5 my-10 w-full max-w-2xl px-4">

        {/* ── Logo ── */}
        <img
          src={NestLogo}
          alt="Hire Nest Logo"
          className="w-28 h-28 object-contain drop-shadow-sm"
          style={{ filter: "drop-shadow(0 2px 6px rgba(74,103,65,0.10))" }}
        />

        {/* ── HIRE NEST heading ── */}
        <h1
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "clamp(2.6rem, 6vw, 4rem)",
            fontWeight: "800",
            letterSpacing: "0.18em",
            lineHeight: 1,
            margin: 0,
          }}
        >
          <span style={{ color: "#2c2415" }}>HIRE </span>
          <span style={{ color: "#4a6741" }}>NEST</span>
        </h1>

        {/* ── Vetted · Hireable · Ready badge ── */}
        <VettedBadge />

        {/* ── Sub-tagline ── */}
        <p
          style={{
            fontFamily: "'Georgia', serif",
            color: "#7a6a52",
            fontSize: "0.92rem",
            letterSpacing: "0.03em",
            lineHeight: 1.7,
            maxWidth: "420px",
            marginTop: "-4px",
          }}
        >
          Discover opportunities matched to your skills — every role curated,
          every candidate career-ready.
        </p>

        {/* ── Search bar (unchanged layout) ── */}
        <div
          className="flex w-full shadow-md border bg-white pl-4 rounded-full items-center gap-3 mx-auto"
          style={{ borderColor: "#d9cdb8" }}
        >
          <Search className="h-4 w-4 flex-shrink-0" style={{ color: "#9a8a6a" }} />
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-sm py-3 bg-transparent"
            style={{ color: "#2c2415" }}
          />

          {/* subtle divider */}
          <span
            className="hidden sm:block self-stretch my-2"
            style={{ width: "1px", background: "#d9cdb8" }}
          />

          {/* location hint */}
          <div className="hidden sm:flex items-center gap-1.5 pr-3 whitespace-nowrap">
            <MapPin className="h-3.5 w-3.5" style={{ color: "#9a8a6a" }} />
            <span className="text-xs" style={{ color: "#9a8a6a" }}>
              Mumbai, IN
            </span>
          </div>

          <Button
            onClick={searchJobHandler}
            className="rounded-r-full rounded-l-none px-6 py-3 h-full text-sm font-semibold text-white transition-colors duration-150"
            style={{ background: "#4a6741" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#3a5233")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#4a6741")}
          >
            Find Jobs
          </Button>
        </div>

        {/* ── Micro social-proof strip ── */}
        <p
          style={{
            fontSize: "0.78rem",
            color: "#a09070",
            letterSpacing: "0.04em",
            marginTop: "-4px",
          }}
        >
          Trusted by&nbsp;
          <span style={{ color: "#4a6741", fontWeight: 600 }}>12,000+</span>
          &nbsp;professionals &amp;&nbsp;
          <span style={{ color: "#4a6741", fontWeight: 600 }}>800+</span>
          &nbsp;companies
        </p>
      </div>
    </div>
  );
};

export default HeroSection;