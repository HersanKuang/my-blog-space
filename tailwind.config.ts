/* eslint-disable func-names */
import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  darkMode: 'class',
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
        },
        'sec-text': {
          light: '#20232b',
          dark: '#f7f7fb'
        },
        'theme-btn': {
          light: '#f1f1f1',
          dark: '#2f2f2f'
        }
      },
      fontSize: {
        '0.9': '0.9rem',
        md: '1.125rem'
      },
      fill: {
        'text-light': '#424a57',
        'text-dark': '#f3f3f4'
      },
      minHeight: {
        'blog-body': 'calc(100vh - 3rem - 24px)'
      },
      maxWidth: {
        '7.5xl': '87rem',
        '8xl': '90rem', // 自定义 8xl, 对应 1440px
        '9xl': '96rem' // 自定义 9xl, 对应 1536px
      },
      screens: {
        '2xl': '1230px',
        xl: '1024px'
      },
      spacing: {
        '0.05': '0.05rem',
        '4.5': '1.125rem',
        '74rem': '74rem',
        '62rem': '62rem'
      },
      transitionDuration: {
        '400': '400ms'
      }
    }
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        '.line-clamp-2': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
          'text-overflow': 'ellipsis',
          'white-space': 'normal'
        }
      });
    }
  ]
};

export default config;
