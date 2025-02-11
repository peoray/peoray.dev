/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      spacing: {
        12.5: '3.125rem',
        80: '20rem',
        108: '27rem',
      },
      borderWidth: {
        14: '14px',
      },
      colors: {
        // background: {
        //   primary: 'var(--bg-background-primary)',
        //   secondary: 'var(--bg-background-secondary)',
        //   tertiary: 'var(--bg-background-tertiary)',
        //   form: 'var(--bg-background-form)',
        // },
        // copy: {
        //   primary: 'var(--text-copy-primary)',
        //   secondary: 'var(--text-copy-hover)',
        //   heading: 'var(--text-copy-secondary)',
        // },
        // 'border-color': {
        //   primary: 'var(--border-border-color-primary)',
        // },
      },
    },
    container: {
      padding: '1rem',
    },
    fontFamily: {
      sans: [
        'Nunito Sans',
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
