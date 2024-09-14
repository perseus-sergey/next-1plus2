/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aqua: 'aqua', // Додає кастомний колір 'aqua'
      },
      // Якщо ви хочете використовувати прозорість, вам потрібно налаштувати кольори з alpha
      backgroundColor: (theme) => ({
        ...theme('colors'),
        'aqua-opacity': 'rgba(0, 255, 255, 0.5)', // Додає кастомний фон з прозорістю
      }),
    },
  },
  variants: {},
  plugins: [],
};
