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

// Función para copiar al portapapeles
function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const text = element.textContent;
  navigator.clipboard.writeText(text).then(() => {
    // Encontrar el botón cercano al elemento
    const button = element.parentElement.querySelector('button');
    if (!button) return;
    
    const originalText = button.textContent;
    button.textContent = '¡Copiado!';
    
    // Restaurar el texto original después de 2 segundos
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  }).catch(err => {
    console.error('Error al copiar:', err);
  });
}
