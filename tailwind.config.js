/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

export default {
    darkMode: 'class',
    content: [
      "./node_modules/flowbite/**/*.js",
      "./src/**/*.{js,ts,jsx,tsx}", // أو حسب مكان ملفاتك
    ],
    theme: {
      extend: {},
    },
    plugins: [
      flowbitePlugin // 👈 مهم!
    ],
  }
  