(() => {
  const portrait = document.querySelector('#portraitFlip');
  const flip = (e) => {
    if (e && e.target.closest && e.target.closest('a')) return;
    const flipped = portrait.classList.toggle('is-flipped');
    portrait.setAttribute('aria-pressed', String(flipped));
    portrait.setAttribute('aria-label', flipped ? 'Return to profile photo' : 'Flip profile photo');
  };
  if (portrait) {
    portrait.addEventListener('click', flip);
    portrait.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target === portrait) { e.preventDefault(); flip(); }
    });
  }
  const themeToggle = document.querySelector('#themeToggle');
  const savedTheme = localStorage.getItem('nook-portfolio-theme');
  if (savedTheme === 'cream') document.documentElement.dataset.theme = 'cream';
  const updateThemeButton = () => {
    if (!themeToggle) return;
    const cream = document.documentElement.dataset.theme === 'cream';
    themeToggle.setAttribute('aria-label', cream ? 'Switch to dark theme' : 'Switch to cream light theme');
    themeToggle.querySelector('.theme-label').textContent = cream ? 'Dark' : 'Cream';
    themeToggle.querySelector('.theme-icon').textContent = cream ? '◐' : '☼';
  };
  if (themeToggle) {
    updateThemeButton();
    themeToggle.addEventListener('click', () => {
      const cream = document.documentElement.dataset.theme !== 'cream';
      if (cream) document.documentElement.dataset.theme = 'cream';
      else delete document.documentElement.dataset.theme;
      localStorage.setItem('nook-portfolio-theme', cream ? 'cream' : 'dark');
      updateThemeButton();
    });
  }
  const items = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
    }), {threshold: .12, rootMargin: '0px 0px -30px 0px'});
    items.forEach(item => observer.observe(item));
  } else items.forEach(item => item.classList.add('is-visible'));
})();