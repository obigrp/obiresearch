// ===== Set current year in footer =====
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ===== Publications filter (publications.html) =====
const filterButtons = document.querySelectorAll('.filter-btn');
const pubItems = document.querySelectorAll('.pub-item');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const year = btn.dataset.year;
    pubItems.forEach(item => {
      if (year === 'all' || item.dataset.year === year) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== Password gate (resources.html) =====
// NOTE: Client-side only — NOT secure for truly sensitive data.
// Good enough as a casual deterrent on a public GitHub repo.
// We'll upgrade this later (Netlify Identity / Cloudflare Access / server auth).
const PASSWORD = "changeme123"; // <-- change this before publishing!

const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');
const passwordError = document.getElementById('password-error');
const gateSection = document.getElementById('gate-section');
const protectedContent = document.getElementById('protected-content');

if (passwordSubmit) {
  passwordSubmit.addEventListener('click', checkPassword);
  passwordInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') checkPassword();
  });
}

function checkPassword() {
  if (passwordInput.value === PASSWORD) {
    gateSection.classList.add('hidden');
    protectedContent.classList.remove('hidden');
    sessionStorage.setItem('resourcesUnlocked', 'true');
  } else {
    passwordError.textContent = "Incorrect password. Please try again.";
  }
}

// Keep unlocked for the browser session
if (sessionStorage.getItem('resourcesUnlocked') === 'true' && gateSection) {
  gateSection.classList.add('hidden');
  protectedContent.classList.remove('hidden');
}