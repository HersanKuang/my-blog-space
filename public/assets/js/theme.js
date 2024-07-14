/* eslint-disable */
(function () {
  // 从 localStorage 中获取用户偏好的主题，如果没有则默认为 'auto'
  const t = localStorage.getItem('user-theme') || 'auto';
  // 检查系统是否偏好深色模式
  const d = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // 如果设置的主题为 auto 则返回系统主题，否则返回用户设置的主题
  const c = t === 'auto' ? (d ? 'dark' : 'light') : t;
  const i = document.querySelector('#theme-toggle-icon');

  // 设置主题函数
  function st(theme) {
    // 清空按钮状态
    i.classList.remove('translate-theme');
    if (theme !== 'auto') {
      if (theme === 'dark') {
        i.classList.add('translate-theme');
        // 如果是深色主题，添加 'dark' 类
        document.documentElement.classList.add('dark');
      } else {
        i.classList.remove('translate-theme');
        // 如果是浅色主题，移除 'dark' 类
        document.documentElement.classList.remove('dark');
      }
    } else {
      const s = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (s) {
        i.classList.add('translate-theme');
        document.documentElement.classList.add('dark');
      } else {
        i.classList.remove('translate-theme');
        document.documentElement.classList.remove('dark');
      }
    }
    // 将用户偏好主题存储在 localStorage 中
    localStorage.setItem('user-theme', theme);
    // 更新主题图标
    m(theme);
  }

  // 如果当前主题是深色，添加 'dark' 类
  if (c === 'dark') {
    i.classList.add('translate-theme');
    document.documentElement.classList.add('dark');
  }

  // 处理主题切换函数
  function h() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    st(newTheme);
  }

  // 更新主题图标函数
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

  // 为主题切换按钮添加点击事件监听器
  document.getElementById('theme-toggle-button').addEventListener('click', h);

  // 监听系统主题变化并更新主题
  const u = e => {
    st('auto');
  };

  // 创建媒体查询对象并添加事件监听器
  const q = window.matchMedia('(prefers-color-scheme: dark)');
  q.addEventListener('change', u);
})();
