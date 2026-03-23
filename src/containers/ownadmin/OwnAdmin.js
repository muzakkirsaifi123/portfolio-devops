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

// Build initial form state from current portfolio data (includes prior overrides)
function buildInitial() {
  return {
    greeting: {
      username: greeting.username || "",
      title: greeting.title || "",
      subTitle: (typeof greeting.subTitle === "string" ? greeting.subTitle : String(greeting.subTitle)) || "",
      resumeLink: greeting.resumeLink || ""
    },
    socialMediaLinks: {
      github: socialMediaLinks.github || "",
      linkedin: socialMediaLinks.linkedin || "",
      gmail: socialMediaLinks.gmail || ""
    },
    contactInfo: {
      email_address: contactInfo.email_address || ""
    },
    skillsSection: {
      title: skillsSection.title || "",
      subTitle: skillsSection.subTitle || "",
      skillsBullets: (skillsSection.skills || [])
        .map(s => (typeof s === "string" ? s : String(s)))
        .join("\n")
    },
    techStack: {
      experience: (techStack.experience || []).map(e => ({
        Stack: e.Stack,
        progressPercentage: e.progressPercentage
      }))
    },
    workExperiences: {
      experience: (workExperiences.experience || []).map(e => ({
        role: e.role || "",
        company: e.company || "",
        date: e.date || "",
        desc: e.desc || "",
        descBullets: (e.descBullets || []).join("\n")
      }))
    },
    educationInfo: {
      schools: (educationInfo.schools || []).map(s => ({
        schoolName: s.schoolName || "",
        subHeader: s.subHeader || "",
        duration: s.duration || "",
        desc: s.desc || "",
        descBullets: (s.descBullets || []).join("\n")
      }))
    },
    achievementSection: {
      achievementsCards: (achievementSection.achievementsCards || []).map(c => ({
        title: c.title || "",
        subtitle: c.subtitle || "",
        certUrl: (c.footerLink && c.footerLink[0] && c.footerLink[0].url) || ""
      }))
    },
    blogSection: {
      subtitle: blogSection.subtitle || "",
      blogs: (blogSection.blogs || []).map(b => ({
        title: b.title || "",
        url: b.url || "",
        description: b.description || ""
      }))
    },
    bigProjects: {
      projects: (bigProjects.projects || []).map(p => ({
        projectName: p.projectName || "",
        projectDesc: p.projectDesc || ""
      }))
    }
  };
}

const TABS = [
  {id: "profile",      label: "Profile"},
  {id: "skills",       label: "Skills"},
  {id: "proficiency",  label: "Proficiency"},
  {id: "experience",   label: "Experience"},
  {id: "education",    label: "Education"},
  {id: "achievements", label: "Achievements"},
  {id: "blogs",        label: "Blogs"},
  {id: "projects",     label: "Projects"}
];

export default function OwnAdmin() {
  const [tab, setTab] = useState("profile");
  const [form, setForm] = useState(buildInitial);
  const [saved, setSaved] = useState(false);

  // Load existing overrides from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const ov = JSON.parse(raw);
        setForm(prev => {
          const merged = {...prev};
          if (ov.greeting)          merged.greeting          = {...prev.greeting,          ...buildInitial().greeting,          ...ov.greeting};
          if (ov.socialMediaLinks)  merged.socialMediaLinks  = {...prev.socialMediaLinks,  ...ov.socialMediaLinks};
          if (ov.contactInfo)       merged.contactInfo       = {...prev.contactInfo,       ...ov.contactInfo};
          return merged;
        });
      }
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
      [section]: {...f[section], [field]: [...f[section][field], template]}
    }));

  const removeItem = (section, field, index) =>
    setForm(f => {
      const arr = f[section][field].filter((_, i) => i !== index);
      return {...f, [section]: {...f[section], [field]: arr}};
    });

  /* ── save ────────────────────────────────────────────────── */
  const handleSave = () => {
    // Convert bullet textareas back to arrays
    const payload = {
      greeting:         form.greeting,
      socialMediaLinks: form.socialMediaLinks,
      contactInfo:      form.contactInfo,
      skillsSection: {
        ...form.skillsSection,
        skills: form.skillsSection.skillsBullets
          .split("\n")
          .map(s => s.trim())
          .filter(Boolean)
      },
      techStack: form.techStack,
      workExperiences: {
        experience: form.workExperiences.experience.map(e => ({
          ...e,
          descBullets: e.descBullets
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
          title: c.title,
          subtitle: c.subtitle,
          footerLink: c.certUrl ? [{name: "Certification", url: c.certUrl}] : []
        }))
      },
      blogSection: {
        subtitle: form.blogSection.subtitle,
        blogs: form.blogSection.blogs
      },
      bigProjects: {
        projects: form.bigProjects.projects
      }
    };

    localStorage.setItem(LS_KEY, JSON.stringify(payload));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClearAndPreview = () => {
    // Navigate to home — portfolio.js will pick up overrides on next load
    window.location.href = window.location.pathname.replace(/\/ownadmin$/, "") + window.location.search.replace(/[?&]ownadmin/, "") || "/";
  };

  /* ── render tabs ─────────────────────────────────────────── */
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
          <button className="oa-btn oa-btn--preview" onClick={handleClearAndPreview}>
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
        {/* ── Sidebar tabs ── */}
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

        {/* ── Panel ── */}
        <div className="oa-panel">

          {/* PROFILE */}
          {tab === "profile" && (
            <section>
              <h2 className="oa-section-title">Profile</h2>
              <div className="oa-group">
                <h3 className="oa-group-title">Greeting</h3>
                <OaField label="Username (logo name)" value={form.greeting.username} onChange={v => set("greeting","username",v)} />
                <OaField label="Hero Title" value={form.greeting.title} onChange={v => set("greeting","title",v)} />
                <OaField label="Subtitle / tagline" value={form.greeting.subTitle} onChange={v => set("greeting","subTitle",v)} textarea />
                <OaField label="Resume Link (URL)" value={form.greeting.resumeLink} onChange={v => set("greeting","resumeLink",v)} />
              </div>
              <div className="oa-group">
                <h3 className="oa-group-title">Social Links</h3>
                <OaField label="GitHub URL" value={form.socialMediaLinks.github} onChange={v => set("socialMediaLinks","github",v)} />
                <OaField label="LinkedIn URL" value={form.socialMediaLinks.linkedin} onChange={v => set("socialMediaLinks","linkedin",v)} />
                <OaField label="Gmail address" value={form.socialMediaLinks.gmail} onChange={v => set("socialMediaLinks","gmail",v)} />
              </div>
              <div className="oa-group">
                <h3 className="oa-group-title">Contact</h3>
                <OaField label="Contact Email" value={form.contactInfo.email_address} onChange={v => set("contactInfo","email_address",v)} />
              </div>
            </section>
          )}

          {/* SKILLS */}
          {tab === "skills" && (
            <section>
              <h2 className="oa-section-title">Skills</h2>
              <div className="oa-group">
                <OaField label="Section Title" value={form.skillsSection.title} onChange={v => set("skillsSection","title",v)} />
                <OaField label="Section Subtitle" value={form.skillsSection.subTitle} onChange={v => set("skillsSection","subTitle",v)} />
                <OaField label="Skill bullets (one per line)" value={form.skillsSection.skillsBullets} onChange={v => set("skillsSection","skillsBullets",v)} textarea rows={8} />
              </div>
            </section>
          )}

          {/* PROFICIENCY */}
          {tab === "proficiency" && (
            <section>
              <h2 className="oa-section-title">Proficiency Bars</h2>
              {form.techStack.experience.map((e, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">#{i + 1}</span>
                    <button className="oa-remove" onClick={() => removeItem("techStack","experience",i)}>Remove</button>
                  </div>
                  <OaField label="Stack / Technology" value={e.Stack} onChange={v => setItem("techStack","experience",i,"Stack",v)} />
                  <OaField label="Percentage (e.g. 85%)" value={e.progressPercentage} onChange={v => setItem("techStack","experience",i,"progressPercentage",v)} />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("techStack","experience",{Stack:"",progressPercentage:"70%"})}>
                + Add Skill Bar
              </button>
            </section>
          )}

          {/* EXPERIENCE */}
          {tab === "experience" && (
            <section>
              <h2 className="oa-section-title">Work Experience</h2>
              {form.workExperiences.experience.map((e, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{e.role || `Entry #${i+1}`}</span>
                    <button className="oa-remove" onClick={() => removeItem("workExperiences","experience",i)}>Remove</button>
                  </div>
                  <OaField label="Role / Title" value={e.role} onChange={v => setItem("workExperiences","experience",i,"role",v)} />
                  <OaField label="Company" value={e.company} onChange={v => setItem("workExperiences","experience",i,"company",v)} />
                  <OaField label="Date range" value={e.date} onChange={v => setItem("workExperiences","experience",i,"date",v)} />
                  <OaField label="Description" value={e.desc} onChange={v => setItem("workExperiences","experience",i,"desc",v)} textarea />
                  <OaField label="Bullet points (one per line)" value={e.descBullets} onChange={v => setItem("workExperiences","experience",i,"descBullets",v)} textarea rows={4} />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("workExperiences","experience",{role:"",company:"",date:"",desc:"",descBullets:""})}>
                + Add Experience
              </button>
            </section>
          )}

          {/* EDUCATION */}
          {tab === "education" && (
            <section>
              <h2 className="oa-section-title">Education</h2>
              {form.educationInfo.schools.map((s, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{s.schoolName || `School #${i+1}`}</span>
                    <button className="oa-remove" onClick={() => removeItem("educationInfo","schools",i)}>Remove</button>
                  </div>
                  <OaField label="School Name" value={s.schoolName} onChange={v => setItem("educationInfo","schools",i,"schoolName",v)} />
                  <OaField label="Degree / Subheader" value={s.subHeader} onChange={v => setItem("educationInfo","schools",i,"subHeader",v)} />
                  <OaField label="Duration" value={s.duration} onChange={v => setItem("educationInfo","schools",i,"duration",v)} />
                  <OaField label="Description" value={s.desc} onChange={v => setItem("educationInfo","schools",i,"desc",v)} textarea />
                  <OaField label="Bullet points (one per line)" value={s.descBullets} onChange={v => setItem("educationInfo","schools",i,"descBullets",v)} textarea rows={4} />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("educationInfo","schools",{schoolName:"",subHeader:"",duration:"",desc:"",descBullets:""})}>
                + Add School
              </button>
            </section>
          )}

          {/* ACHIEVEMENTS */}
          {tab === "achievements" && (
            <section>
              <h2 className="oa-section-title">Achievements &amp; Certifications</h2>
              {form.achievementSection.achievementsCards.map((c, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{c.title || `Card #${i+1}`}</span>
                    <button className="oa-remove" onClick={() => removeItem("achievementSection","achievementsCards",i)}>Remove</button>
                  </div>
                  <OaField label="Title" value={c.title} onChange={v => setItem("achievementSection","achievementsCards",i,"title",v)} />
                  <OaField label="Subtitle" value={c.subtitle} onChange={v => setItem("achievementSection","achievementsCards",i,"subtitle",v)} textarea />
                  <OaField label="Certificate URL" value={c.certUrl} onChange={v => setItem("achievementSection","achievementsCards",i,"certUrl",v)} />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("achievementSection","achievementsCards",{title:"",subtitle:"",certUrl:""})}>
                + Add Achievement
              </button>
            </section>
          )}

          {/* BLOGS */}
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
                  <OaField label="Title" value={b.title} onChange={v => setItem("blogSection","blogs",i,"title",v)} />
                  <OaField label="URL" value={b.url} onChange={v => setItem("blogSection","blogs",i,"url",v)} />
                  <OaField label="Description" value={b.description} onChange={v => setItem("blogSection","blogs",i,"description",v)} textarea />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("blogSection","blogs",{title:"",url:"",description:""})}>
                + Add Blog
              </button>
            </section>
          )}

          {/* PROJECTS */}
          {tab === "projects" && (
            <section>
              <h2 className="oa-section-title">Projects</h2>
              {form.bigProjects.projects.map((p, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{p.projectName || `Project #${i+1}`}</span>
                    <button className="oa-remove" onClick={() => removeItem("bigProjects","projects",i)}>Remove</button>
                  </div>
                  <OaField label="Project Name" value={p.projectName} onChange={v => setItem("bigProjects","projects",i,"projectName",v)} />
                  <OaField label="Description" value={p.projectDesc} onChange={v => setItem("bigProjects","projects",i,"projectDesc",v)} textarea />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("bigProjects","projects",{projectName:"",projectDesc:""})}>
                + Add Project
              </button>
            </section>
          )}

        </div>
      </div>

      {saved && <div className="oa-toast">Changes saved to localStorage!</div>}
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
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <input
          className="oa-input"
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </label>
  );
}
