/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			'prussian': {
  				DEFAULT: '#153243',
  				light: '#1a3d52',
  				dark: '#102736',
  				darker: '#0a1721',
  				50: '#e6ebed',
  				100: '#ccd7dc',
  				200: '#99afb9',
  				300: '#668796',
  				400: '#335f73',
  				500: '#153243',
  				600: '#112836',
  				700: '#0d1e28',
  				800: '#08141b',
  				900: '#040a0d'
  			},
  			'ivory': {
  				DEFAULT: '#f4f9e9',
  				dark: '#e9f2d4',
  				light: '#f9fcf2',
  				50: '#fefffe',
  				100: '#f4f9e9',
  				200: '#e9f4d3',
  				300: '#d3e8a7',
  				400: '#b8d670',
  				500: '#9cc042',
  				600: '#7d9a35',
  				700: '#5e7328',
  				800: '#3f4d1b',
  				900: '#20260d'
  			},
  			'ash': {
  				DEFAULT: '#b4b8ab',
  				light: '#c2c5bb',
  				dark: '#a6ab9b',
  				50: '#f7f7f6',
  				100: '#b4b8ab',
  				200: '#a6ab9b',
  				300: '#898f7c',
  				400: '#6b725d',
  				500: '#4e543f',
  				600: '#3e4332',
  				700: '#2f3226',
  				800: '#1f2219',
  				900: '#10110d'
  			},
  			'indigo': {
  				DEFAULT: '#284b63',
  				light: '#305875',
  				dark: '#203e51',
  				50: '#eaeff2',
  				100: '#284b63',
  				200: '#234156',
  				300: '#1b3242',
  				400: '#14232e',
  				500: '#0c141a',
  				600: '#0a1015',
  				700: '#070c10',
  				800: '#05080a',
  				900: '#020405'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
