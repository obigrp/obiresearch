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

// ===== Dual-filter publications system =====
const filterButtons = document.querySelectorAll('.filter-btn');
const pubItems = document.querySelectorAll('.pub-item');

let activeFilters = {
  year: 'all',
  type: 'all'
};

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filterType = btn.dataset.filter;
    const filterValue = btn.dataset.value;

    // Update active state for this filter group
    document.querySelectorAll(`.filter-btn[data-filter="${filterType}"]`).forEach(b => {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    // Update the active filter
    activeFilters[filterType] = filterValue;

    // Apply filters
    applyFilters();
  });
});

function applyFilters() {
  let visibleCount = 0;
  let journalCount = 0;
  let patentCount = 0;

  pubItems.forEach(item => {
    const itemYear = item.dataset.year;
    const itemType = item.dataset.type;

    // Check if item matches both active filters
    const yearMatch = activeFilters.year === 'all' || itemYear === activeFilters.year;
    const typeMatch = activeFilters.type === 'all' || itemType === activeFilters.type;

    if (yearMatch && typeMatch) {
      item.style.display = '';
      visibleCount++;
      if (itemType === 'journal') journalCount++;
      if (itemType === 'patent') patentCount++;
    } else {
      item.style.display = 'none';
    }
  });

  // Update stats
  const totalLabel = document.getElementById('total-pubs');
  const journalLabel = document.getElementById('journal-count');
  const patentLabel = document.getElementById('patent-count');

  if (totalLabel) totalLabel.textContent = visibleCount;
  if (journalLabel) journalLabel.textContent = journalCount;
  if (patentLabel) patentLabel.textContent = patentCount;
}

// ===== Password gate (resources.html) =====
const PASSWORD = "changeme123";

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

if (sessionStorage.getItem('resourcesUnlocked') === 'true' && gateSection) {
  gateSection.classList.add('hidden');
  protectedContent.classList.remove('hidden');
}