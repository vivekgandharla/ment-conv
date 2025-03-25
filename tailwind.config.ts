
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Mental health theme colors
				serenity: {
					50: '#f0f4ff',
					100: '#e0e9ff',
					200: '#c7d7fe',
					300: '#a4bcfc',
					400: '#7e9bf7',
					500: '#5d78f0',
					600: '#4358e5',
					700: '#3544ce',
					800: '#2f3aa6',
					900: '#2b3584',
					950: '#1e244e',
				},
				mindful: {
					50: '#f1f7fe',
					100: '#e3eefb',
					200: '#c0ddf8',
					300: '#8bc5f2',
					400: '#51a9ea',
					500: '#2e8eda',
					600: '#1e71bb',
					700: '#1b5b98',
					800: '#1b4b7c',
					900: '#1a4068',
					950: '#122a47',
				},
				calm: {
					50: '#f6f9fd',
					100: '#eaf1f9',
					200: '#d7e4f4',
					300: '#b4ccea',
					400: '#8aaedd',
					500: '#6a8fd2',
					600: '#4b70c5',
					700: '#3f5db4',
					800: '#354d94',
					900: '#304276',
					950: '#222b4a',
				},
				wellness: {
					50: '#f3f8fb',
					100: '#e3f1f8',
					200: '#cedef0',
					300: '#b0c6e3',
					400: '#91a7d4',
					500: '#7c8dc7',
					600: '#6c74ba',
					700: '#6062a7',
					800: '#505388',
					900: '#44466f',
					950: '#292a43',
				},
				support: {
					50: '#eef7ff',
					100: '#daeeff',
					200: '#bcdfff',
					300: '#8ecdff',
					400: '#5ab1ff',
					500: '#3c94ff',
					600: '#1d74f8',
					700: '#145aea',
					800: '#1748bd',
					900: '#164095',
					950: '#132966',
				},
				healing: {
					50: '#edf8ff',
					100: '#d9eeff',
					200: '#bce1ff',
					300: '#8dceff',
					400: '#58b3fd',
					500: '#3695f8',
					600: '#207aed',
					700: '#1861d8',
					800: '#1951af',
					900: '#1a468b',
					950: '#142b59',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": { 
						opacity: "0",
						transform: "translateY(10px)" 
					},
					"100%": { 
						opacity: "1",
						transform: "translateY(0)" 
					}
				},
				"fade-out": {
					"0%": { 
						opacity: "1",
						transform: "translateY(0)" 
					},
					"100%": { 
						opacity: "0",
						transform: "translateY(10px)" 
					}
				},
				"scale-in": {
					"0%": { 
						transform: "scale(0.95)",
						opacity: "0" 
					},
					"100%": { 
						transform: "scale(1)",
						opacity: "1" 
					}
				},
				"scale-out": {
					from: { transform: "scale(1)", opacity: "1" },
					to: { transform: "scale(0.95)", opacity: "0" }
				},
				"slide-in-right": {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0)" }
				},
				"slide-out-right": {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(100%)" }
				},
				"pulse-gentle": {
					"0%, 100%": { 
						transform: "scale(1)",
						opacity: "1" 
					},
					"50%": { 
						transform: "scale(1.05)",
						opacity: "0.9" 
					}
				},
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" }
				},
				"breathe": {
					"0%, 100%": { transform: "scale(1)" },
					"50%": { transform: "scale(1.05)" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.4s ease-out",
				"fade-out": "fade-out 0.4s ease-out",
				"scale-in": "scale-in 0.3s ease-out",
				"scale-out": "scale-out 0.3s ease-out",
				"slide-in-right": "slide-in-right 0.3s ease-out",
				"slide-out-right": "slide-out-right 0.3s ease-out",
				"enter": "fade-in 0.4s ease-out, scale-in 0.3s ease-out",
				"exit": "fade-out 0.4s ease-out, scale-out 0.3s ease-out",
				"pulse-gentle": "pulse-gentle 3s infinite ease-in-out",
				"float": "float 6s infinite ease-in-out",
				"breathe": "breathe 4s infinite ease-in-out",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
