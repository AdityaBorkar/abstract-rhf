import { PiBookOpen, PiCodeBlock, PiFile } from "react-icons/pi";

const examples = [
	{
		href: "/examples/simple",
		label: "Simple Form",
	},
	{
		href: "/examples/reusable",
		label: "Reusable Form",
	},
	{
		href: "/examples/complex",
		label: "Complex Form",
	},
	{
		href: "/examples/conditional",
		label: "Conditional Form",
	},
];

const docs = [
	{
		href: "/introduction",
		label: "Introduction",
	},
	{
		href: "/getting-started",
		label: "Getting Started",
		// Choose your tools
		// Create Schema
		// Register Fields
		// Reset adn Submit Button
	},
	{
		href: "/default-values",
		label: "Default Values",
		// https://www.react-hook-form.com/faqs/#Howtoinitializeformvalues
	},
	{
		href: "/react-ref-id",
		label: "React Ref & Id",
	},
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
		label: "Controlled Inputs (Soon)",
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
	{
		href: "/react-native",
		label: "React Native (Coming Soon)",
	},
	{
		href: "/cursor-rules",
		label: "Cursor Rules",
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
		items: [],
	},
	{
		icon: PiCodeBlock,
		basePath: "examples",
		label: "Examples",
		items: examples,
	},
];
