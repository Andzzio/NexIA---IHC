const menuToggle = document.getElementById('menuToggle');
const mobileDrawer = document.getElementById('mobileDrawer');
const mobileLinks = document.querySelectorAll('.mobile-drawer__link');

if (menuToggle && mobileDrawer) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

const formatTabs = document.querySelectorAll('.format-tab');
formatTabs.forEach((tab) => {
  tab.style.cursor = 'pointer';
  tab.addEventListener('click', () => {
    formatTabs.forEach((t) => t.classList.remove('format-tab--active'));
    tab.classList.add('format-tab--active');
  });
});

const modeOptions = document.querySelectorAll('.mode-option');
modeOptions.forEach((option) => {
  option.style.cursor = 'pointer';
  option.addEventListener('click', () => {
    modeOptions.forEach((opt) => {
      opt.classList.remove('mode-option--active');
      opt.classList.add('mode-option--muted');
      const dot = opt.querySelector('.radio-dot');
      if (dot) dot.classList.remove('radio-dot--active');
    });
    option.classList.remove('mode-option--muted');
    option.classList.add('mode-option--active');
    const activeDot = option.querySelector('.radio-dot');
    if (activeDot) activeDot.classList.add('radio-dot--active');
  });
});

const roleSelect = document.getElementById('role');
if (roleSelect) {
  roleSelect.addEventListener('change', () => {
    roleSelect.style.color = 'var(--color-text-main)';
  });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'index.html';
  });
}
