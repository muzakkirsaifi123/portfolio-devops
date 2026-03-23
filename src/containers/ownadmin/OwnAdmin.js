import React, {useState, useEffect} from "react";
import "./OwnAdmin.scss";
import {
  greeting,
  socialMediaLinks,
  contactInfo,
  skillsSection,
  techStack,
  workExperiences,
  educationInfo,
  achievementSection,
  blogSection,
  bigProjects
} from "../../portfolio";

const LS_KEY = "ownadmin_overrides";

/* ── Date helpers ──────────────────────────────────────────── */
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const MONTH_SHORT = {
  jan:"01", feb:"02", mar:"03", apr:"04", may:"05", jun:"06",
  jul:"07", aug:"08", sep:"09", oct:"10", nov:"11", dec:"12",
  january:"01", february:"02", march:"03", april:"04",
  june:"06", july:"07", august:"08", september:"09",
  october:"10", november:"11", december:"12"
};

// "July 2021" → "2021-07"   (for <input type="month">)
function toMonthInput(str) {
  if (!str || /present/i.test(str)) return "";
  const parts = str.trim().toLowerCase().split(/\s+/);
  const month = MONTH_SHORT[parts[0]];
  const year  = parts[parts.length - 1];
  return month && /^\d{4}$/.test(year) ? `${year}-${month}` : "";
}

// "2021-07" → "July 2021"
function fromMonthInput(val) {
  if (!val) return "";
  const [year, month] = val.split("-");
  const idx = parseInt(month, 10) - 1;
  return MONTH_NAMES[idx] ? `${MONTH_NAMES[idx]} ${year}` : "";
}

// "July 2021 – Present"  →  { dateStart:"2021-07", dateEnd:"", datePresent:true }
function parseDateRange(str) {
  const parts = String(str || "").split(/\s*[–—-]\s*/);
  const dateStart   = toMonthInput(parts[0] || "");
  const isPresent   = parts.length > 1 && /present/i.test(parts[1]);
  const dateEnd     = isPresent ? "" : toMonthInput(parts[1] || "");
  return {dateStart, dateEnd, datePresent: isPresent};
}

// { dateStart:"2021-07", dateEnd:"", datePresent:true } → "July 2021 – Present"
function formatDateRange(dateStart, dateEnd, datePresent) {
  const s = fromMonthInput(dateStart);
  if (!s) return "";
  if (datePresent) return `${s} – Present`;
  const e = fromMonthInput(dateEnd);
  return e ? `${s} – ${e}` : s;
}

// Extract plain text from react-easy-emoji results (returns array or string)
function emojiToText(val) {
  if (typeof val === "string") return val;
  if (Array.isArray(val))
    return val.map(emojiToText).filter(x => typeof x === "string").join("");
  if (val && typeof val === "object" && val.props)
    return emojiToText(val.props.children);
  return "";
}

function buildInitial() {
  return {
    greeting: {
      username:   greeting.username   || "",
      title:      greeting.title      || "",
      subTitle:   emojiToText(greeting.subTitle),
      resumeLink: greeting.resumeLink || "",
      heroStats: (greeting.heroStats || []).map(s => ({
        value: s.value || "",
        label: s.label || ""
      }))
    },
    socialMediaLinks: {
      github:   socialMediaLinks.github   || "",
      linkedin: socialMediaLinks.linkedin || "",
      gmail:    socialMediaLinks.gmail    || ""
    },
    contactInfo: {
      email_address: contactInfo.email_address || ""
    },
    skillsSection: {
      title:        skillsSection.title    || "",
      subTitle:     skillsSection.subTitle || "",
      skillsBullets: (skillsSection.skills || []).map(emojiToText).join("\n"),
      softwareSkills: (skillsSection.softwareSkills || []).map(s => ({
        skillName:            s.skillName            || "",
        fontAwesomeClassname: s.fontAwesomeClassname || "",
        imageUrl:             s.imageUrl             || ""
      }))
    },
    techStack: {
      experience: (techStack.experience || []).map(e => ({
        Stack:              e.Stack              || "",
        progressPercentage: e.progressPercentage || "70%"
      }))
    },
    workExperiences: {
      experience: (workExperiences.experience || []).map(e => {
        const {dateStart, dateEnd, datePresent} = parseDateRange(e.date || "");
        return {
          role:           e.role    || "",
          company:        e.company || "",
          companylogoUrl: typeof e.companylogo === "string" && e.companylogo.startsWith("http")
                            ? e.companylogo : "",
          dateStart,
          dateEnd,
          datePresent,
          desc:           e.desc || "",
          descBullets:    (e.descBullets || []).join("\n")
        };
      })
    },
    educationInfo: {
      schools: (educationInfo.schools || []).map(s => ({
        schoolName:  s.schoolName  || "",
        subHeader:   s.subHeader   || "",
        logoUrl:     typeof s.logo === "string" && s.logo.startsWith("http") ? s.logo : "",
        duration:    s.duration    || "",
        desc:        s.desc        || "",
        descBullets: (s.descBullets || []).join("\n")
      }))
    },
    achievementSection: {
      achievementsCards: (achievementSection.achievementsCards || []).map(c => ({
        title:    c.title    || "",
        subtitle: c.subtitle || "",
        imageUrl: typeof c.image === "string" && c.image.startsWith("http") ? c.image : "",
        certUrl:  (c.footerLink && c.footerLink[0] && c.footerLink[0].url) || ""
      }))
    },
    blogSection: {
      subtitle: blogSection.subtitle || "",
      blogs: (blogSection.blogs || []).map(b => ({
        title:       b.title       || "",
        url:         b.url         || "",
        description: b.description || ""
      }))
    },
    bigProjects: {
      projects: (bigProjects.projects || []).map(p => ({
        projectName: p.projectName || "",
        projectDesc: p.projectDesc || "",
        imageUrl:    typeof p.image === "string" && p.image.startsWith("http") ? p.image : ""
      }))
    }
  };
}

const TABS = [
  {id: "profile",      label: "Profile"},
  {id: "skills",       label: "Skills"},
  {id: "skillicons",   label: "Skill Icons"},
  {id: "proficiency",  label: "Proficiency"},
  {id: "experience",   label: "Experience"},
  {id: "education",    label: "Education"},
  {id: "achievements", label: "Achievements"},
  {id: "blogs",        label: "Blogs"},
  {id: "projects",     label: "Projects"}
];

export default function OwnAdmin() {
  const [tab, setTab]   = useState("profile");
  const [form, setForm] = useState(buildInitial);
  const [saved, setSaved] = useState(false);

  // Keep form in sync if localStorage already has overrides
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) JSON.parse(raw); // validate JSON only; form is already initialised from live data
    } catch (e) {}
  }, []);

  /* ── helpers ─────────────────────────────────────────────── */
  const set = (section, field, value) =>
    setForm(f => ({...f, [section]: {...f[section], [field]: value}}));

  const setItem = (section, field, index, subField, value) =>
    setForm(f => {
      const arr = [...f[section][field]];
      arr[index] = {...arr[index], [subField]: value};
      return {...f, [section]: {...f[section], [field]: arr}};
    });

  const addItem = (section, field, template) =>
    setForm(f => ({
      ...f,
      [section]: {...f[section], [field]: [...f[section][field], {...template}]}
    }));

  const removeItem = (section, field, index) =>
    setForm(f => {
      const arr = f[section][field].filter((_, i) => i !== index);
      return {...f, [section]: {...f[section], [field]: arr}};
    });

  /* ── save ────────────────────────────────────────────────── */
  const handleSave = () => {
    const payload = {
      greeting: {
        ...form.greeting,
        heroStats: form.greeting.heroStats || []
      },
      socialMediaLinks: form.socialMediaLinks,
      contactInfo:      form.contactInfo,
      skillsSection: {
        title:    form.skillsSection.title,
        subTitle: form.skillsSection.subTitle,
        skills:   form.skillsSection.skillsBullets
          .split("\n").map(s => s.trim()).filter(Boolean),
        softwareSkills: form.skillsSection.softwareSkills
      },
      techStack: form.techStack,
      workExperiences: {
        experience: form.workExperiences.experience.map(e => ({
          role:           e.role,
          company:        e.company,
          companylogoUrl: e.companylogoUrl,
          date:           formatDateRange(e.dateStart, e.dateEnd, e.datePresent),
          desc:           e.desc,
          descBullets:    e.descBullets
            ? e.descBullets.split("\n").map(s => s.trim()).filter(Boolean)
            : []
        }))
      },
      educationInfo: {
        schools: form.educationInfo.schools.map(s => ({
          ...s,
          descBullets: s.descBullets
            ? s.descBullets.split("\n").map(x => x.trim()).filter(Boolean)
            : []
        }))
      },
      achievementSection: {
        achievementsCards: form.achievementSection.achievementsCards.map(c => ({
          title:      c.title,
          subtitle:   c.subtitle,
          imageUrl:   c.imageUrl,
          footerLink: c.certUrl ? [{name: "Certification", url: c.certUrl}] : []
        }))
      },
      blogSection: {
        subtitle: form.blogSection.subtitle,
        blogs:    form.blogSection.blogs
      },
      bigProjects: {
        projects: form.bigProjects.projects
      }
    };

    localStorage.setItem(LS_KEY, JSON.stringify(payload));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePreview = () => {
    // Full page reload so portfolio.js picks up the new localStorage overrides
    window.location.href = "/";
  };

  /* ── render ──────────────────────────────────────────────── */
  return (
    <div className="oa-wrap">
      <header className="oa-header">
        <span className="oa-logo">
          <span className="oa-bracket">&lt;</span>
          OwnAdmin
          <span className="oa-bracket">/&gt;</span>
        </span>
        <span className="oa-sub">Live site editor — changes saved to localStorage</span>
        <div className="oa-header-actions">
          <button className="oa-btn oa-btn--save" onClick={handleSave}>
            {saved ? "Saved!" : "Save Changes"}
          </button>
          <button className="oa-btn oa-btn--preview" onClick={handlePreview}>
            Preview Site
          </button>
          <button
            className="oa-btn oa-btn--reset"
            onClick={() => {
              if (window.confirm("Clear all overrides and reset to defaults?")) {
                localStorage.removeItem(LS_KEY);
                setForm(buildInitial());
              }
            }}
          >
            Reset
          </button>
        </div>
      </header>

      <div className="oa-body">
        {/* Sidebar */}
        <nav className="oa-tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`oa-tab${tab === t.id ? " oa-tab--active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Panel */}
        <div className="oa-panel">

          {/* ── PROFILE ── */}
          {tab === "profile" && (
            <section>
              <h2 className="oa-section-title">Profile</h2>
              <div className="oa-group">
                <h3 className="oa-group-title">Greeting</h3>
                <OaField label="Username (logo name)" value={form.greeting.username}   onChange={v => set("greeting","username",v)} />
                <OaField label="Hero Title"            value={form.greeting.title}      onChange={v => set("greeting","title",v)} />
                <OaField label="Subtitle / tagline"    value={form.greeting.subTitle}   onChange={v => set("greeting","subTitle",v)} textarea />
                <OaField label="Resume Link (URL)"     value={form.greeting.resumeLink} onChange={v => set("greeting","resumeLink",v)} />
              </div>
              <div className="oa-group">
                <h3 className="oa-group-title">Social Links</h3>
                <OaField label="GitHub URL"    value={form.socialMediaLinks.github}   onChange={v => set("socialMediaLinks","github",v)} />
                <OaField label="LinkedIn URL"  value={form.socialMediaLinks.linkedin} onChange={v => set("socialMediaLinks","linkedin",v)} />
                <OaField label="Gmail address" value={form.socialMediaLinks.gmail}    onChange={v => set("socialMediaLinks","gmail",v)} />
              </div>
              <div className="oa-group">
                <h3 className="oa-group-title">Contact</h3>
                <OaField label="Contact Email" value={form.contactInfo.email_address} onChange={v => set("contactInfo","email_address",v)} />
              </div>
              <div className="oa-group">
                <h3 className="oa-group-title">Hero Stats (4 counters below intro)</h3>
                {(form.greeting.heroStats || []).map((s, i) => (
                  <div key={i} style={{display:"flex", gap:"12px", marginBottom:"12px", alignItems:"flex-end"}}>
                    <OaField label={`#${i+1} Value`} value={s.value} onChange={v => setItem("greeting","heroStats",i,"value",v)} />
                    <OaField label="Label"            value={s.label} onChange={v => setItem("greeting","heroStats",i,"label",v)} />
                    <button className="oa-remove" style={{marginBottom:"16px"}} onClick={() => removeItem("greeting","heroStats",i)}>✕</button>
                  </div>
                ))}
                <button className="oa-add" onClick={() => addItem("greeting","heroStats",{value:"",label:""})}>
                  + Add Stat
                </button>
              </div>
            </section>
          )}

          {/* ── SKILLS ── */}
          {tab === "skills" && (
            <section>
              <h2 className="oa-section-title">Skills Section</h2>
              <div className="oa-group">
                <OaField label="Section Title"                     value={form.skillsSection.title}        onChange={v => set("skillsSection","title",v)} />
                <OaField label="Section Subtitle"                  value={form.skillsSection.subTitle}     onChange={v => set("skillsSection","subTitle",v)} />
                <OaField label="Skill bullets (one per line, use ⚡ emoji prefix)" value={form.skillsSection.skillsBullets} onChange={v => set("skillsSection","skillsBullets",v)} textarea rows={8} />
              </div>
            </section>
          )}

          {/* ── SKILL ICONS ── */}
          {tab === "skillicons" && (
            <section>
              <h2 className="oa-section-title">Skill Icons / Tools</h2>
              <p className="oa-hint">
                Use <strong>Devicon/FA class</strong> for built-in icons, or upload/paste a URL to override with an image.
                Visit <strong>devicon.dev</strong> for class names.
              </p>
              {form.skillsSection.softwareSkills.map((s, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{s.skillName || `Skill #${i+1}`}</span>
                    <button className="oa-remove" onClick={() => removeItem("skillsSection","softwareSkills",i)}>Remove</button>
                  </div>
                  <OaField label="Skill Name"      value={s.skillName}            onChange={v => setItem("skillsSection","softwareSkills",i,"skillName",v)} />
                  <OaField label="Devicon/FA class" value={s.fontAwesomeClassname} onChange={v => setItem("skillsSection","softwareSkills",i,"fontAwesomeClassname",v)} />
                  <OaImageField label="Logo image (URL or upload — overrides class)" value={s.imageUrl} onChange={v => setItem("skillsSection","softwareSkills",i,"imageUrl",v)} />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("skillsSection","softwareSkills",{skillName:"",fontAwesomeClassname:"",imageUrl:""})}>
                + Add Skill Icon
              </button>
            </section>
          )}

          {/* ── PROFICIENCY ── */}
          {tab === "proficiency" && (
            <section>
              <h2 className="oa-section-title">Proficiency Bars</h2>
              {form.techStack.experience.map((e, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">#{i + 1}</span>
                    <button className="oa-remove" onClick={() => removeItem("techStack","experience",i)}>Remove</button>
                  </div>
                  <OaField label="Stack / Technology"      value={e.Stack}              onChange={v => setItem("techStack","experience",i,"Stack",v)} />
                  <OaField label="Percentage (e.g. 85%)"   value={e.progressPercentage} onChange={v => setItem("techStack","experience",i,"progressPercentage",v)} />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("techStack","experience",{Stack:"",progressPercentage:"70%"})}>
                + Add Skill Bar
              </button>
            </section>
          )}

          {/* ── EXPERIENCE ── */}
          {tab === "experience" && (
            <section>
              <h2 className="oa-section-title">Work Experience</h2>
              <p className="oa-hint">Company logo: paste a public image URL (CDN, GitHub raw, etc.).</p>
              {form.workExperiences.experience.map((e, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{e.role || `Entry #${i+1}`} @ {e.company}</span>
                    <button className="oa-remove" onClick={() => removeItem("workExperiences","experience",i)}>Remove</button>
                  </div>
                  <OaField label="Role / Title"        value={e.role}           onChange={v => setItem("workExperiences","experience",i,"role",v)} />
                  <OaField label="Company"             value={e.company}        onChange={v => setItem("workExperiences","experience",i,"company",v)} />
                  <OaImageField label="Company Logo (URL or upload)" value={e.companylogoUrl} onChange={v => setItem("workExperiences","experience",i,"companylogoUrl",v)} />
                  <OaDateRange
                    dateStart={e.dateStart}
                    dateEnd={e.dateEnd}
                    datePresent={e.datePresent}
                    onStart={v  => setItem("workExperiences","experience",i,"dateStart",v)}
                    onEnd={v    => setItem("workExperiences","experience",i,"dateEnd",v)}
                    onPresent={v => setItem("workExperiences","experience",i,"datePresent",v)}
                  />
                  <OaField label="Description"         value={e.desc}           onChange={v => setItem("workExperiences","experience",i,"desc",v)} textarea />
                  <OaField label="Bullet points (one per line)" value={e.descBullets} onChange={v => setItem("workExperiences","experience",i,"descBullets",v)} textarea rows={4} />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("workExperiences","experience",{role:"",company:"",companylogoUrl:"",dateStart:"",dateEnd:"",datePresent:false,desc:"",descBullets:""})}>
                + Add Experience
              </button>
            </section>
          )}

          {/* ── EDUCATION ── */}
          {tab === "education" && (
            <section>
              <h2 className="oa-section-title">Education</h2>
              <p className="oa-hint">School logo: paste a public image URL.</p>
              {form.educationInfo.schools.map((s, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{s.schoolName || `School #${i+1}`}</span>
                    <button className="oa-remove" onClick={() => removeItem("educationInfo","schools",i)}>Remove</button>
                  </div>
                  <OaField label="School Name"          value={s.schoolName} onChange={v => setItem("educationInfo","schools",i,"schoolName",v)} />
                  <OaImageField label="School Logo (URL or upload)" value={s.logoUrl} onChange={v => setItem("educationInfo","schools",i,"logoUrl",v)} />
                  <OaField label="Degree / Subheader"   value={s.subHeader}  onChange={v => setItem("educationInfo","schools",i,"subHeader",v)} />
                  <OaField label="Duration"             value={s.duration}   onChange={v => setItem("educationInfo","schools",i,"duration",v)} />
                  <OaField label="Description"          value={s.desc}       onChange={v => setItem("educationInfo","schools",i,"desc",v)} textarea />
                  <OaField label="Bullet points (one per line)" value={s.descBullets} onChange={v => setItem("educationInfo","schools",i,"descBullets",v)} textarea rows={4} />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("educationInfo","schools",{schoolName:"",logoUrl:"",subHeader:"",duration:"",desc:"",descBullets:""})}>
                + Add School
              </button>
            </section>
          )}

          {/* ── ACHIEVEMENTS ── */}
          {tab === "achievements" && (
            <section>
              <h2 className="oa-section-title">Achievements &amp; Certifications</h2>
              <p className="oa-hint">Badge image: paste a public image URL (e.g. Credly badge PNG).</p>
              {form.achievementSection.achievementsCards.map((c, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{c.title || `Card #${i+1}`}</span>
                    <button className="oa-remove" onClick={() => removeItem("achievementSection","achievementsCards",i)}>Remove</button>
                  </div>
                  <OaField label="Title"               value={c.title}    onChange={v => setItem("achievementSection","achievementsCards",i,"title",v)} />
                  <OaField label="Subtitle"            value={c.subtitle} onChange={v => setItem("achievementSection","achievementsCards",i,"subtitle",v)} textarea />
                  <OaImageField label="Badge / Image (URL or upload)" value={c.imageUrl} onChange={v => setItem("achievementSection","achievementsCards",i,"imageUrl",v)} />
                  <OaField label="Certificate URL"     value={c.certUrl}  onChange={v => setItem("achievementSection","achievementsCards",i,"certUrl",v)} />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("achievementSection","achievementsCards",{title:"",subtitle:"",imageUrl:"",certUrl:""})}>
                + Add Achievement
              </button>
            </section>
          )}

          {/* ── BLOGS ── */}
          {tab === "blogs" && (
            <section>
              <h2 className="oa-section-title">Blogs</h2>
              <div className="oa-group">
                <OaField label="Section Subtitle" value={form.blogSection.subtitle} onChange={v => set("blogSection","subtitle",v)} />
              </div>
              {form.blogSection.blogs.map((b, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{b.title || `Blog #${i+1}`}</span>
                    <button className="oa-remove" onClick={() => removeItem("blogSection","blogs",i)}>Remove</button>
                  </div>
                  <OaField label="Title"       value={b.title}       onChange={v => setItem("blogSection","blogs",i,"title",v)} />
                  <OaField label="URL"         value={b.url}         onChange={v => setItem("blogSection","blogs",i,"url",v)} />
                  <OaField label="Description" value={b.description} onChange={v => setItem("blogSection","blogs",i,"description",v)} textarea />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("blogSection","blogs",{title:"",url:"",description:""})}>
                + Add Blog
              </button>
            </section>
          )}

          {/* ── PROJECTS ── */}
          {tab === "projects" && (
            <section>
              <h2 className="oa-section-title">Projects</h2>
              <p className="oa-hint">Project image: paste a public image URL.</p>
              {form.bigProjects.projects.map((p, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{p.projectName || `Project #${i+1}`}</span>
                    <button className="oa-remove" onClick={() => removeItem("bigProjects","projects",i)}>Remove</button>
                  </div>
                  <OaField label="Project Name"   value={p.projectName} onChange={v => setItem("bigProjects","projects",i,"projectName",v)} />
                  <OaImageField label="Project Image (URL or upload)" value={p.imageUrl} onChange={v => setItem("bigProjects","projects",i,"imageUrl",v)} />
                  <OaField label="Description"    value={p.projectDesc} onChange={v => setItem("bigProjects","projects",i,"projectDesc",v)} textarea />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("bigProjects","projects",{projectName:"",projectDesc:"",imageUrl:""})}>
                + Add Project
              </button>
            </section>
          )}

        </div>
      </div>

      {saved && <div className="oa-toast">Saved! Click "Preview Site" to see changes.</div>}
    </div>
  );
}

function OaDateRange({dateStart, dateEnd, datePresent, onStart, onEnd, onPresent}) {
  return (
    <div className="oa-date-range">
      <span className="oa-label">Date Range</span>
      <div className="oa-date-row">
        <label className="oa-date-cell">
          <span className="oa-date-sublabel">Start</span>
          <input
            className="oa-input oa-date-input"
            type="month"
            value={dateStart || ""}
            onChange={e => onStart(e.target.value)}
          />
        </label>

        <span className="oa-date-sep">–</span>

        <label className="oa-date-cell">
          <span className="oa-date-sublabel">End</span>
          <input
            className="oa-input oa-date-input"
            type="month"
            value={dateEnd || ""}
            disabled={!!datePresent}
            onChange={e => onEnd(e.target.value)}
          />
        </label>

        <label className="oa-date-present">
          <input
            type="checkbox"
            checked={!!datePresent}
            onChange={e => onPresent(e.target.checked)}
          />
          <span>Present</span>
        </label>
      </div>
      {(dateStart || dateEnd || datePresent) && (
        <p className="oa-date-preview">
          Preview: <strong>{formatDateRange(dateStart, dateEnd, datePresent) || "—"}</strong>
        </p>
      )}
    </div>
  );
}

function OaField({label, value, onChange, textarea, rows = 3}) {
  return (
    <label className="oa-field">
      <span className="oa-label">{label}</span>
      {textarea ? (
        <textarea
          className="oa-input oa-textarea"
          rows={rows}
          value={value || ""}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <input
          className="oa-input"
          type="text"
          value={value || ""}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

// Image input: accepts URL text OR file upload (converts to data URL)
function OaImageField({label, value, onChange}) {
  const fileRef = React.useRef();

  const handleFile = e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="oa-field">
      <span className="oa-label">{label}</span>
      <div className="oa-img-row">
        <input
          className="oa-input oa-img-url"
          type="text"
          placeholder="Paste image URL  —  or upload a file →"
          value={value && !value.startsWith("data:") ? value : ""}
          onChange={e => onChange(e.target.value)}
        />
        <button
          type="button"
          className="oa-img-upload-btn"
          onClick={() => fileRef.current.click()}
          title="Upload from device"
        >
          Upload
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{display: "none"}}
          onChange={handleFile}
        />
      </div>
      {value && (
        <div className="oa-img-preview">
          <img src={value} alt="preview" />
          <button className="oa-img-clear" onClick={() => onChange("")}>✕</button>
        </div>
      )}
    </div>
  );
}
