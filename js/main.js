document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const spacer = document.querySelector('.header-spacer');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('nav.right ul');

  // Set spacer height on load
  if (header && spacer) {
    spacer.style.height = header.offsetHeight + 'px';
  }

  // Update spacer height on resize
  window.addEventListener('resize', () => {
    if (header && spacer) {
      spacer.style.height = header.offsetHeight + 'px';
    }
  });

  // External links open in new tab
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // Hamburger toggle
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.getElementById(targetId.slice(1));
      if (!target) return;

      e.preventDefault();

      const headerHeight = header?.offsetHeight || 0;
      const y = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: y, behavior: 'smooth' });

      setTimeout(() => {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => {
          target.removeAttribute('tabindex');
        }, { once: true });
      }, 500);
    });
  });
});
