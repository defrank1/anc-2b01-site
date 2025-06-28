// Wait until page is fully loaded
window.addEventListener('load', () => {
  const header = document.querySelector('.site-header');
  const spacer = document.querySelector('.header-spacer');
  if (header && spacer) {
    spacer.style.height = header.offsetHeight + 'px';
  }

  // Open all external links in a new tab
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});

/*for hamburger */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('nav.right ul');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
});


// Smooth scroll with fixed-header offset, now scrolling to correct spot
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');

    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const header = document.querySelector('.site-header');
    const headerHeight = header?.offsetHeight || 0;

    const y = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    // Perform scroll
    window.scrollTo({ top: y, behavior: 'smooth' });

    // Optional: set focus for accessibility — without jumping the scroll again
    // Use setTimeout to wait until scroll is done (roughly)
    setTimeout(() => {
      target.setAttribute('tabindex', '-1'); // ensure it's focusable
      target.focus({ preventScroll: true }); // don't re-jump viewport
    }, 500); // match the scroll animation duration
  });
});
