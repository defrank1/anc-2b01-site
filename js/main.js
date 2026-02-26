document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const spacer = document.querySelector('.header-spacer');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('primary-menu');

  // Set spacer height on load
  if (header && spacer) {
    spacer.style.height = header.offsetHeight + 'px';
  }

  // Update spacer height on resize (throttled)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    if (resizeTimeout) return;
    resizeTimeout = setTimeout(() => {
      if (header && spacer) {
        spacer.style.height = header.offsetHeight + 'px';
      }
      resizeTimeout = null;
    }, 150);
  });

  // Auto-update copyright year
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // External links open in new tab
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // Hamburger menu toggle with Escape key and auto-close behaviors
  function closeMenu() {
    if (menu) menu.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when any nav link is clicked (navigating away)
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on Escape key, return focus to toggle button
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });

    // Close menu if viewport resizes above mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1150 && menu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // GovDelivery subscription form toggle (email ↔ SMS) — contact.html only
  const gdForm = document.getElementById('GD-snippet-form');
  if (gdForm) {
    const typeSelect = gdForm.querySelector('#subscription_type');
    if (typeSelect) {
      function toggleGovDeliveryType() {
        const isEmail = typeSelect.value === 'email';
        const emailFields = gdForm.querySelector('.email_fields');
        const emailInput = gdForm.querySelector('.email_text_field');
        const wirelessFields = gdForm.querySelector('.wireless_fields');
        const wirelessInput = gdForm.querySelector('.wireless_text_field');
        const countrySelect = gdForm.querySelector('#country_code_display');

        if (emailFields) emailFields.style.display = isEmail ? 'block' : 'none';
        if (emailInput) {
          emailInput.required = isEmail;
          emailInput.disabled = !isEmail;
        }
        if (wirelessFields) wirelessFields.style.display = isEmail ? 'none' : 'block';
        if (wirelessInput) {
          wirelessInput.required = !isEmail;
          wirelessInput.disabled = isEmail;
        }
        if (countrySelect) countrySelect.disabled = isEmail;
      }
      typeSelect.addEventListener('change', toggleGovDeliveryType);
    }
  }

  // Smooth scrolling for anchor links
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.getElementById(targetId.slice(1));
      if (!target) return;

      e.preventDefault();

      const headerHeight = header?.offsetHeight || 0;
      const y = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: y, behavior: prefersReducedMotion ? 'auto' : 'smooth' });

      setTimeout(() => {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => {
          target.removeAttribute('tabindex');
        }, { once: true });
      }, prefersReducedMotion ? 0 : 500);
    });
  });
});
