// Wait until page is fully loaded
window.addEventListener('load', () => {
  const header = document.querySelector('.site-header'); // Select the fixed header
  const spacer = document.querySelector('.header-spacer'); // Select the spacer below it

  // Set spacer height equal to header height to push main content below
  if (header && spacer) {
    spacer.style.height = header.offsetHeight + 'px';
  }
});
