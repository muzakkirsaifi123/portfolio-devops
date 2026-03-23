import React, {useEffect, useRef, useState} from "react";
import "./NavTransition.scss";

export default function NavTransition({section, onDone}) {
  const [phase, setPhase] = useState("enter"); // enter → hold → exit
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    // Empty deps — timers fire once per mount, never reset on re-renders
    const t1 = setTimeout(() => setPhase("hold"), 50);
    const t2 = setTimeout(() => setPhase("exit"), 900);
    const t3 = setTimeout(() => onDoneRef.current(), 1300);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!section) return null;

  return (
    <div className={`nav-transition nav-transition--${phase}`}>
      <div className="nav-transition-inner">
        <div className="nav-transition-logo">
          <span className="ntl-bracket">&lt;</span>
          <span className="ntl-name">MuZakkir Saifi</span>
          <span className="ntl-bracket">/&gt;</span>
        </div>
        <p className="nav-transition-label">{section.label}</p>
        <div className="nav-transition-bar">
          <span />
        </div>
      </div>
    </div>
  );
}
