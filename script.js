const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
} else {
  themeToggle.textContent = '🌙';
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.progress-fill');
      const percent = fill.getAttribute('data-percent');
      fill.style.width = percent + '%';
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.skill-item').forEach(item => observer.observe(item));

const slides = document.querySelector('.slides');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.slides img').length;

const showSlide = () => {
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
};

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide();
});

prevBtn.addEventListener('click', () => {
  currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
  showSlide();
});

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const url = card.dataset.url;
    if (url) window.location.href = url;
  });
});

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#1abc9c';
ctx.fillRect(30, 30, 240, 90);
ctx.font = '20px Roboto';
ctx.fillStyle = 'white';
ctx.fillText('Aayush  Portfolio', 50, 75);

const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const form = document.getElementById('contact-form');
const messageDiv = document.getElementById('form-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !message) {
    messageDiv.textContent = 'Name and Message are required!';
    messageDiv.style.color = '#e74c3c';
    return;
  }
  if (!email.includes('@') || !email.includes('.')) {
    messageDiv.textContent = 'Please enter a valid email!';
    messageDiv.style.color = '#e74c3c';
    return;
  }

  const data = { name, email, message };
  localStorage.setItem('formData', JSON.stringify(data));
  messageDiv.textContent = 'Success! Redirecting...';
  messageDiv.style.color = '#2ecc71';

  setTimeout(() => {
    window.location.href = 'form-details.html';
  }, 800);
});
