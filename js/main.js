// Adjust .header-spacer height to match fixed header height dynamically
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const spacer = document.querySelector('.header-spacer');

  function adjustSpacerHeight() {
    if (header && spacer) {
      const height = header.offsetHeight;
      spacer.style.height = height + 'px';
    }
  }

  // Initial adjustment
  adjustSpacerHeight();

  // Re-adjust on window resize
  window.addEventListener('resize', adjustSpacerHeight);
});
