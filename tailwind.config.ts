import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "mb-black": "#1E222B",
        "mb-red": "#CE1623",
        "mb-grey": "#3A3D45",
        "mb-yellow": "#FAAF00",
        "mb-dark-yellow": "#c38019",
        "mb-gray": "#d2d2d4",
        "mb-text-grey": "#3A4A6D",
        "mb-bg-green": "#5CB85C"
      }
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1199px",
        xl: "1199px",
        "2xl": "1199px"
      }
    },
  },
  plugins: [],
}
export default config
