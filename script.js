// VS Code Styled Portfolio Dynamic Router & Logic

// ── File metadata for tabs and breadcrumbs ─────────────────────────────────
const PAGE_FILES = {
  about: { name: "about.html", icon: "https://img.icons8.com/color/48/html-5--v1.png", lang: "HTML" },
  experience: { name: "experience.css", icon: "https://img.icons8.com/color/48/css3.png", lang: "CSS" },
  skills: { name: "skills.js", icon: "https://img.icons8.com/color/48/javascript--v1.png", lang: "JavaScript" },
  projects: { name: "projects.json", icon: "https://img.icons8.com/color/48/json--v1.png", lang: "JSON" },
  achievements: { name: "achievements.md", icon: "https://img.icons8.com/color/48/markdown.png", lang: "Markdown" },
  contact: { name: "contact.md", icon: "https://img.icons8.com/color/48/markdown.png", lang: "Markdown" },
};

// Opened tabs (persists through navigation)
let openedTabs = ["about"];
let cmdSelectedIdx = 0;

// DOM Elements
const contentViewport = document.getElementById("content-viewport");
const menuLinks = document.querySelectorAll(".header-menu-link");

// Init App Router
document.addEventListener("DOMContentLoaded", () => {
  // Listen to hash changes
  window.addEventListener("hashchange", handleRouting);
  // Trigger initial routing
  handleRouting();

  // ── Activity Bar: Toggle Sidebar Explorer ──────────────────────────────
  const toggleExplorerBtn = document.getElementById("btn-toggle-explorer");
  const sidebar = document.getElementById("sidebar-explorer");
  if (toggleExplorerBtn && sidebar) {
    toggleExplorerBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      toggleExplorerBtn.classList.toggle("active");
    });
  }

  // ── Activity Bar: About icon navigates to About ────────────────────────
  const goAboutBtn = document.getElementById("btn-go-about");
  if (goAboutBtn) {
    goAboutBtn.addEventListener("click", () => { window.location.hash = "#about"; });
  }

  // ── Sidebar file items: clicking navigates ─────────────────────────────
  const sidebarFileItems = document.querySelectorAll(".tree-item.file");
  sidebarFileItems.forEach(item => {
    item.addEventListener("click", () => {
      const page = item.getAttribute("data-page");
      if (page) window.location.hash = "#" + page;
    });
  });

  // ── Sidebar folder toggle ──────────────────────────────────────────────
  const srcFolderToggle = document.getElementById("src-folder-toggle");
  const srcContents = document.getElementById("src-contents");
  if (srcFolderToggle && srcContents) {
    srcFolderToggle.addEventListener("click", () => {
      srcContents.classList.toggle("collapsed");
      const arrow = srcFolderToggle.querySelector(".folder-arrow");
      if (arrow) arrow.classList.toggle("collapsed");
    });
  }

  // ── Portfolio tree title toggle ────────────────────────────────────────
  const portfolioTreeToggle = document.getElementById("btn-toggle-portfolio-tree");
  const portfolioTree = document.getElementById("portfolio-tree");
  if (portfolioTreeToggle && portfolioTree) {
    portfolioTreeToggle.addEventListener("click", () => {
      portfolioTree.classList.toggle("collapsed");
      const arrow = portfolioTreeToggle.querySelector(".arrow-icon");
      if (arrow) arrow.classList.toggle("collapsed");
    });
  }

  // ── Live Clock in Status Bar ───────────────────────────────────────────
  const clockEl = document.getElementById("status-clock");
  function tickClock() {
    if (!clockEl) return;
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString("en-IN", { hour12: false });
  }
  tickClock();
  setInterval(tickClock, 1000);

  // ── Command Palette ────────────────────────────────────────────────────
  initCommandPalette();

  // ── Minimap canvas fill ────────────────────────────────────────────────
  drawMinimap();
});


// Manage active state of header links, sidebar file items, tabs, breadcrumb, and render page
function handleRouting() {
  const hash = window.location.hash || "#about";
  const page = hash.replace("#", "");

  // Update active state in navigation header
  menuLinks.forEach(link => {
    const dataPage = link.getAttribute("data-page");
    link.classList.toggle("active", dataPage === page);
  });

  // Update active state in sidebar file tree
  const sidebarFileItems = document.querySelectorAll(".tree-item.file");
  sidebarFileItems.forEach(item => {
    item.classList.toggle("active", item.getAttribute("data-page") === page);
  });

  // Open a tab for this page
  if (!openedTabs.includes(page)) openedTabs.push(page);
  renderTabs(page);

  // Update breadcrumb path
  const bcFile = document.getElementById("bc-active-file");
  if (bcFile && PAGE_FILES[page]) bcFile.textContent = PAGE_FILES[page].name;

  // Update status bar language
  const langEl = document.getElementById("status-lang");
  if (langEl && PAGE_FILES[page]) langEl.textContent = PAGE_FILES[page].lang;

  // Render content
  renderPageContent(page);
}

// Route Content Renderer
function renderPageContent(page) {
  let html = "";

  switch (page) {
    case "about":
      html = renderAboutPage();
      break;
    case "experience":
      html = renderExperiencePage();
      break;
    case "skills":
      html = renderSkillsPage();
      break;
    case "projects":
      html = renderProjectsPage();
      break;
    case "achievements":
      html = renderAchievementsPage();
      break;
    case "contact":
      html = renderContactPage();
      break;
    default:
      html = renderAboutPage();
  }

  contentViewport.innerHTML = html;

  // Add event listener for contact form if it exists
  if (page === "contact") {
    const contactForm = document.getElementById("contact-me-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleFormSubmit();
      });
    }
  }
}

// 1. ABOUT PAGE (HOME SCREEN)
function renderAboutPage() {
  return `
    <div class="page-wrapper">
      <div class="about-columns">
        <!-- Left Column: Quickstart -->
        <div class="about-left-col">
          <h1 class="user-name">${PORTFOLIO_DATA.personal.name}</h1>
          <h3 class="user-subtitle">${PORTFOLIO_DATA.personal.title}</h3>
          
          <h4 class="section-label">Start</h4>
          <div class="shortcuts-list">
            <div class="shortcut-item" onclick="location.hash='#skills'">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span>Skills ...</span>
            </div>
            <div class="shortcut-item" onclick="location.hash='#projects'">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
              <span>Projects ...</span>
            </div>
            <div class="shortcut-item" onclick="location.hash='#experience'">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8-9 8a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8 9-8s9 3.694 9 8.25z"/></svg>
              <span>Experience ...</span>
            </div>
            <div class="shortcut-item" onclick="location.hash='#contact'">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8-9 8a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8 9-8s9 3.694 9 8.25z"/></svg>
              <span>Get in Touch ...</span>
            </div>
          </div>
          
          <h4 class="section-label" style="margin-top: 30px;">Recent</h4>
          <p class="recent-activity-placeholder">No recent activity!</p>
        </div>

        <!-- Right Column: Profiles -->
        <div class="about-right-col">
          <h4 class="section-label" style="margin-top: 0;">About</h4>
          
          <a href="${PORTFOLIO_DATA.personal.socials.linkedin}" target="_blank">
            <div class="social-link-card">
              <img src="https://img.icons8.com/fluency/30/null/linkedin-circled.png" alt="LinkedIn">
              <span>LinkedIn Profile</span>
            </div>
          </a>

          <a href="${PORTFOLIO_DATA.personal.socials.github}" target="_blank">
            <div class="social-link-card">
              <img src="https://img.icons8.com/3d-fluency/28/null/github.png" alt="GitHub">
              <span>GitHub Page</span>
            </div>
          </a>

          <a href="${PORTFOLIO_DATA.personal.socials.leetcode}" target="_blank">
            <div class="social-link-card">
              <img src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/28/null/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-color-tal-revivo.png" alt="LeetCode">
              <span>LeetCode Profile</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  `;
}

// 2. EXPERIENCE PAGE
function renderExperiencePage() {
  return `
    <div class="page-wrapper experience-page-bg">
      <h1 class="section-title">Experience</h1>
      <p class="section-subtitle-description">My professional journey and work history, showcasing my growth and expertise in software development.</p>
      
      <div class="timeline-container">
        ${PORTFOLIO_DATA.experience.map(exp => `
          <div class="timeline-card-wrapper">
            <div class="timeline-card">
              <div class="timeline-card-header">
                <div>
                  <h3>${exp.company}</h3>
                  <h4>${exp.role}</h4>
                </div>
                <span class="date">${exp.duration}</span>
              </div>
              <ul class="timeline-points-list">
                ${exp.points.map(pt => `<li>${pt}</li>`).join("")}
              </ul>
              <div class="tag-container">
                ${exp.tech.map(t => `<span class="tech-tag">${t}</span>`).join("")}
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// 3. SKILLS PAGE
function renderSkillsPage() {
  return `
    <div class="page-wrapper">
      <h1 class="section-title">Skills</h1>
      <p class="section-subtitle-description">Data Structures and Algorithms, Frontend Development, Backend Development, Database Management, System Design and Cloud.</p>
      
      <div class="skills-container">
        <div class="skills-category-group">
          <h3 class="skills-cat-title">Programming</h3>
          <div class="skills-items-grid">
            ${PORTFOLIO_DATA.skills.programming.map(s => `
              <div class="skill-pill-card">
                <div class="skill-logo-box">
                  <img src="${s.icon}" alt="${s.name}">
                </div>
                <span class="skill-card-name">${s.name}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="skills-category-group">
          <h3 class="skills-cat-title">Backend Development</h3>
          <div class="skills-items-grid">
            ${PORTFOLIO_DATA.skills.backend.map(s => `
              <div class="skill-pill-card">
                <div class="skill-logo-box">
                  <img src="${s.icon}" alt="${s.name}">
                </div>
                <span class="skill-card-name">${s.name}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="skills-category-group">
          <h3 class="skills-cat-title">Data & ML</h3>
          <div class="skills-items-grid">
            ${PORTFOLIO_DATA.skills.dataAndML.map(s => `
              <div class="skill-pill-card">
                <div class="skill-logo-box">
                  <img src="${s.icon}" alt="${s.name}">
                </div>
                <span class="skill-card-name">${s.name}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="skills-category-group">
          <h3 class="skills-cat-title">Database</h3>
          <div class="skills-items-grid">
            ${PORTFOLIO_DATA.skills.databases.map(s => `
              <div class="skill-pill-card">
                <div class="skill-logo-box">
                  <img src="${s.icon}" alt="${s.name}">
                </div>
                <span class="skill-card-name">${s.name}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="skills-category-group">
          <h3 class="skills-cat-title">DevOps & Tools</h3>
          <div class="skills-items-grid">
            ${PORTFOLIO_DATA.skills.devopsAndTools.map(s => `
              <div class="skill-pill-card">
                <div class="skill-logo-box">
                  <img src="${s.icon}" alt="${s.name}">
                </div>
                <span class="skill-card-name">${s.name}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

// 4. PROJECTS PAGE
function renderProjectsPage() {
  return `
    <div class="page-wrapper">
      <h1 class="section-title">My Projects</h1>
      <p class="section-subtitle-description">A showcase of my development projects and work.</p>
      
      <div class="projects-layout-grid">
        ${PORTFOLIO_DATA.projects.map(proj => `
          <div class="project-item-card">
            <div class="project-item-banner">
              <img src="${proj.banner}" alt="${proj.name}">
            </div>
            <div class="project-item-content">
              <h3 class="project-item-title">${proj.name}</h3>
              <h4 class="project-item-subtitle">${proj.title}</h4>
              <p class="project-item-desc">${proj.description}</p>
              
              <div class="tag-container" style="margin-bottom: 15px;">
                ${proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join("")}
              </div>

              <div class="project-item-links">
                <a href="${proj.github}" class="project-link-action" target="_blank">
                  <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  <span>GitHub</span>
                </a>
                ${proj.live !== "#" ? `
                  <a href="${proj.live}" class="project-link-action" target="_blank">
                    <svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                    <span>Live Demo</span>
                  </a>
                ` : ''}
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// 5. ACHIEVEMENTS PAGE
function renderAchievementsPage() {
  return `
    <div class="page-wrapper">
      <h1 class="section-title">My Achievements</h1>
      <p class="section-subtitle-description">Here are some of my notable achievements and accomplishments.</p>
      
      <div class="achievements-layout-grid">
        ${PORTFOLIO_DATA.achievements.map(ach => `
          <div class="achievement-item-card">
            <p class="achievement-card-text">${ach}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// 6. CONTACT PAGE (EMAIL)
function renderContactPage() {
  return `
    <div class="page-wrapper">
      <div class="contact-layout-split">
        <!-- Details Panel -->
        <div class="contact-left-details">
          <h1>Get in touch</h1>
          <p class="contact-subtext">Fill in the form to start a conversation</p>
          <p class="contact-subtext" style="font-size: 0.95rem;">You can contact me with any questions, suggestions or just to say hi. I am always open to new ideas and collaborations. It can be anything like collaborating on good projects or startups or freelancing or gaming or anything else.</p>
          
          <div class="contact-details-list">
            <div class="contact-details-item">
              <strong>Location</strong>
              <p>${PORTFOLIO_DATA.personal.location}</p>
            </div>
            <div class="contact-details-item">
              <strong>Email</strong>
              <p><a href="mailto:${PORTFOLIO_DATA.personal.email}">${PORTFOLIO_DATA.personal.email}</a></p>
            </div>
          </div>
        </div>

        <!-- Form Panel -->
        <form class="contact-panel-form" id="contact-me-form">
          <div class="form-group">
            <input class="form-input" type="text" id="contact-name" placeholder="Full Name" required>
          </div>
          <div class="form-group">
            <input class="form-input" type="email" id="contact-email" placeholder="Email" required>
          </div>
          <div class="form-group">
            <textarea class="form-textarea" id="contact-message" placeholder="Message" required></textarea>
          </div>
          <button class="contact-submit-btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  `;
}



// Submit contact form & show visual notification
function handleFormSubmit() {
  const nameVal = document.getElementById("contact-name").value;
  showVSCodeToast(`Message received! Thanks for connecting, ${nameVal}.`);
  document.getElementById("contact-me-form").reset();
}

// Custom Toast styled like a VS Code popup toast notification
function showVSCodeToast(message) {
  // Remove existing if active
  const oldToast = document.getElementById("vs-code-popup-toast");
  if (oldToast) oldToast.remove();

  const toast = document.createElement("div");
  toast.id = "vs-code-popup-toast";
  toast.style.cssText = `
    position: fixed;
    bottom: 50px;
    right: 20px;
    background-color: #252526;
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 4px 15px rgba(0,0,0,0.6);
    border-radius: 4px;
    padding: 15px 20px;
    z-index: 1000;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: toastSlideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `;

  // Inject animation keyframes if not defined
  if (!document.getElementById("toast-animation-injected-styles")) {
    const style = document.createElement("style");
    style.id = "toast-animation-injected-styles";
    style.textContent = `
      @keyframes toastSlideUp {
        from { transform: translateY(80px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  toast.innerHTML = `
    <div style="display:flex; align-items:start; gap:8px;">
      <span style="color:#60a5fa; font-size:1.15rem;">✉</span>
      <p style="color:#ffffff; font-size:0.9rem; margin:0; line-height:1.4;">${message}</p>
    </div>
    <button id="toast-close-btn" class="contact-submit-btn" style="padding: 4px 10px; font-size:0.8rem; align-self:flex-end;">Close</button>
  `;

  document.body.appendChild(toast);

  toast.querySelector("#toast-close-btn").addEventListener("click", () => {
    toast.remove();
  });

  // Auto-expire
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 5000);
}

// ══════════════════════════════════════════════════
// EDITOR TABS
// ══════════════════════════════════════════════════
function renderTabs(activePage) {
  const container = document.getElementById("breadcrumb-tabs");
  if (!container) return;

  container.innerHTML = openedTabs.map(page => {
    const meta = PAGE_FILES[page] || { name: page, icon: "", lang: "" };
    const isActive = page === activePage;
    return `
      <div class="editor-tab ${isActive ? "active" : ""}" data-tab-page="${page}" onclick="window.location.hash='#${page}'">
        ${meta.icon ? `<img src="${meta.icon}" alt="${meta.lang}">` : ""}
        <span>${meta.name}</span>
        <span class="tab-close" onclick="closeTab(event,'${page}')">×</span>
      </div>
    `;
  }).join("");
}

function closeTab(e, page) {
  e.stopPropagation();
  openedTabs = openedTabs.filter(t => t !== page);
  const currentPage = (window.location.hash || "#about").replace("#", "");
  if (page === currentPage) {
    const fallback = openedTabs[openedTabs.length - 1] || "about";
    window.location.hash = "#" + fallback;
  } else {
    renderTabs(currentPage);
  }
}

// ══════════════════════════════════════════════════
// COMMAND PALETTE
// ══════════════════════════════════════════════════
function initCommandPalette() {
  const overlay = document.getElementById("cmd-palette-overlay");
  const input = document.getElementById("cmd-palette-input");
  const results = document.getElementById("cmd-palette-results");
  const trigger = document.getElementById("cmd-palette-trigger");
  if (!overlay || !input || !results) return;

  const allItems = Object.entries(PAGE_FILES).map(([page, meta]) => ({
    page, label: meta.name, hint: meta.lang, icon: meta.icon
  }));

  function openPalette() {
    overlay.classList.add("open");
    input.value = "";
    renderResults("", 0);
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    overlay.classList.remove("open");
  }

  function renderResults(query, selectedIdx) {
    const q = query.toLowerCase();
    const filtered = allItems.filter(i =>
      i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q)
    );
    cmdSelectedIdx = Math.max(0, Math.min(selectedIdx, filtered.length - 1));

    results.innerHTML = filtered.map((item, idx) => {
      const highlighted = q
        ? item.label.replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"), "<mark>$1</mark>")
        : item.label;
      return `
        <li class="cmd-result-item ${idx === cmdSelectedIdx ? "selected" : ""}"
            onclick="window.location.hash='#${item.page}'; closeCmdPalette();">
          <img src="${item.icon}" alt="${item.hint}">
          <span class="cmd-result-label">${highlighted}</span>
          <span class="cmd-result-hint">${item.hint}</span>
        </li>
      `;
    }).join("");
  }

  window.closeCmdPalette = closePalette;

  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "k")) {
      e.preventDefault();
      overlay.classList.contains("open") ? closePalette() : openPalette();
    }
    if (e.key === "Escape" && overlay.classList.contains("open")) closePalette();

    if (overlay.classList.contains("open")) {
      const q = input.value.toLowerCase();
      const filtered = allItems.filter(i => i.label.toLowerCase().includes(q));
      if (e.key === "ArrowDown") { e.preventDefault(); renderResults(input.value, cmdSelectedIdx + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); renderResults(input.value, cmdSelectedIdx - 1); }
      else if (e.key === "Enter" && filtered[cmdSelectedIdx]) {
        window.location.hash = "#" + filtered[cmdSelectedIdx].page;
        closePalette();
      }
    }
  });

  if (trigger) trigger.addEventListener("click", openPalette);
  overlay.addEventListener("click", e => { if (e.target === overlay) closePalette(); });
  input.addEventListener("input", () => renderResults(input.value, 0));
}

// ══════════════════════════════════════════════════
// MINIMAP (decorative canvas lines)
// ══════════════════════════════════════════════════
function drawMinimap() {
  const canvas = document.getElementById("minimap-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const colors = ["#6366f1", "#60a5fa", "#a5b4fc", "#4b5563", "#374151"];
  let y = 8;
  while (y < H) {
    const lineW = Math.random() * (W * 0.55) + W * 0.1;
    const x = Math.random() * (W - lineW);
    const h = Math.random() < 0.12 ? 2 : 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.fillStyle = color;
    ctx.globalAlpha = Math.random() * 0.5 + 0.15;
    ctx.fillRect(x, y, lineW, h);
    y += h + Math.random() * 3 + 1;
  }
  ctx.globalAlpha = 1;
}

// ══════════════════════════════════════════════════
// SCROLL-REVEAL OBSERVER
// ══════════════════════════════════════════════════
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));
}

// ══════════════════════════════════════════════════
// ANIMATED COUNTER
// ══════════════════════════════════════════════════
function animateCounter(el, target, suffix = "") {
  let start = 0;
  const duration = 1200;
  const step = 16;
  const increment = target / (duration / step);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, step);
}

// ══════════════════════════════════════════════════
// GITHUB-STYLE ACTIVITY HEATMAP
// ══════════════════════════════════════════════════
function renderHeatmap(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const levels = [0, 1, 2, 3, 4];
  const weights = [0.35, 0.25, 0.2, 0.13, 0.07];
  let html = "";
  for (let i = 0; i < 364; i++) {
    const rand = Math.random();
    let cumulative = 0, level = 0;
    for (let l = 0; l < levels.length; l++) {
      cumulative += weights[l];
      if (rand < cumulative) { level = levels[l]; break; }
    }
    const cls = level === 0 ? "heatmap-cell" : `heatmap-cell level-${level}`;
    html += `<div class="${cls}" title="Activity level ${level}"></div>`;
  }
  container.innerHTML = html;
}

// ══════════════════════════════════════════════════
// TYPING ANIMATION
// ══════════════════════════════════════════════════
function startTypingAnimation(el, strings, speed = 80, pause = 1800) {
  if (!el) return;
  let sIdx = 0, cIdx = 0, deleting = false;
  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  el.insertAdjacentElement("afterend", cursor);

  function tick() {
    const current = strings[sIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(tick, pause);
        return;
      }
    } else {
      el.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        sIdx = (sIdx + 1) % strings.length;
      }
    }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}
