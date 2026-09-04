const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const localeButton = document.querySelector('.locale-button');
const localeMenu = document.querySelector('.locale-menu');

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 8);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open') ?? false;
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

localeButton?.addEventListener('click', () => {
  const isOpen = localeMenu?.hasAttribute('hidden') ?? true;
  localeMenu?.toggleAttribute('hidden', !isOpen);
  localeButton.setAttribute('aria-expanded', String(isOpen));
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.locale-picker')) {
    localeMenu?.setAttribute('hidden', '');
    localeButton?.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    localeMenu?.setAttribute('hidden', '');
    localeButton?.setAttribute('aria-expanded', 'false');
    navLinks?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

document.querySelectorAll('[data-app-store-link]').forEach((link) => {
  link.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('zone:app-store-click', {
      detail: {
        page: document.body.dataset.page,
        locale: document.documentElement.lang,
        placement: link.dataset.placement || 'unknown'
      }
    }));
  });
});
