
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
			fontFamily: {
				sans: ['Noto Sans', 'sans-serif'],
			},
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
				// Green Screen Color Palette from the image
				'green-screen': {
					50: '#F4FFFC',   // Very light mint
					100: '#91EAAF',  // Light mint green
					200: '#C3E956',  // Bright lime green
					300: '#4D7111',  // Deep olive green
					400: '#1F4B2C',  // Dark forest green
				},
				// Mental health theme colors with greenish tint
				serenity: {
					50: '#f0f9f5',
					100: '#e0f2ea',
					200: '#c7e8d9',
					300: '#a4d6be',
					400: '#7ebf9b',
					500: '#5da67e',
					600: '#43855d',
					700: '#356847',
					800: '#2f553a',
					900: '#2b4630',
					950: '#1e2e20',
				},
				mindful: {
					50: '#f1f8f6',
					100: '#e3f1ec',
					200: '#c0e1d5',
					300: '#8bc8ad',
					400: '#51a97e',
					500: '#2e8d5e',
					600: '#1d714a',
					700: '#1b5b3d',
					800: '#1a4b34',
					900: '#16402d',
					950: '#0f2a1e',
				},
				calm: {
					50: '#f6f9f8',
					100: '#e9f5f1',
					200: '#d7eae4',
					300: '#b4d4c5',
					400: '#8ab9a1',
					500: '#679e80',
					600: '#4a7d5e',
					700: '#3f654c',
					800: '#34533e',
					900: '#2d4534',
					950: '#1c2c21',
				},
				wellness: {
					50: '#f3f8f5',
					100: '#e3f1e9',
					200: '#cedfd6',
					300: '#b0c6b9',
					400: '#91a797',
					500: '#7c8c7c',
					600: '#6c7468',
					700: '#606258',
					800: '#505347',
					900: '#44463e',
					950: '#292a25',
				},
				support: {
					50: '#eefaff',
					100: '#dbf2ea',
					200: '#bbf0d9',
					300: '#8ee6be',
					400: '#5acf95',
					500: '#3cae74',
					600: '#1d8855',
					700: '#146b45',
					800: '#114b37',
					900: '#16402d',
					950: '#0d291c',
				},
				healing: {
					50: '#edf7f5',
					100: '#d9eee6',
					200: '#bce1d1',
					300: '#8dceb4',
					400: '#58b38d',
					500: '#36957c',
					600: '#207a5d',
					700: '#18614a',
					800: '#19513b',
					900: '#164631',
					950: '#0d291c',
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
				},
				"falling": {
					"0%": { 
						transform: "translateY(-100px) rotate(0deg) scale(0.8)",
						opacity: "0" 
					},
					"10%": { 
						opacity: "1" 
					},
					"100%": { 
						transform: "translateY(100vh) rotate(360deg) scale(1)",
						opacity: "0" 
					}
				},
				"bounce-subtle": {
					"0%, 100%": {
						transform: "translateY(0)",
						animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)"
					},
					"50%": {
						transform: "translateY(-10px)",
						animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)"
					}
				},
				"spin-slow": {
					"100%": {
						transform: "rotate(360deg)"
					}
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
				"falling": "falling 10s linear infinite",
				"bounce-subtle": "bounce-subtle 2s infinite",
				"spin-slow": "spin-slow 8s linear infinite",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
