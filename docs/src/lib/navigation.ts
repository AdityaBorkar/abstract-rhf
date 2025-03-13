import { PiBookOpen, PiCodeBlock, PiFile } from "react-icons/pi";

export const examples = [
	// Option to turn on DEVTOOLS, Code in the side, integrated with shadcn/registry
	// Make a codesandbox for each  type of form in BUN.
	// Fully type-safe
	// TODO: Throw errors if fieldNames are not found in the schema
	// TODO: Async validation like GSTIN search

	// https://github.com/react-hook-form/react-hook-form/tree/master/examples
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
			{
				href: "/examples/modal",
				label: "Modal Form",
			},
			{
				href: "/examples/tab",
				label: "Tab Form",
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
	{
		label: "With Other Libraries",
		items: [
			{
				href: "/next-safe-actions",
				label: "Next Safe Actions",
			},
			{
				href: "/sonner",
				label: "Sonner",
			},
		],
	},
];

export const docs = [
	{
		label: "Getting Started",
		items: [
			{
				href: "/introduction",
				label: "Introduction",
			},
			{
				href: "/installation",
				label: "Installation",
			},
		],
	},
	{
		label: "Basics",
		items: [
			{
				href: "/schema-library",
				label: "Schema Library",
				// https://www.react-hook-form.com/faqs/#Howtoinitializeformvalues
			},
			{
				href: "/default-values",
				label: "Default Values",
				// https://www.react-hook-form.com/faqs/#Howtoinitializeformvalues
			},
			{
				href: "/submit-resolver",
				label: "Submit Resolver",
			},
			{
				href: "/error-handling",
				label: "Error Handling",
				// https://www.react-hook-form.com/advanced-usage/#CustomHookwithResolver
			},
			{
				href: "/persisting-resolver",
				label: "Persisting Resolver",
			},
			{
				href: "/react-ref-id",
				label: "React Ref & Id",
			},
		],
	},
	{
		label: "Integrating Components",
		items: [
			{
				href: "/controlled-components",
				label: "Controlled Components",
				// https://www.react-hook-form.com/advanced-usage/#ControlledmixedwithUncontrolledComponents
			},
			{
				href: "/components",
				label: "Component Library",
				// https://www.react-hook-form.com/advanced-usage/#SmartFormComponent
			},
			{
				href: "/ui-library",
				label: "UI Library",
				// https://www.react-hook-form.com/get-started/#IntegratingwithUIlibraries
			},
		],
	},
	{
		label: "Complex Forms",
		items: [
			// Dynamic Multi-step Forms: Complex conditional rendering and nested fields.
			// Asynchronous Forms: Real-time validation with API integration.
			// Dependent Field Forms: Dynamic updates based on interrelated inputs.
			// Custom Validation Forms: Advanced error handling and business logic.
			// Basic Controlled Forms: Minimal state management and simple validations.
			// Fields that generate/remove nested fields (e.g., arrays of objects).
			// Schema validation for dynamic structures (e.g., JSON Schema or Yup).
			// UI re-render optimization for deeply nested components.
			// 			Complexity Drivers:

			// Performance optimization (virtualization, memoization).

			// Partial form submission/pagination.

			// Efficient dirty state tracking.
			// Debounced API calls for validation (e.g., username availability).

			// Cascading updates (e.g., country → state → city chains).

			// Race condition handling for interdependent async logic.

			// Full keyboard navigation and screen reader support.

			// ARIA roles, live error announcements, and focus management.

			// Custom component accessibility (e.g., date pickers).

			// Drag-and-drop with previews/editing (e.g., image cropping).

			// Chunked uploads, progress tracking, and retries.

			// Integration with cloud APIs (e.g., AWS S3 signed URLs).

			// Immutable state snapshots and history stacks.

			// Selective undo/redo for specific fields.

			// Dynamic translation reloading.

			// RTL layout shifts and date/number formatting.

			// Validation messages in multiple languages.

			// Clean state reset for hidden fields.

			// Context-based rendering (e.g., React Context or state-driven UI).

			// Form state management (e.g., Formik/React Hook Form).

			// Basic sync/async validation.

			// State Management: Global vs. local state, middleware (Redux, Zustand).

			// Performance: Re-renders, memoization, and large dataset handling.

			// Integration: Third-party services (APIs, auth, payment gateways).

			// Validation: Cross-field, async, and schema-based logic.

			{
				href: "/virtualized-lists",
				label: "Virtualized Lists",
				// https://www.react-hook-form.com/advanced-usage/#Workingwithvirtualizedlists
			},
			{
				href: "/ai-button",
				label: "AI Button",
			},
			{
				href: "/wizard",
				label: "Wizard",
			},
			{
				href: "/funnel",
				label: "Funnel",
			},
		],
	},
	{
		label: "Misc.",
		items: [
			{
				href: "/testing",
				label: "Testing",
				// https://www.react-hook-form.com/advanced-usage/#TestingForm
			},
			{
				href: "/devtools",
				label: "DevTools",
			},
			{
				href: "/accessibility",
				label: "Accessibility",
				// https://www.react-hook-form.com/faqs/#Howtocreateanaccessibleinputerrorandmessage
			},
			{
				href: "/i18n",
				label: "Internationalization",
				// https://www.react-hook-form.com/faqs/#Howtointernationalizeyourform
			},
			{
				href: "/cursor-rules",
				label: "Cursor Rules 🐤",
			},
		],
	},
];

export const api = [
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

// 	Form-level Validation
// Error Messages
// Wizards and multi-step forms
// Field-level validation
// Array Fields
// API Errors
// Custom Validation
// Internationalization (i18n)
// Auto-saving forms
// Dependent Validation
// Conditional Logic
// Dynamic Fields
// React Native
// Tree shakeable

// Field Arrays

//  {/* If this field has been touched, and it contains an error, display it
//             */}
// 			{touched.username && errors.username && <div>{errors.username}</div>}

// mode: controlled / uncontrolled
// form.setFieldError
// form.onError, form.onSubmit
// validateOnBlur: true,

// Sort by popularity (according to State of React 2024)
// zod
// joi
// ajv
// yup
// arktype
// valibot
// typebox
// superstruct
// standard-schema
// TODO: Write the speed benchmarks here itself, so that it's easy to choose.

// Upvote for the following packages. Once we receive more than 1000 upvote on GitHub, we will add it to the list.
