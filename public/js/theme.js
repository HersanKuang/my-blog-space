/* eslint-disable */
(function () {
  const t = localStorage.getItem('theme') || 'auto';
  const d = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const c = t === 'auto' ? (d ? 'dark' : 'light') : t;
  if (c === 'dark') {
    document.documentElement.classList.add('dark');
  }

  function h() {
    const c = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const n = c === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', n === 'dark');
    localStorage.setItem('theme', n);
    m(n);
  }

  function m(e) {
    const s = document.querySelector('#theme-icon-sun');
    const o = document.querySelector('#theme-icon-moon');
    if (e === 'dark') {
      s.classList.add('hidden');
      o.classList.remove('hidden');
    } else {
      s.classList.remove('hidden');
      o.classList.add('hidden');
    }
  }

  document.getElementById('theme-toggle-button').addEventListener('click', h);

  const i = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  m(i);

  window.addEventListener('storage', function (e) {
    if (e.key === null) {
      const d = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const s = d ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', s === 'dark');
      m(s);
    }
  });
})();
