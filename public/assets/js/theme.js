(function () {
  function setTheme(newTheme) {
    window.__theme = newTheme;
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }

  let preferredTheme;
  try {
    preferredTheme = localStorage.getItem('theme');
  } catch (err) {}

  window.__setPreferredTheme = function (newTheme) {
    preferredTheme = newTheme;
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (err) {}
  };

  let initialTheme = preferredTheme;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  if (!initialTheme) {
    initialTheme = darkQuery.matches ? 'dark' : 'light';
  }
  setTheme(initialTheme);

  darkQuery.addEventListener('change', function (e) {
    if (!preferredTheme) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  document.documentElement.classList.add(
    window.navigator.platform.includes('Mac') ? 'platform-mac' : 'platform-win'
  );
})();
