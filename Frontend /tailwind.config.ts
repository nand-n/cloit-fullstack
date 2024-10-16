import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3636F0',
        secondary: '#1D9BF0',
        success: '#0CAF60',
        warning: '#FACC15',
        error: '#E03137',
        orange: '#FE964A',
        blue: '#0062FF',
        purple: '#8C62FF',
        light_purple: '#E7E7FF',
        lime_green:"#9FF443",
        arctic_blue:'#253BFF',
        blue_gray:'#101828',
        blue_gray_800:'#1D2939',
        gray_300:'#D0D5DD'
      },
    },
  },
  plugins: [],
};
export default config;
