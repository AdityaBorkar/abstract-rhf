import { PiBookOpen, PiCodeBlock, PiFile } from "react-icons/pi";

const examples = [
	{
		label: "Simple",
		items: [
			{
				href: "/examples/simple",
				label: "Simple Form",
			},
			{
				href: "/examples/reusable",
				label: "Reusable Form",
			},
		],
	},
	{
		label: "Complex",
		items: [
			{
				href: "/examples/complex",
				label: "Complex Form",
			},
			{
				href: "/examples/conditional",
				label: "Conditional Form",
			},
		],
	},
];

const docs = [
	{
		label: "Getting Started",
		items: [
			{
				href: "/introduction",
				label: "Introduction",
			},
			{
				href: "/getting-started",
				label: "Getting Started",
			},
		],
	},
	{
		label: "Basics",
		items: [
			{
				href: "/default-values",
				label: "Default Values",
				// https://www.react-hook-form.com/faqs/#Howtoinitializeformvalues
			},
			{
				href: "/persisting-data",
				label: "Persisting Data",
			},
			{
				href: "/error-handling",
				label: "Error Handling",
			},
			{
				href: "/react-ref-id",
				label: "React Ref & Id",
			},
		],
	},
	{
		label: "Components",
		items: [
			{
				href: "/shadcn",
				label: "ShadCN Components",
			},
			{
				href: "/components",
				label: "Component Library",
			},
			{
				href: "/controlled-inputs",
				label: "Controlled Inputs 🐤",
			},
		],
	},
	{
		label: "Advanced",
		items: [
			{
				href: "/wizard",
				label: "Wizard / Funnel Forms",
			},
			{
				href: "/accessibility",
				label: "Accessibility",
				// https://www.react-hook-form.com/faqs/#Howtocreateanaccessibleinputerrorandmessage
			},
			{
				href: "/testing",
				label: "Testing Forms",
			},
		],
	},
	{
		label: "Misc.",
		items: [
			{
				href: "/react-native",
				label: "React Native 🐤",
			},
			{
				href: "/cursor-rules",
				label: "Cursor Rules 🐤",
			},
		],
	},
];

const api = [
	{
		label: "API Reference",
		items: [
			{
				href: "/api/useForm",
				label: "useForm",
			},
		],
	},
];

export const sections = [
	{
		icon: PiFile,
		basePath: "docs",
		label: "Documentation",
		items: docs,
	},
	{
		icon: PiBookOpen,
		basePath: "api",
		label: "API Reference",
		items: api,
	},
	{
		icon: PiCodeBlock,
		basePath: "examples",
		label: "Examples",
		items: examples,
	},
];

// Choose your tools
// Create Schema
// Register Fields
// Reset and Submit Button

// How to use random button
// How to use AI button
