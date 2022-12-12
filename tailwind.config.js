/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms')
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#4d7c0f",

          "secondary": "#fbbf24",

          "accent": "#44403c",

          "neutral": "#19202E",

          "base-100": "#44403c",

          "info": "#A0BDE3",

          "success": "#63DE96",

          "warning": "#F3A01B",

          "error": "#F74B45",
        },
      },
    ],
  },
}
