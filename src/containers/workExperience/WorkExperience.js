import React, {useContext} from "react";
import "./WorkExperience.scss";
import {workExperiences} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

// Extract the start year from a date string like "July 2021 – Jan 2022"
function extractYear(date) {
  const m = String(date || "").match(/\b(20\d{2}|19\d{2})\b/);
  return m ? m[1] : null;
}

function TimelineCard({card, isDark, index}) {
  const isEven = index % 2 === 0;
  const year = extractYear(card.date);

  return (
    <div
      data-reveal={isEven ? "left" : "right"}
      style={{transitionDelay: `${index * 0.15}s`}}
      className={`timeline-item ${isEven ? "timeline-item--left" : "timeline-item--right"}`}
    >
      <div className="timeline-dot">
        <img src={card.companylogo} alt={card.company} className="timeline-logo" />
        {year && <span className="timeline-year">{year}</span>}
      </div>

      {/* flip wrapper */}
      <div className="flip-card">
        <div className="flip-card-inner">

          {/* FRONT — logo + role + date */}
          <div className={isDark ? "flip-card-front flip-card-front--dark" : "flip-card-front"}>
            <div className="flip-front-logo">
              <img src={card.companylogo} alt={card.company} className="flip-company-logo" />
            </div>
            <h3 className="flip-role">{card.role}</h3>
            <h4 className="flip-company">{card.company}</h4>
            <span className="flip-date">{card.date}</span>
          </div>

          {/* BACK — full description */}
          <div className={isDark ? "flip-card-back flip-card-back--dark" : "flip-card-back"}>
            <h3 className="flip-back-role">{card.role}</h3>
            <h4 className="flip-back-company">{card.company}</h4>
            {card.desc && (
              <p className="flip-back-desc">{card.desc}</p>
            )}
            {card.descBullets && card.descBullets.length > 0 && (
              <ul className="flip-back-bullets">
                {card.descBullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default function WorkExperience() {
  const {isDark} = useContext(StyleContext);
  if (!workExperiences.display) return null;

  return (
    <div id="experience">
      <div className="experience-container" id="workExperience">
        <h1
          className={isDark ? "dark-mode experience-heading" : "experience-heading"}
          data-reveal="up"
        >
          Experiences
        </h1>
        <div className="timeline">
          <div className="timeline-line" />
          {workExperiences.experience.map((card, i) => (
            <TimelineCard key={i} card={card} isDark={isDark} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
