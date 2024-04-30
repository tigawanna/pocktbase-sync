/** @type {import('tailwindcss').Config} */

export default {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [
		require("daisyui"),
		require("tailwindcss-animate"),
		require("daisify-shadcn"),
		require("@tailwindcss/typography"),
	],
	daisyui: {
		themes: [
			{
				light: {
					primary: "#126468",
					"primary-focus": "#08383a",
					"primary-content": "#f3f1f1",

					secondary: "#6dc106",
					"secondary-focus": "#37ac0c",
					"secondary-content": "#ffffff",

					accent: "#856832",
					"accent-focus": "#50390c",
					"accent-content": "#ffffff",

					neutral: "#261230",
					"neutral-focus": "#320a48",

					"base-100": "#ffffff",
					"base-200": "#f8f4ef",
					"base-300": "#d8cfc3",

					"base-content": "#000000",

					info: "#1c92f2",
					success: "#009485",
					warning: "#ff9900",
					error: "#ff5724",

					"--rounded-box": "1rem",
					"--rounded-btn": "1.9rem",
					"--rounded-badge": "1.9rem",

					"--animation-btn": ".25s",
					"--animation-input": ".2s",

					"--btn-text-case": "uppercase",
					"--navbar-padding": ".5rem",
					"--border-btn": "1px",
				},
				dark: {
					primary: "#17565e",
					"primary-focus": "#18969a",
					"primary-content": "#f3f1f1",

					secondary: "#6dc106",
					"secondary-focus": "#37ac0c",
					"secondary-content": "#000000",

					accent: "#856832",
					"accent-focus": "#50390c",
					"accent-content": "#000000",

					neutral: "#333333",
					"neutral-focus": "#4d4d4d",
					"neutral-content": "#ffffff",

					"base-100": "#000000",
					"base-200": "#333333",
					"base-300": "#4d4d4d",
					"base-content": "#f7f3f6",

					info: "#0000ff",
					success: "#008000",
					warning: "#ffff00",
					error: "#ff0000",

					"--rounded-box": "1rem",
					"--rounded-btn": "1.9rem",
					"--rounded-badge": "1.9rem",

					"--animation-btn": ".25s",
					"--animation-input": ".2s",

					"--btn-text-case": "uppercase",
					"--navbar-padding": ".5rem",
					"--border-btn": "1px",
				},
				"light-brownish": {
					primary: "#6e4e02",
					"primary-focus": "#f4d166",
					"primary-content": "#ffffff",

					secondary: "#6b7203",
					"secondary-focus": "#afa460",
					"secondary-content": "#ffffff",

					accent: "#856832",
					"accent-focus": "#c8b793",
					"accent-content": "#ffffff",

					neutral: "#e9e1ce",
					"neutral-focus": "#d3cbb1",
					"neutral-content": "#847348",

					"base-100": "#faf7f5",
					"base-200": "#efeae6",
					"base-300": "#e7e2df",
					"base-content": "#1c1e01",

					info: "#1c92f2",
					success: "#009485",
					warning: "#ff9900",
					error: "#ff5724",

					"--rounded-box": "1rem",
					"--rounded-btn": "1.9rem",
					"--rounded-badge": "1.9rem",

					"--animation-btn": ".25s",
					"--animation-input": ".2s",

					"--btn-text-case": "uppercase",
					"--navbar-padding": ".5rem",
					"--border-btn": "1px",
				},
				"dark-brownish": {
					primary: "#ffda8e",
					"primary-focus": "#876b17",
					"primary-content": "#443509",

					secondary: "#afba17",
					"secondary-focus": "#a39529",
					"secondary-content": "#27290f",

					accent: "#856832",
					"accent-focus": "#966a17",
					"accent-content": "",

					neutral: "#0e0e0b",
					"neutral-focus": "#312f25",
					"neutral-content": "#f8f4ec",

					"base-100": "#1a100a",
					"base-200": "#342318",
					"base-300": "#7d6454",
					"base-content": "#e8e8de",

					info: "#1c92f2",
					success: "#009485",
					warning: "#ff9900",
					error: "#ff5724",

					"--rounded-box": "1rem",
					"--rounded-btn": "1.9rem",
					"--rounded-badge": "1.9rem",

					"--animation-btn": ".25s",
					"--animation-input": ".2s",

					"--btn-text-case": "uppercase",
					"--navbar-padding": ".5rem",
					"--border-btn": "1px",
				},
			},
		],
	},
};
