// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar todas las funcionalidades
  initParticles();
  initMobileMenu();
  initThemeToggle();
  initScrollAnimations();
  initAnimeAnimations();
  initSmoothScrolling();
  initTypingEffect();
});

// ===== PARTÍCULAS FLOTANTES =====
function initParticles() {
  const container = document.getElementById('particle-container');
  if (!container) return;

  const particleCount = 80;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Tamaño aleatorio
    const size = Math.random() * 4 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Posición aleatoria
    particle.style.left = `${Math.random() * 100}vw`;
    
    // Duración y delay aleatorios
    particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    
    // Color aleatorio entre cyan y violet
    particle.style.backgroundColor = Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6';
    
    container.appendChild(particle);
    particles.push(particle);
  }

  // Animar partículas con anime.js
  anime({
    targets: '.particle',
    translateY: [0, -20],
    rotate: [0, 360],
    scale: [1, 1.2, 1],
    duration: 8000,
    delay: anime.stagger(100),
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
  });
}

// ===== MENÚ MÓVIL =====
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Animación del menú móvil
    if (!mobileMenu.classList.contains('hidden')) {
      anime({
        targets: mobileMenu,
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 300,
        easing: 'easeOutQuart'
      });
    }
  });

  // Cerrar menú al hacer clic en enlaces
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// ===== TOGGLE DE TEMA =====
function initThemeToggle() {
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  
  if (!themeToggle || !themeIcon) return;

  // Cargar tema guardado
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light') {
    htmlEl.classList.remove('dark');
  } else if (storedTheme === 'dark') {
    htmlEl.classList.add('dark');
  }

  function updateIcon() {
    if (themeIcon) {
      themeIcon.textContent = htmlEl.classList.contains('dark') ? '🌙' : '☀️';
    }
  }

  updateIcon();

  themeToggle.addEventListener('click', () => {
    htmlEl.classList.toggle('dark');
    const mode = htmlEl.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
    
    // Animación del icono
    anime({
      targets: themeIcon,
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      duration: 500,
      easing: 'easeOutQuart'
    });
    
    updateIcon();
  });
}

// ===== ANIMACIONES AL SCROLL =====
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animación adicional con anime.js
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 800,
          easing: 'easeOutQuart',
          delay: anime.stagger(100)
        });
      }
    });
  }, { 
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ===== ANIMACIONES CON ANIME.JS =====
function initAnimeAnimations() {
  // Animación del hero al cargar
  anime.timeline({
    easing: 'easeOutQuart',
    duration: 800
  })
  .add({
    targets: '.hero-badge',
    opacity: [0, 1],
    translateY: [30, 0],
    delay: 500
  })
  .add({
    targets: '.hero-title',
    opacity: [0, 1],
    translateY: [40, 0],
    scale: [0.95, 1]
  }, '-=400')
  .add({
    targets: '.hero-image',
    opacity: [0, 1],
    scale: [0.85, 1],
    rotate: [0, 360]
  }, '-=600')
  .add({
    targets: '.hero-subtitle',
    opacity: [0, 1],
    translateY: [25, 0]
  }, '-=400')
  .add({
    targets: '.hero-buttons',
    opacity: [0, 1],
    translateY: [25, 0]
  }, '-=200')
  .add({
    targets: '.hero-tech-icons',
    opacity: [0, 1],
    translateY: [15, 0]
  }, '-=200');

  // Animación de las tarjetas de proyectos
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    // Animación inicial
    anime.set(card, {
      opacity: 0,
      translateY: 50,
      scale: 0.9
    });

    // Observador para animar cuando sea visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: card,
            opacity: [0, 1],
            translateY: [50, 0],
            scale: [0.9, 1],
            duration: 600,
            delay: index * 150,
            easing: 'easeOutQuart'
          });

          // Efectos hover con anime.js
          card.addEventListener('mouseenter', () => {
            anime({
              targets: card,
              translateY: -8,
              scale: 1.02,
              duration: 300,
              easing: 'easeOutQuart'
            });
          });

          card.addEventListener('mouseleave', () => {
            anime({
              targets: card,
              translateY: 0,
              scale: 1,
              duration: 300,
              easing: 'easeOutQuart'
            });
          });
        }
      });
    }, { threshold: 0.2 });

    observer.observe(card);
  });

  // Animación de botones
  const buttons = document.querySelectorAll('a[href^="#"], button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      anime({
        targets: button,
        scale: 1.05,
        duration: 200,
        easing: 'easeOutQuart'
      });
    });

    button.addEventListener('mouseleave', () => {
      anime({
        targets: button,
        scale: 1,
        duration: 200,
        easing: 'easeOutQuart'
      });
    });
  });

  // Animación de tech badges
  const techBadges = document.querySelectorAll('.tech-badge');
  techBadges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      anime({
        targets: badge,
        translateY: -2,
        scale: 1.05,
        duration: 200,
        easing: 'easeOutQuart'
      });
    });

    badge.addEventListener('mouseleave', () => {
      anime({
        targets: badge,
        translateY: 0,
        scale: 1,
        duration: 200,
        easing: 'easeOutQuart'
      });
    });
  });

  // Animación de tarjetas de habilidades
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, index) => {
    // Animación inicial
    anime.set(card, {
      opacity: 0,
      translateY: 30,
      scale: 0.95
    });

    // Observador para animar cuando sea visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: card,
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.95, 1],
            duration: 600,
            delay: index * 100,
            easing: 'easeOutQuart'
          });
        }
      });
    }, { threshold: 0.2 });

    observer.observe(card);
  });

  // Animación de elementos del menú de navegación
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      anime({
        targets: link,
        scale: 1.05,
        duration: 200,
        easing: 'easeOutQuart'
      });
    });

    link.addEventListener('mouseleave', () => {
      anime({
        targets: link,
        scale: 1,
        duration: 200,
        easing: 'easeOutQuart'
      });
    });
  });

  // Animación de pills en habilidades
  const pills = document.querySelectorAll('.pill');
  pills.forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      anime({
        targets: pill,
        translateY: -1,
        scale: 1.05,
        duration: 200,
        easing: 'easeOutQuart'
      });
    });

    pill.addEventListener('mouseleave', () => {
      anime({
        targets: pill,
        translateY: 0,
        scale: 1,
        duration: 200,
        easing: 'easeOutQuart'
      });
    });
  });

  // Animación de iconos de tecnología
  const techIcons = document.querySelectorAll('.tech-icon');
  techIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      anime({
        targets: icon,
        scale: 1.2,
        rotate: 15,
        duration: 300,
        easing: 'easeOutElastic(1, .8)'
      });
    });

    icon.addEventListener('mouseleave', () => {
      anime({
        targets: icon,
        scale: 1,
        rotate: 0,
        duration: 300,
        easing: 'easeOutQuart'
      });
    });
  });
}

// ===== SCROLL SUAVE =====
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = 80; // Altura del header
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        anime({
          targets: window,
          scrollTop: targetPosition,
          duration: 1000,
          easing: 'easeOutQuart'
        });
      }
    });
  });
}

// ===== EFECTO DE TIPEO =====
function initTypingEffect() {
  const typingElements = document.querySelectorAll('[data-typing]');
  
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Efecto de tipeo
          let i = 0;
          const typeWriter = () => {
            if (i < text.length) {
              element.textContent += text.charAt(i);
              i++;
              setTimeout(typeWriter, 50);
            }
          };
          typeWriter();
          
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(element);
  });
}

// ===== FUNCIÓN PARA COPIAR AL PORTAPAPELES =====
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
    
    // Animación del botón
    anime({
      targets: button,
      scale: [1, 1.1, 1],
      duration: 300,
      easing: 'easeOutQuart'
    });
    
    // Restaurar el texto original después de 2 segundos
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  }).catch(err => {
    console.error('Error al copiar:', err);
  });
}

// ===== ANIMACIONES DE ENTRADA AL SCROLL =====
function animateOnScroll() {
  const elements = document.querySelectorAll('.anime-fade-in, .anime-slide-up, .anime-scale-in');
  
  elements.forEach(element => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animationType = entry.target.classList.contains('anime-fade-in') ? 'fade-in' :
                               entry.target.classList.contains('anime-slide-up') ? 'slide-up' :
                               entry.target.classList.contains('anime-scale-in') ? 'scale-in' : 'fade-in';
          
          switch(animationType) {
            case 'fade-in':
              anime({
                targets: entry.target,
                opacity: [0, 1],
                duration: 600,
                easing: 'easeOutQuart'
              });
              break;
            case 'slide-up':
              anime({
                targets: entry.target,
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 600,
                easing: 'easeOutQuart'
              });
              break;
            case 'scale-in':
              anime({
                targets: entry.target,
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 600,
                easing: 'easeOutQuart'
              });
              break;
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(element);
  });
}

// ===== INICIALIZAR ANIMACIONES DE SCROLL =====
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
});

// ===== EFECTOS DE PARALLAX SUAVE =====
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// ===== INICIALIZAR PARALLAX =====
document.addEventListener('DOMContentLoaded', () => {
  initParallax();
});

// ===== OPTIMIZACIONES DE RENDIMIENTO =====
// Throttle para eventos de scroll
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Aplicar throttle a eventos de scroll
window.addEventListener('scroll', throttle(() => {
  // Aquí van las funciones que se ejecutan en scroll
}, 16)); // ~60fps

// ===== PRELOADER (OPCIONAL) =====
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    anime({
      targets: preloader,
      opacity: [1, 0],
      duration: 500,
      easing: 'easeOutQuart',
      complete: () => {
        preloader.style.display = 'none';
      }
    });
  }
});