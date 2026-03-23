import React, {useState} from "react";
import "./Admin.scss";
import {
  greeting,
  socialMediaLinks,
  skillsSection,
  techStack,
  workExperiences,
  educationInfo,
  bigProjects,
  achievementSection,
  blogSection
} from "../../portfolio";

/* ─── image path map for known assets ───────────────────────── */
const LOGO_MAP = {
  Knoldus: "./assets/images/knol.png",
  Nashtech: "./assets/images/nash.png"
};
const PROJECT_IMG_MAP = {
  "EMS-Duck Creek": "./assets/images/DCT.webp",
  "3-tier logic": "./assets/images/3TL.png"
};
const SCHOOL_IMG_MAP = {
  "Dr. A.P.J Abdul Kalam University, Lucknow": "./assets/images/logo.png"
};
const CERT_IMG_MAP = {
  "Google Associate Certificate": "./assets/images/GCP_associate_certficate.png",
  "Microsoft Certified: DevOps Engineer Expert":
    "./assets/images/badge-devops-expert.webp",
  "Microsoft Certified: Azure Database Administrator Associate":
    "./assets/images/microsoft-certified-associate.webp",
  "Microsoft Certified: Azure Fundamentals": "./assets/images/azure_fun.webp",
  "Microsoft Certified: Security, Compliance, and Identity Fundamentals":
    "./assets/images/azure_fun.webp"
};

/* ─── portfolio.js generator ────────────────────────────────── */
function ri(path) {
  return path ? `require("${path}")` : "null";
}

function buildPortfolioJs(d) {
  return `/* Change this file to get your personal Portfolio */
// To change portfolio colors globally go to the _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation";

const splashScreen = { enabled: true, animation: splashAnimation, duration: 2000 };

const illustration = { animated: true };

const greeting = {
  username: ${JSON.stringify(d.username)},
  title: ${JSON.stringify(d.title)},
  subTitle: emoji(${JSON.stringify(d.subTitle)}),
  resumeLink: ${JSON.stringify(d.resumeLink)},
  displayGreeting: true
};

const socialMediaLinks = {
  github:   ${JSON.stringify(d.github)},
  linkedin: ${JSON.stringify(d.linkedin)},
  gmail:    ${JSON.stringify(d.gmail)},
  display: true
};

const skillsSection = {
  title: ${JSON.stringify(d.skillsTitle)},
  subTitle: ${JSON.stringify(d.skillsSubTitle)},
  skills: ${JSON.stringify(d.skills.filter(Boolean))},
  softwareSkills: ${JSON.stringify(d.softwareSkills.filter(s => s.skillName), null, 2)},
  display: true
};

const educationInfo = {
  display: true,
  schools: [
${d.schools
  .map(
    s => `    {
      schoolName: ${JSON.stringify(s.schoolName)},
      logo: ${ri(s.logoPath)},
      subHeader: ${JSON.stringify(s.subHeader)},
      duration: ${JSON.stringify(s.duration)},
      desc: ${JSON.stringify(s.desc)},
      descBullets: ${JSON.stringify(s.descBullets.filter(Boolean))}
    }`
  )
  .join(",\n")}
  ]
};

const techStack = {
  viewSkillBars: true,
  experience: [
${d.proficiency
  .filter(p => p.stack)
  .map(
    p => `    { Stack: ${JSON.stringify(p.stack)}, progressPercentage: ${JSON.stringify(p.percent)} }`
  )
  .join(",\n")}
  ],
  displayCodersrank: false
};

const workExperiences = {
  display: true,
  experience: [
${d.experiences
  .map(
    e => `    {
      role: ${JSON.stringify(e.role)},
      company: ${JSON.stringify(e.company)},
      companylogo: ${ri(e.logoPath)},
      date: ${JSON.stringify(e.date)},
      desc: ${JSON.stringify(e.desc)},
      descBullets: ${JSON.stringify(e.descBullets.filter(Boolean))}
    }`
  )
  .join(",\n")}
  ]
};

const openSource = {
  showGithubProfile: "true",
  display: true
};

const bigProjects = {
  title: ${JSON.stringify(d.projectsTitle)},
  subtitle: ${JSON.stringify(d.projectsSubtitle)},
  projects: [
${d.projects
  .map(
    p => `    {
      image: ${ri(p.imagePath)},
      projectName: ${JSON.stringify(p.projectName)},
      projectDesc: ${JSON.stringify(p.projectDesc)},
      footerLink: ${JSON.stringify(p.footerLinks.filter(l => l.name))}
    }`
  )
  .join(",\n")}
  ],
  display: true
};

const achievementSection = {
  title: emoji(${JSON.stringify(d.achievementsTitle)}),
  subtitle: ${JSON.stringify(d.achievementsSubtitle)},
  achievementsCards: [
${d.achievements
  .map(
    a => `    {
      title: ${JSON.stringify(a.title)},
      subtitle: ${JSON.stringify(a.subtitle)},
      image: ${ri(a.imagePath)},
      imageAlt: ${JSON.stringify(a.title)},
      footerLink: ${JSON.stringify(a.footerLinks.filter(l => l.name))}
    }`
  )
  .join(",\n")}
  ],
  display: true
};

const blogSection = {
  title: ${JSON.stringify(d.blogsTitle)},
  subtitle: ${JSON.stringify(d.blogsSubtitle)},
  displayMediumBlogs: "false",
  blogs: [
${d.blogs
  .filter(b => b.title)
  .map(
    b => `    {
      url: ${JSON.stringify(b.url)},
      title: ${JSON.stringify(b.title)},
      description: ${JSON.stringify(b.description)}
    }`
  )
  .join(",\n")}
  ],
  display: true
};

const talkSection = {
  title: "TALKS",
  subtitle: emoji("I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"),
  talks: [],
  display: false
};

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",
  podcast: [],
  display: false
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle: "Discuss a project or just want to say hi? My Inbox is open for all.",
  email_address: ${JSON.stringify(d.gmail)}
};

const twitterDetails = {
  userName: "twitter",
  display: false
};

const isHireable = false;

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable
};
`;
}

function downloadFile(content, filename) {
  const blob = new Blob([content], {type: "text/javascript"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ─── helpers for building initial state ────────────────────── */
function initExperiences() {
  if (!workExperiences?.experience) return [];
  return workExperiences.experience.map(e => ({
    role: e.role || "",
    company: e.company || "",
    logoPath: LOGO_MAP[e.company] || "",
    date: e.date || "",
    desc: e.desc || "",
    descBullets: e.descBullets ? [...e.descBullets] : [""]
  }));
}

function initSchools() {
  if (!educationInfo?.schools) return [];
  return educationInfo.schools.map(s => ({
    schoolName: s.schoolName || "",
    logoPath: SCHOOL_IMG_MAP[s.schoolName] || "",
    subHeader: s.subHeader || "",
    duration: s.duration || "",
    desc: s.desc || "",
    descBullets: s.descBullets ? [...s.descBullets] : [""]
  }));
}

function initProjects() {
  if (!bigProjects?.projects) return [];
  return bigProjects.projects.map(p => ({
    projectName: p.projectName || "",
    imagePath: PROJECT_IMG_MAP[p.projectName] || "",
    projectDesc: p.projectDesc || "",
    footerLinks: p.footerLink?.length
      ? p.footerLink.map(l => ({name: l.name || "", url: l.url || ""}))
      : [{name: "", url: ""}]
  }));
}

function initAchievements() {
  if (!achievementSection?.achievementsCards) return [];
  return achievementSection.achievementsCards.map(a => ({
    title: a.title || "",
    imagePath: CERT_IMG_MAP[a.title] || "",
    subtitle: a.subtitle || "",
    footerLinks: a.footerLink?.length
      ? a.footerLink.map(l => ({name: l.name || "", url: l.url || ""}))
      : [{name: "", url: ""}]
  }));
}

function initBlogs() {
  if (!blogSection?.blogs) return [];
  return blogSection.blogs.map(b => ({
    title: b.title || "",
    url: b.url || "",
    description: b.description || ""
  }));
}

/* ─── Component ──────────────────────────────────────────────── */
export default function Admin() {
  const [auth, setAuth] = useState(
    localStorage.getItem("admin_auth") === "yes"
  );
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    /* greeting */
    username: greeting.username || "",
    title: greeting.title || "",
    subTitle:
      typeof greeting.subTitle === "string" ? greeting.subTitle : "",
    resumeLink: greeting.resumeLink || "",
    /* social */
    github: socialMediaLinks.github || "",
    linkedin: socialMediaLinks.linkedin || "",
    gmail: socialMediaLinks.gmail || "",
    /* skills */
    skillsTitle: skillsSection.title || "",
    skillsSubTitle: skillsSection.subTitle || "",
    skills: skillsSection.skills
      ? skillsSection.skills.map(s =>
          typeof s === "string" ? s : s?.props?.children?.join?.("") || ""
        )
      : [""],
    softwareSkills: skillsSection.softwareSkills
      ? skillsSection.softwareSkills.map(s => ({
          skillName: s.skillName || "",
          fontAwesomeClassname: s.fontAwesomeClassname || ""
        }))
      : [{skillName: "", fontAwesomeClassname: ""}],
    /* proficiency */
    proficiency: techStack?.experience
      ? techStack.experience.map(p => ({
          stack: p.Stack || "",
          percent: p.progressPercentage || "50%"
        }))
      : [{stack: "", percent: "50%"}],
    /* work experience */
    experiences: initExperiences(),
    /* education */
    schools: initSchools(),
    /* projects */
    projectsTitle: bigProjects?.title || "Big Projects",
    projectsSubtitle: bigProjects?.subtitle || "",
    projects: initProjects(),
    /* achievements */
    achievementsTitle:
      typeof achievementSection?.title === "string"
        ? achievementSection.title
        : "Achievements And Certifications",
    achievementsSubtitle: achievementSection?.subtitle || "",
    achievements: initAchievements(),
    /* blogs */
    blogsTitle: blogSection?.title || "Blogs",
    blogsSubtitle: blogSection?.subtitle || "",
    blogs: initBlogs()
  });

  /* ── auth ── */
  function handleLogin(e) {
    e.preventDefault();
    const adminPass = process.env.REACT_APP_ADMIN_PASSWORD || "admin123";
    if (password === adminPass) {
      localStorage.setItem("admin_auth", "yes");
      setAuth(true);
    } else {
      alert(
        "Wrong password. Set REACT_APP_ADMIN_PASSWORD in .env (default: admin123)"
      );
    }
  }

  function handleLogout() {
    localStorage.removeItem("admin_auth");
    setAuth(false);
  }

  /* ── generic setters ── */
  function set(key, value) {
    setForm(f => ({...f, [key]: value}));
  }

  /* skills */
  function setSkill(i, v) {
    const a = [...form.skills];
    a[i] = v;
    set("skills", a);
  }
  function addSkill() {
    set("skills", [...form.skills, ""]);
  }
  function removeSkill(i) {
    set("skills", form.skills.filter((_, idx) => idx !== i));
  }

  /* software skills */
  function setSoftSkill(i, key, v) {
    const a = [...form.softwareSkills];
    a[i] = {...a[i], [key]: v};
    set("softwareSkills", a);
  }
  function addSoftSkill() {
    set("softwareSkills", [
      ...form.softwareSkills,
      {skillName: "", fontAwesomeClassname: ""}
    ]);
  }
  function removeSoftSkill(i) {
    set(
      "softwareSkills",
      form.softwareSkills.filter((_, idx) => idx !== i)
    );
  }

  /* proficiency */
  function setProf(i, key, v) {
    const a = [...form.proficiency];
    a[i] = {...a[i], [key]: v};
    set("proficiency", a);
  }
  function addProf() {
    set("proficiency", [...form.proficiency, {stack: "", percent: "50%"}]);
  }
  function removeProf(i) {
    set(
      "proficiency",
      form.proficiency.filter((_, idx) => idx !== i)
    );
  }

  /* experiences */
  function setExp(i, key, v) {
    const a = [...form.experiences];
    a[i] = {...a[i], [key]: v};
    set("experiences", a);
  }
  function setExpBullet(i, j, v) {
    const a = [...form.experiences];
    const bullets = [...a[i].descBullets];
    bullets[j] = v;
    a[i] = {...a[i], descBullets: bullets};
    set("experiences", a);
  }
  function addExp() {
    set("experiences", [
      ...form.experiences,
      {role: "", company: "", logoPath: "", date: "", desc: "", descBullets: [""]}
    ]);
  }
  function removeExp(i) {
    set(
      "experiences",
      form.experiences.filter((_, idx) => idx !== i)
    );
  }

  /* schools */
  function setSchool(i, key, v) {
    const a = [...form.schools];
    a[i] = {...a[i], [key]: v};
    set("schools", a);
  }
  function setSchoolBullet(i, j, v) {
    const a = [...form.schools];
    const bullets = [...a[i].descBullets];
    bullets[j] = v;
    a[i] = {...a[i], descBullets: bullets};
    set("schools", a);
  }
  function addSchool() {
    set("schools", [
      ...form.schools,
      {schoolName: "", logoPath: "", subHeader: "", duration: "", desc: "", descBullets: [""]}
    ]);
  }
  function removeSchool(i) {
    set("schools", form.schools.filter((_, idx) => idx !== i));
  }

  /* projects */
  function setProj(i, key, v) {
    const a = [...form.projects];
    a[i] = {...a[i], [key]: v};
    set("projects", a);
  }
  function setProjLink(i, j, key, v) {
    const a = [...form.projects];
    const links = [...a[i].footerLinks];
    links[j] = {...links[j], [key]: v};
    a[i] = {...a[i], footerLinks: links};
    set("projects", a);
  }
  function addProj() {
    set("projects", [
      ...form.projects,
      {projectName: "", imagePath: "", projectDesc: "", footerLinks: [{name: "", url: ""}]}
    ]);
  }
  function removeProj(i) {
    set("projects", form.projects.filter((_, idx) => idx !== i));
  }

  /* achievements */
  function setAch(i, key, v) {
    const a = [...form.achievements];
    a[i] = {...a[i], [key]: v};
    set("achievements", a);
  }
  function setAchLink(i, j, key, v) {
    const a = [...form.achievements];
    const links = [...a[i].footerLinks];
    links[j] = {...links[j], [key]: v};
    a[i] = {...a[i], footerLinks: links};
    set("achievements", a);
  }
  function addAch() {
    set("achievements", [
      ...form.achievements,
      {title: "", imagePath: "", subtitle: "", footerLinks: [{name: "", url: ""}]}
    ]);
  }
  function removeAch(i) {
    set("achievements", form.achievements.filter((_, idx) => idx !== i));
  }

  /* blogs */
  function setBlog(i, key, v) {
    const a = [...form.blogs];
    a[i] = {...a[i], [key]: v};
    set("blogs", a);
  }
  function addBlog() {
    set("blogs", [...form.blogs, {title: "", url: "", description: ""}]);
  }
  function removeBlog(i) {
    set("blogs", form.blogs.filter((_, idx) => idx !== i));
  }

  /* ── download ── */
  function handleDownload() {
    downloadFile(buildPortfolioJs(form), "portfolio.js");
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  /* ── login ── */
  if (!auth) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <h1 className="admin-logo">
            &lt;<span>Admin</span>/&gt;
          </h1>
          <p className="admin-login-hint">
            Default password: <code>admin123</code>
            <br />
            Set <code>REACT_APP_ADMIN_PASSWORD</code> in <code>.env</code> to
            change it.
          </p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              className="admin-input"
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            <button type="submit" className="admin-btn admin-btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── main admin UI ── */
  return (
    <div className="admin-page">
      <header className="admin-header">
        <span className="admin-logo">
          &lt;<span>Portfolio Admin</span>/&gt;
        </span>
        <div className="admin-header-actions">
          <a href="/" className="admin-btn admin-btn-ghost">
            View Site
          </a>
          <button className="admin-btn admin-btn-primary" onClick={handleDownload}>
            {saved ? "Downloaded!" : "Download portfolio.js"}
          </button>
          <button className="admin-btn admin-btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="admin-body">
        <div className="admin-notice">
          <strong>How to use:</strong> Edit fields below, click{" "}
          <em>Download portfolio.js</em>, then replace{" "}
          <code>src/portfolio.js</code> with the downloaded file and run{" "}
          <code>npm run deploy</code>.
        </div>

        {/* ── Greeting ── */}
        <section className="admin-section">
          <h2>Greeting / Hero</h2>
          <div className="admin-grid-2">
            <label>
              Username (nav logo)
              <input
                className="admin-input"
                value={form.username}
                onChange={e => set("username", e.target.value)}
              />
            </label>
            <label>
              Page title (H1)
              <input
                className="admin-input"
                value={form.title}
                onChange={e => set("title", e.target.value)}
              />
            </label>
          </div>
          <label>
            Bio subtitle
            <textarea
              className="admin-input admin-textarea"
              value={form.subTitle}
              onChange={e => set("subTitle", e.target.value)}
            />
          </label>
          <label>
            Resume link
            <input
              className="admin-input"
              value={form.resumeLink}
              onChange={e => set("resumeLink", e.target.value)}
            />
          </label>
        </section>

        {/* ── Social ── */}
        <section className="admin-section">
          <h2>Social Media Links</h2>
          <div className="admin-grid-3">
            <label>
              GitHub URL
              <input
                className="admin-input"
                value={form.github}
                onChange={e => set("github", e.target.value)}
              />
            </label>
            <label>
              LinkedIn URL
              <input
                className="admin-input"
                value={form.linkedin}
                onChange={e => set("linkedin", e.target.value)}
              />
            </label>
            <label>
              Gmail address
              <input
                className="admin-input"
                value={form.gmail}
                onChange={e => set("gmail", e.target.value)}
              />
            </label>
          </div>
        </section>

        {/* ── Skills ── */}
        <section className="admin-section">
          <h2>Skills Section</h2>
          <div className="admin-grid-2">
            <label>
              Section title
              <input
                className="admin-input"
                value={form.skillsTitle}
                onChange={e => set("skillsTitle", e.target.value)}
              />
            </label>
            <label>
              Section subtitle
              <input
                className="admin-input"
                value={form.skillsSubTitle}
                onChange={e => set("skillsSubTitle", e.target.value)}
              />
            </label>
          </div>
          <h3>Skill bullet points</h3>
          {form.skills.map((s, i) => (
            <div key={i} className="admin-row-with-btn">
              <input
                className="admin-input"
                value={s}
                placeholder={`Skill ${i + 1}`}
                onChange={e => setSkill(i, e.target.value)}
              />
              <button
                className="admin-btn admin-btn-danger admin-btn-sm"
                onClick={() => removeSkill(i)}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="admin-btn admin-btn-ghost" onClick={addSkill}>
            + Add bullet
          </button>

          <h3 style={{marginTop: "1.5rem"}}>Tool icons</h3>
          <p className="admin-hint">
            Find classes at{" "}
            <a href="https://devicon.dev" target="_blank" rel="noopener noreferrer">
              devicon.dev
            </a>
          </p>
          <div className="admin-skills-grid">
            {form.softwareSkills.map((sk, i) => (
              <div key={i} className="admin-skill-row">
                <input
                  className="admin-input"
                  placeholder="Tool name"
                  value={sk.skillName}
                  onChange={e => setSoftSkill(i, "skillName", e.target.value)}
                />
                <input
                  className="admin-input"
                  placeholder="Icon class (e.g. devicon-docker-plain colored)"
                  value={sk.fontAwesomeClassname}
                  onChange={e =>
                    setSoftSkill(i, "fontAwesomeClassname", e.target.value)
                  }
                />
                <i className={`${sk.fontAwesomeClassname} admin-icon-preview`} />
                <button
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  onClick={() => removeSoftSkill(i)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button
            className="admin-btn admin-btn-ghost"
            onClick={addSoftSkill}
            style={{marginTop: "8px"}}
          >
            + Add icon
          </button>
        </section>

        {/* ── Proficiency ── */}
        <section className="admin-section">
          <h2>Proficiency Bars</h2>
          {form.proficiency.map((p, i) => (
            <div key={i} className="admin-row-with-btn" style={{gap: "8px"}}>
              <input
                className="admin-input"
                placeholder="Skill name (e.g. CI/CD)"
                value={p.stack}
                onChange={e => setProf(i, "stack", e.target.value)}
              />
              <input
                className="admin-input"
                placeholder="e.g. 85%"
                style={{maxWidth: "100px"}}
                value={p.percent}
                onChange={e => setProf(i, "percent", e.target.value)}
              />
              <button
                className="admin-btn admin-btn-danger admin-btn-sm"
                onClick={() => removeProf(i)}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="admin-btn admin-btn-ghost" onClick={addProf}>
            + Add bar
          </button>
        </section>

        {/* ── Work Experience ── */}
        <section className="admin-section">
          <h2>Work Experience</h2>
          {form.experiences.map((e, i) => (
            <div key={i} className="admin-card">
              <div className="admin-card-header">
                <span>Experience #{i + 1}</span>
                <button
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  onClick={() => removeExp(i)}
                >
                  Remove
                </button>
              </div>
              <div className="admin-grid-2">
                <label>
                  Role / Title
                  <input
                    className="admin-input"
                    value={e.role}
                    onChange={ev => setExp(i, "role", ev.target.value)}
                  />
                </label>
                <label>
                  Company
                  <input
                    className="admin-input"
                    value={e.company}
                    onChange={ev => setExp(i, "company", ev.target.value)}
                  />
                </label>
              </div>
              <div className="admin-grid-2">
                <label>
                  Date range
                  <input
                    className="admin-input"
                    placeholder="e.g. Jan 2022 – Present"
                    value={e.date}
                    onChange={ev => setExp(i, "date", ev.target.value)}
                  />
                </label>
                <label>
                  Logo image path (in src/)
                  <input
                    className="admin-input"
                    placeholder="./assets/images/company.png"
                    value={e.logoPath}
                    onChange={ev => setExp(i, "logoPath", ev.target.value)}
                  />
                </label>
              </div>
              <label>
                Description
                <textarea
                  className="admin-input admin-textarea"
                  value={e.desc}
                  onChange={ev => setExp(i, "desc", ev.target.value)}
                />
              </label>
              <h4>Bullet points</h4>
              {e.descBullets.map((b, j) => (
                <div key={j} className="admin-row-with-btn">
                  <input
                    className="admin-input"
                    value={b}
                    placeholder={`Bullet ${j + 1}`}
                    onChange={ev => setExpBullet(i, j, ev.target.value)}
                  />
                  <button
                    className="admin-btn admin-btn-danger admin-btn-sm"
                    onClick={() => {
                      const a = [...form.experiences];
                      a[i].descBullets = a[i].descBullets.filter(
                        (_, idx) => idx !== j
                      );
                      set("experiences", a);
                    }}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                className="admin-btn admin-btn-ghost"
                style={{marginTop: "4px"}}
                onClick={() => {
                  const a = [...form.experiences];
                  a[i].descBullets = [...a[i].descBullets, ""];
                  set("experiences", a);
                }}
              >
                + Add bullet
              </button>
            </div>
          ))}
          <button className="admin-btn admin-btn-ghost" onClick={addExp}>
            + Add Experience
          </button>
        </section>

        {/* ── Education ── */}
        <section className="admin-section">
          <h2>Education</h2>
          {form.schools.map((s, i) => (
            <div key={i} className="admin-card">
              <div className="admin-card-header">
                <span>School #{i + 1}</span>
                <button
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  onClick={() => removeSchool(i)}
                >
                  Remove
                </button>
              </div>
              <div className="admin-grid-2">
                <label>
                  School name
                  <input
                    className="admin-input"
                    value={s.schoolName}
                    onChange={e => setSchool(i, "schoolName", e.target.value)}
                  />
                </label>
                <label>
                  Degree / Sub-header
                  <input
                    className="admin-input"
                    value={s.subHeader}
                    onChange={e => setSchool(i, "subHeader", e.target.value)}
                  />
                </label>
              </div>
              <div className="admin-grid-2">
                <label>
                  Duration
                  <input
                    className="admin-input"
                    placeholder="e.g. Aug 2017 – May 2021"
                    value={s.duration}
                    onChange={e => setSchool(i, "duration", e.target.value)}
                  />
                </label>
                <label>
                  Logo image path (in src/)
                  <input
                    className="admin-input"
                    placeholder="./assets/images/logo.png"
                    value={s.logoPath}
                    onChange={e => setSchool(i, "logoPath", e.target.value)}
                  />
                </label>
              </div>
              <label>
                Description
                <textarea
                  className="admin-input admin-textarea"
                  value={s.desc}
                  onChange={e => setSchool(i, "desc", e.target.value)}
                />
              </label>
              <h4>Bullet points</h4>
              {s.descBullets.map((b, j) => (
                <div key={j} className="admin-row-with-btn">
                  <input
                    className="admin-input"
                    value={b}
                    placeholder={`Bullet ${j + 1}`}
                    onChange={e => setSchoolBullet(i, j, e.target.value)}
                  />
                  <button
                    className="admin-btn admin-btn-danger admin-btn-sm"
                    onClick={() => {
                      const a = [...form.schools];
                      a[i].descBullets = a[i].descBullets.filter(
                        (_, idx) => idx !== j
                      );
                      set("schools", a);
                    }}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                className="admin-btn admin-btn-ghost"
                style={{marginTop: "4px"}}
                onClick={() => {
                  const a = [...form.schools];
                  a[i].descBullets = [...a[i].descBullets, ""];
                  set("schools", a);
                }}
              >
                + Add bullet
              </button>
            </div>
          ))}
          <button className="admin-btn admin-btn-ghost" onClick={addSchool}>
            + Add School
          </button>
        </section>

        {/* ── Projects ── */}
        <section className="admin-section">
          <h2>Projects</h2>
          <div className="admin-grid-2">
            <label>
              Section title
              <input
                className="admin-input"
                value={form.projectsTitle}
                onChange={e => set("projectsTitle", e.target.value)}
              />
            </label>
            <label>
              Section subtitle
              <input
                className="admin-input"
                value={form.projectsSubtitle}
                onChange={e => set("projectsSubtitle", e.target.value)}
              />
            </label>
          </div>
          {form.projects.map((p, i) => (
            <div key={i} className="admin-card">
              <div className="admin-card-header">
                <span>Project #{i + 1}</span>
                <button
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  onClick={() => removeProj(i)}
                >
                  Remove
                </button>
              </div>
              <div className="admin-grid-2">
                <label>
                  Project name
                  <input
                    className="admin-input"
                    value={p.projectName}
                    onChange={e => setProj(i, "projectName", e.target.value)}
                  />
                </label>
                <label>
                  Image path (in src/)
                  <input
                    className="admin-input"
                    placeholder="./assets/images/project.png"
                    value={p.imagePath}
                    onChange={e => setProj(i, "imagePath", e.target.value)}
                  />
                </label>
              </div>
              <label>
                Description
                <textarea
                  className="admin-input admin-textarea"
                  value={p.projectDesc}
                  onChange={e => setProj(i, "projectDesc", e.target.value)}
                />
              </label>
              <h4>Footer links</h4>
              {p.footerLinks.map((l, j) => (
                <div key={j} className="admin-grid-2" style={{gap: "8px"}}>
                  <input
                    className="admin-input"
                    placeholder="Link label"
                    value={l.name}
                    onChange={e => setProjLink(i, j, "name", e.target.value)}
                  />
                  <input
                    className="admin-input"
                    placeholder="https://..."
                    value={l.url}
                    onChange={e => setProjLink(i, j, "url", e.target.value)}
                  />
                </div>
              ))}
              <button
                className="admin-btn admin-btn-ghost"
                style={{marginTop: "4px"}}
                onClick={() => {
                  const a = [...form.projects];
                  a[i].footerLinks = [...a[i].footerLinks, {name: "", url: ""}];
                  set("projects", a);
                }}
              >
                + Add link
              </button>
            </div>
          ))}
          <button className="admin-btn admin-btn-ghost" onClick={addProj}>
            + Add Project
          </button>
        </section>

        {/* ── Achievements ── */}
        <section className="admin-section">
          <h2>Achievements &amp; Certifications</h2>
          <div className="admin-grid-2">
            <label>
              Section title
              <input
                className="admin-input"
                value={form.achievementsTitle}
                onChange={e => set("achievementsTitle", e.target.value)}
              />
            </label>
            <label>
              Section subtitle
              <input
                className="admin-input"
                value={form.achievementsSubtitle}
                onChange={e => set("achievementsSubtitle", e.target.value)}
              />
            </label>
          </div>
          {form.achievements.map((a, i) => (
            <div key={i} className="admin-card">
              <div className="admin-card-header">
                <span>Certificate #{i + 1}</span>
                <button
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  onClick={() => removeAch(i)}
                >
                  Remove
                </button>
              </div>
              <div className="admin-grid-2">
                <label>
                  Title
                  <input
                    className="admin-input"
                    value={a.title}
                    onChange={e => setAch(i, "title", e.target.value)}
                  />
                </label>
                <label>
                  Image path (in src/)
                  <input
                    className="admin-input"
                    placeholder="./assets/images/cert.png"
                    value={a.imagePath}
                    onChange={e => setAch(i, "imagePath", e.target.value)}
                  />
                </label>
              </div>
              <label>
                Subtitle / description
                <input
                  className="admin-input"
                  value={a.subtitle}
                  onChange={e => setAch(i, "subtitle", e.target.value)}
                />
              </label>
              <h4>Footer links</h4>
              {a.footerLinks.map((l, j) => (
                <div key={j} className="admin-grid-2" style={{gap: "8px"}}>
                  <input
                    className="admin-input"
                    placeholder="Link label"
                    value={l.name}
                    onChange={e => setAchLink(i, j, "name", e.target.value)}
                  />
                  <input
                    className="admin-input"
                    placeholder="https://..."
                    value={l.url}
                    onChange={e => setAchLink(i, j, "url", e.target.value)}
                  />
                </div>
              ))}
              <button
                className="admin-btn admin-btn-ghost"
                style={{marginTop: "4px"}}
                onClick={() => {
                  const a2 = [...form.achievements];
                  a2[i].footerLinks = [...a2[i].footerLinks, {name: "", url: ""}];
                  set("achievements", a2);
                }}
              >
                + Add link
              </button>
            </div>
          ))}
          <button className="admin-btn admin-btn-ghost" onClick={addAch}>
            + Add Certificate
          </button>
        </section>

        {/* ── Blogs ── */}
        <section className="admin-section">
          <h2>Blogs</h2>
          <div className="admin-grid-2">
            <label>
              Section title
              <input
                className="admin-input"
                value={form.blogsTitle}
                onChange={e => set("blogsTitle", e.target.value)}
              />
            </label>
            <label>
              Section subtitle
              <input
                className="admin-input"
                value={form.blogsSubtitle}
                onChange={e => set("blogsSubtitle", e.target.value)}
              />
            </label>
          </div>
          {form.blogs.map((b, i) => (
            <div key={i} className="admin-card">
              <div className="admin-card-header">
                <span>Blog #{i + 1}</span>
                <button
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  onClick={() => removeBlog(i)}
                >
                  Remove
                </button>
              </div>
              <div className="admin-grid-2">
                <label>
                  Title
                  <input
                    className="admin-input"
                    value={b.title}
                    onChange={e => setBlog(i, "title", e.target.value)}
                  />
                </label>
                <label>
                  URL
                  <input
                    className="admin-input"
                    placeholder="https://..."
                    value={b.url}
                    onChange={e => setBlog(i, "url", e.target.value)}
                  />
                </label>
              </div>
              <label>
                Description
                <input
                  className="admin-input"
                  value={b.description}
                  onChange={e => setBlog(i, "description", e.target.value)}
                />
              </label>
            </div>
          ))}
          <button className="admin-btn admin-btn-ghost" onClick={addBlog}>
            + Add Blog
          </button>
        </section>

        {/* ── Footer ── */}
        <div className="admin-footer">
          <button
            className="admin-btn admin-btn-primary admin-btn-lg"
            onClick={handleDownload}
          >
            {saved
              ? "Downloaded! Replace src/portfolio.js"
              : "Download portfolio.js"}
          </button>
          <p className="admin-hint">
            After replacing the file, run <code>npm run deploy</code> to publish.
          </p>
        </div>
      </div>
    </div>
  );
}
