const progressBar = document.getElementById('progressBar');
const siteHeader = document.getElementById('siteHeader');
let lastY = window.scrollY;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const full = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${full > 0 ? (y / full) * 100 : 0}%`;

  if (y > lastY && y > 180) {
    siteHeader.classList.add('hide');
  } else {
    siteHeader.classList.remove('hide');
  }
  lastY = y;
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function createMeteor() {
  const wrap = document.getElementById('meteors');
  const meteor = document.createElement('div');
  meteor.className = 'meteor';
  meteor.style.top = `${Math.random() * 55}vh`;
  meteor.style.left = `${70 + Math.random() * 40}vw`;
  meteor.style.animationDuration = `${1.4 + Math.random() * 1.8}s`;
  meteor.style.opacity = `${0.55 + Math.random() * 0.45}`;
  meteor.style.transform = `rotate(${-20 - Math.random() * 20}deg)`;
  wrap.appendChild(meteor);

  setTimeout(() => meteor.remove(), 4200);
}

for (let i = 0; i < 10; i++) {
  setTimeout(createMeteor, i * 360);
}
setInterval(createMeteor, 950);

const todayName = document.getElementById('todayName');
const dayMap = ['pazar','pazartesi','salı','çarşamba','perşembe','cuma','cumartesi'];
todayName.textContent = dayMap[new Date().getDay()];

const track = document.getElementById('serviceTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function updateSlider() {
  if (window.innerWidth <= 980) return;
  const cards = track.querySelectorAll('.service-card');
  if (!cards.length) return;
  const cardWidth = cards[0].getBoundingClientRect().width + 14;
  const maxIndex = Math.max(0, cards.length - 4);
  if (currentIndex < 0) currentIndex = maxIndex;
  if (currentIndex > maxIndex) currentIndex = 0;
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateSlider();
  });
}

window.addEventListener('resize', updateSlider);
window.addEventListener('load', updateSlider);

document.querySelectorAll('.cta-btn, .service-card, .contact-box, .icon-btn, .floating-btn, .faq-item, .nav-links a').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,.12), rgba(255,255,255,.03) 28%, rgba(255,255,255,.01) 58%)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.backgroundImage = '';
  });
});
