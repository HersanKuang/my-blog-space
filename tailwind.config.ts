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
          light: '#f6f6fa',
          dark: '#171819'
        },
        'sec-bgc': {
          light: '#ffffff',
          dark: '#000000'
        },
        'thr-bgc': {
          light: '#ffffff',
          dark: '#212121'
        },
        text: {
          light: '#424a57',
          dark: '#f3f3f4'
        }
      },
      maxWidth: {
        '7.5xl': '86rem',
        '8xl': '90rem', // 自定义 8xl, 对应 1440px
        '9xl': '96rem' // 自定义 9xl, 对应 1536px
      },
      screens: {
        '2xl': '1230px',
        xl: '1024px'
      },
      spacing: {
        '74rem': '74rem',
        '62rem': '62rem'
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
