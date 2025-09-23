// Tailwind theme already configured inline in HTML

// Partículas
const container = document.getElementById('particle-container');
if (container) {
  const particleCount = 60;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 4 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${Math.random() * 12 + 8}s`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.backgroundColor = Math.random() > 0.5 ? '#8b5cf6' : '#06b6d4';
    container.appendChild(particle);
  }
}

// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));
}

// Theme toggle with persistence
const htmlEl = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'light') htmlEl.classList.remove('dark');
if (storedTheme === 'dark') htmlEl.classList.add('dark');
function syncIcon(){ if (themeIcon) themeIcon.textContent = htmlEl.classList.contains('dark') ? '🌙' : '☀️'; }
syncIcon();
if (themeToggle) themeToggle.addEventListener('click', () => {
  htmlEl.classList.toggle('dark');
  const mode = htmlEl.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', mode);
  syncIcon();
});

// Reveal on scroll
const revealElements = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
revealElements.forEach(el => io.observe(el));

// Contact form -> mailto
const form = document.getElementById('contactForm');
if (form) form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');
  const subject = encodeURIComponent(`Contacto desde portafolio - ${name}`);
  const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`);
  window.location.href = `mailto:anderson.castro@email.com?subject=${subject}&body=${body}`;
});
