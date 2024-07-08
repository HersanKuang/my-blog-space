import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // 启用深色模式
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ffffff', // 浅色主题的主色
          dark: '#252d38' // 深色主题的主色
        },
        secondary: {
          light: '#f2f5f8', // 浅色主题字体背景的颜色
          dark: '#3e4b5e' // 深色主题字体背景的颜色
        },
        background: {
          light: '#f2f5f8',
          dark: '#181c27'
        },
        text: {
          light: '#475c6e',
          dark: '#eeeeef'
        }
      },
      maxWidth: {
        '8xl': '90rem', // 自定义 8xl, 对应 1440px
        '9xl': '96rem' // 自定义 9xl, 对应 1536px
      }
    }
  },
  plugins: []
};
export default config;
