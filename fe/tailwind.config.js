/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',

    // ✅ exclude (giảm scan đáng kể nếu bạn có)
    '!./src/**/*.test.{js,ts,jsx,tsx}',
    '!./src/**/*.spec.{js,ts,jsx,tsx}',
    '!./src/**/*.stories.{js,ts,jsx,tsx,mdx}',
    '!./src/**/__tests__/**',
    '!./src/**/__mocks__/**',
  ],
  theme: { /* giữ nguyên */ },
  plugins: [],
}
export default config
