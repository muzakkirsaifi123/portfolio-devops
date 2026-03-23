import React, {useState, useContext} from "react";
import "./WorkExperience.scss";
import {workExperiences} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

function extractYear(date) {
  const m = String(date || "").match(/\b(20\d{2}|19\d{2})\b/g);
  return m ? m : [];
}

/* ── Track node (logo beacon above each card) ── */
function TrackNode({card, isActive, isDimmed, onHover, onLeave}) {
  const years = extractYear(card.date);
  const label = years.length >= 2
    ? `${years[0]} – ${years[years.length - 1]}`
    : years[0] || "";

  return (
    <div
      className={[
        "epc-node",
        isActive ? "epc-node--active" : "",
        isDimmed ? "epc-node--dim"    : "",
      ].filter(Boolean).join(" ")}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Radar rings */}
      <div className="epc-node-rings" aria-hidden="true">
        <div className="epc-node-ring epc-node-ring--1" />
        <div className="epc-node-ring epc-node-ring--2" />
        {/* Logo sits centred inside the rings */}
        <div className="epc-node-logo">
          <img src={card.companylogo} alt={card.company} />
        </div>
      </div>

      {/* Year label */}
      {label && <span className="epc-node-year">{label}</span>}

      {/* Connector arrow pointing down to the card */}
      <div className="epc-node-arrow" aria-hidden="true" />
    </div>
  );
}

/* ── Experience card ── */
function ExpCard({card, isDark, isActive, isDimmed, onHover, onLeave}) {
  return (
    <div
      className={[
        "epc",
        isDark   ? "epc--dark"   : "",
        isActive ? "epc--active" : "",
        isDimmed ? "epc--dimmed" : "",
      ].filter(Boolean).join(" ")}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="epc-inner">
        <div className="epc-glow" aria-hidden="true" />

        {/* Compact header */}
        <div className="epc-header">
          <div className="epc-logo-wrap">
            <img src={card.companylogo} alt={card.company} className="epc-logo" />
          </div>
          <div className="epc-meta">
            <h3 className="epc-role">{card.role}</h3>
            <h4 className="epc-company">{card.company}</h4>
            <span className="epc-date">{card.date}</span>
          </div>
          <div className="epc-chevron" aria-hidden="true">
            <i className={`fas fa-chevron-${isActive ? "up" : "down"}`} />
          </div>
        </div>

        {/* Expandable detail */}
        <div className="epc-detail">
          {card.desc && <p className="epc-desc">{card.desc}</p>}
          {card.descBullets && card.descBullets.length > 0 && (
            <ul className="epc-bullets">
              {card.descBullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function WorkExperience() {
  const {isDark} = useContext(StyleContext);
  const [hovered, setHovered] = useState(null);

  if (!workExperiences.display) return null;

  const cards   = workExperiences.experience;
  const cols    = Math.min(cards.length, 4);

  return (
    <div id="experience">
      <div className="experience-container">
        <h1
          className={isDark ? "dark-mode experience-heading" : "experience-heading"}
          data-reveal="up"
        >
          Experiences
        </h1>

        {/* ── Animated track ── */}
        <div className="epc-track">
          {/* Shimmer rail line */}
          <div className="epc-track-rail" aria-hidden="true">
            <div className="epc-track-rail-glow" />
          </div>

          {/* Beacon nodes */}
          <div
            className="epc-track-nodes"
            style={{"--exp-cols": cols}}
          >
            {cards.map((card, i) => (
              <TrackNode
                key={i}
                card={card}
                isActive={hovered === i}
                isDimmed={hovered !== null && hovered !== i}
                onHover={() => setHovered(i)}
                onLeave={() => setHovered(null)}
              />
            ))}
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div
          className="epc-grid"
          style={{"--exp-cols": cols}}
        >
          {cards.map((card, i) => (
            <ExpCard
              key={i}
              card={card}
              isDark={isDark}
              isActive={hovered === i}
              isDimmed={hovered !== null && hovered !== i}
              onHover={() => setHovered(i)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
