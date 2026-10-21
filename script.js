/* PERSONAL PORTFOLIO — SCRIPT.JS
   Features: dark/light mode, mobile menu, back-to-top button,
   read-more toggle, project category filter, and a mailto contact form.
*/

// Update this address when you add your real contact information.
const contactEmail = 'hello@example.com';

// Dark / light mode, stored for repeat visits.
const themeButton = document.querySelector('[data-theme-toggle]');
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeButton) {
    const isDark = theme === 'dark';
    themeButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeButton.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  try { localStorage.setItem('portfolio-theme', theme); } catch (_) { /* Storage may be disabled */ }
}
let savedTheme = 'light';
try { savedTheme = localStorage.getItem('portfolio-theme') || 'light'; } catch (_) { /* Use light mode */ }
setTheme(savedTheme === 'dark' ? 'dark' : 'light');
if (themeButton) {
  themeButton.addEventListener('click', () => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}

// Responsive menu toggle.
const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('#primary-navigation');
if (menuButton && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };
  menuButton.addEventListener('click', () => {
    const opening = !navigation.classList.contains('is-open');
    navigation.classList.toggle('is-open', opening);
    menuButton.setAttribute('aria-expanded', String(opening));
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
}

// Back-to-top button appears once the page is scrolled.
const topButton = document.querySelector('[data-back-to-top]');
if (topButton) {
  const updateTopButton = () => topButton.classList.toggle('is-visible', window.scrollY > 350);
  window.addEventListener('scroll', updateTopButton, { passive: true });
  updateTopButton();
  topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Show or hide the extra About Me paragraph.
const readMoreButton = document.querySelector('[data-read-more]');
const extraBio = document.querySelector('#extra-bio');
if (readMoreButton && extraBio) {
  readMoreButton.addEventListener('click', () => {
    const willOpen = extraBio.hidden;
    extraBio.hidden = !willOpen;
    readMoreButton.setAttribute('aria-expanded', String(willOpen));
    readMoreButton.innerHTML = willOpen ? 'Show less <span aria-hidden="true">−</span>' : 'Read a little more <span aria-hidden="true">+</span>';
  });
}

// Filter cards on the Projects page.
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-category]');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projectCards.forEach(card => { card.hidden = selected !== 'all' && card.dataset.category !== selected; });
  });
});

// Contact form: prepares an email, no backend or server submission required.
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const name = document.querySelector('#sender-name').value.trim();
    const email = document.querySelector('#sender-email').value.trim();
    const message = document.querySelector('#sender-message').value.trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(['Name: ' + name, 'Email: ' + email, '', message].join('\n'));
    document.querySelector('#form-status').textContent = 'Opening your email application. Please review and send the message there.';
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  });
}

// Optional project detail pages so every demo card has a working local link.
// Replace these sample project descriptions and images with your own activities.
const projectData = {
  'project-1': { type: 'WEB DESIGN / 2026', title: 'Portfolio Website', summary: 'A simple space to introduce myself and share my work.', description: 'This sample project is a personal portfolio website built with HTML, CSS, and JavaScript. It includes responsive layouts, page navigation, a dark mode, and simple user interactions. Replace this text with the description of your actual activity.', image: 'images/project-1.svg' },
  'project-2': { type: 'APPLICATION / 2026', title: 'Student Task Tracker', summary: 'A sample student dashboard concept for managing school tasks.', description: 'This example application helps visualize a to-do list, pending tasks, and school deadlines. You can replace this with any activity you completed during the semester.', image: 'images/project-2.svg' },
  'project-3': { type: 'WEBSITE / 2026', title: 'Café Landing Page', summary: 'A warm and minimal website concept for a local café.', description: 'This is an example of a homepage focused on readable content, simple navigation, and a clean layout. Add your real activity details, tools used, and screenshots here.', image: 'images/project-3.svg' },
  'project-4': { type: 'UI DESIGN / 2026', title: 'Mobile UI Concept', summary: 'An interface design activity focused on clarity and visual organization.', description: 'This sample design explores interface components, whitespace, and visual hierarchy. Explain your own project goals and process here when you personalize this page.', image: 'images/project-4.svg' }
};
const detailTitle = document.querySelector('#detail-title');
if (detailTitle) {
  const id = new URLSearchParams(window.location.search).get('id');
  const project = projectData[id] || projectData['project-1'];
  document.querySelector('#detail-type').textContent = project.type;
  detailTitle.textContent = project.title;
  document.querySelector('#detail-summary').textContent = project.summary;
  document.querySelector('#detail-description').textContent = project.description;
  const detailImage = document.querySelector('#detail-image');
  detailImage.src = project.image;
  detailImage.alt = `Illustration of ${project.title}`;
  document.title = `${project.title} | Your Name`;
}

// Footer year automatically stays up to date.
document.querySelectorAll('[data-current-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
