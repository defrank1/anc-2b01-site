document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const spacer = document.querySelector('.header-spacer');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('nav.right ul');

  // Set spacer height on load
  if (header && spacer) {
    spacer.style.height = header.offsetHeight + 'px';
  }

  toggle.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');

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

  // Newsletter form toggle logic
  const newsletterForm = document.getElementById('GD-snippet-form');
  if (newsletterForm) {
    const typeSelect = newsletterForm.querySelector('#subscription_type');
    const emailFields = newsletterForm.querySelector('.email_fields');
    const emailInput = newsletterForm.querySelector('.email_text_field');
    const wirelessFields = newsletterForm.querySelector('.wireless_fields');
    const wirelessInput = newsletterForm.querySelector('.wireless_text_field');
    const countrySelect = newsletterForm.querySelector('#country_code_display');

    const toggleNewsletterFields = () => {
      if (typeSelect.value === 'email') {
        emailFields.style.display = 'block';
        emailInput.required = true;
        emailInput.disabled = false;
        wirelessFields.style.display = 'none';
        wirelessInput.required = false;
        wirelessInput.disabled = true;
        countrySelect.disabled = true;
      } else {
        emailFields.style.display = 'none';
        emailInput.required = false;
        emailInput.disabled = true;
        wirelessFields.style.display = 'block';
        wirelessInput.required = true;
        wirelessInput.disabled = false;
        countrySelect.disabled = false;
      }
    };

    typeSelect.addEventListener('change', toggleNewsletterFields);
    toggleNewsletterFields(); // initialize on load
  }
});
