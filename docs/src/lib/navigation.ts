import { PiBookOpen, PiCodeBlock, PiFile } from 'react-icons/pi';

export const examples = [
	// Option to turn on DEVTOOLS, Code in the side, integrated with shadcn/registry
	// Make a codesandbox for each  type of form in BUN.
	// Fully type-safe
	// TODO: Throw errors if fieldNames are not found in the schema
	// TODO: Async validation like GSTIN search
	// File Uploads
	// useField hook

	// Intent
	//   const [form] = useForm({
	//     onSubmit(event, { formData }) {
	//       event.preventDefault();

	//       switch (formData.get('intent')) {
	//         case 'add-to-cart':
	//           // Add to cart
	//           break;
	//         case 'buy-now':
	//           // Buy now
	//           break;
	//       }
	//     },
	//   });
	// 	<button type="submit" name="intent" value="add-to-cart">
	// 	Add to Cart
	//   </button>
	//   <button type="submit" name="intent" value="buy-now">
	// 	Buy now
	//   </button>

	// https://github.com/react-hook-form/react-hook-form/tree/master/examples
	{
		label: 'Basics',
		items: [
			{
				href: '/simple-form',
				label: 'Simple Form',
			},
			{
				href: '/list-of-fields',
				label: 'List of Fields',
			},
			{
				href: '/async-validation',
				label: 'Async Validation',
			},
			{
				href: '/trigger-validation',
				label: 'Trigger Validation',
			},
			{
				href: '/conditional-fields',
				label: 'Conditional Fields',
			},
			// ---
			{
				href: '/save-drafts',
				label: 'Save Drafts',
			},
			{
				href: '/update-dirty-fields',
				label: 'Update Dirty Fields',
			},
			{
				href: '/delete-form',
				label: 'Delete Form',
			},
			{
				href: '/table-action-form',
				label: 'Table Action Form',
			},
			{
				href: '/splitting-forms',
				label: 'Splitting Forms',
			},
			{
				href: '/accessibility',
				label: 'Accessibility',
			},
			{
				href: '/modal-forms',
				label: 'Modal Forms',
			},
			{
				href: '/nested-forms',
				label: 'Nested Forms',
			},
		],
	},
	{
		label: 'Use Cases',
		items: [
			{
				href: '/signup-form',
				label: 'Signup Form',
			},
			{
				href: '/otp-form',
				label: 'OTP Form',
			},
			{
				href: '/google-translate',
				label: 'Google Translate (EN to HI)',
			},
			{
				href: '/with-components',
				label: 'With Components',
				// Voice Based Inputs / Media Inputs
			},
			{
				href: '/ai-features',
				label: 'AI Features',
				// Autocomplete Suggestions AND Summarize/Generate Tags.
			},
		],
	},
	{
		label: 'Advanced',
		items: [
			{
				href: '/persisting-form-data',
				label: 'Persisting Form Data',
			},
			{
				href: '/react-hooks',
				label: 'React Hooks',
			},
			{
				href: '/react-context',
				label: 'React Context',
			},
			{
				href: '/multi-step-forms',
				label: 'Multi Step Forms',
				// with hooks for back(), next(), progress
			},
			{
				href: '/field-dependent-forms',
				label: 'Field Dependent Forms',
			},
			{
				href: '/react-actions',
				label: 'React Actions',
			},
			{
				href: '/rest-endpoint',
				label: 'REST Endpoint',
			},
			{
				href: '/graphql-endpoint',
				label: 'GraphQL Endpoint',
			},
			{
				href: '/multilingual-forms',
				label: 'Multilingual Forms',
			},
		],
	},
	{
		label: 'Integrations',
		items: [
			{
				href: '/file-uploads-using-tus',
				label: 'File Uploads Using TUS',
			},
			{
				href: '/next-safe-actions',
				label: 'Next Safe Actions',
			},
			{
				href: '/sonner',
				label: 'Sonner',
			},
			{
				href: '/zustand',
				label: 'Zustand',
			},
			{
				href: '/react-query',
				label: 'React Query',
			},
			{
				href: '/trpc',
				label: 'TRPC',
			},
			{
				href: '/google-recaptcha',
				label: 'Google ReCAPTCHA',
			},
			{
				href: '/cloudflare-turnstile',
				label: 'Cloudflare Turnstile',
			},
		],
	},

	// trigger field validation
	// https://codesandbox.io/p/sandbox/react-hook-form-trigger-validation-utih0?file=%2Fsrc%2Findex.js

	// Remote handleSubmit (avoid it in most siuations)
	// const submit = () => {
	// 	if (formRef.current) {
	// 		formRef.current.dispatchEvent(
	// 			new Event('submit', { cancelable: true, bubbles: true })
	// 		)
	// 	}
	// }

	// disable browser validation
	// field array, field array with dynamic fields, field array with a modal form,
	// nested field array - array in an array

	// Checkbox - atleast one checkbox must be checked

	// const moreDetail = watch("moreDetail");
	// reset on appear

	// isValidating = true (validaiton)
	// isSubmitting = true (action)
	// isProcessing = true (total)

	// ? HOW TO SPLIT FORMS AS A SINGLE STEP BUT DIFFERENT COMPONENTS WITH TYPE SAFETY.

	// https://codesandbox.io/p/sandbox/react-hook-form-nested-portal-bw8m75?file=%2Fsrc%2FApp.tsx
	// https://codesandbox.io/p/sandbox/react-hook-form-v7-customise-controller-return-value-wuhrd?file=%2Fsrc%2Findex.js%3A8%2C1

	// lazy components
	// motion animations
	// lottie animations - send button
];

export const docs = [
	{
		label: 'Getting Started',
		items: [
			{
				href: '/introduction',
				label: 'Introduction',
			},
			{
				href: '/installation',
				label: 'Installation',
			},
		],
	},
	{
		label: 'Basics',
		items: [
			{
				href: '/schema-library',
				label: 'Schema Library',
				// https://www.react-hook-form.com/faqs/#Howtoinitializeformvalues
			},
			{
				href: '/default-values',
				label: 'Default Values',
				// https://www.react-hook-form.com/faqs/#Howtoinitializeformvalues
			},
			{
				href: '/submit-resolver',
				label: 'Submit Resolver',
			},
			{
				href: '/error-handling',
				label: 'Error Handling',
				// https://www.react-hook-form.com/advanced-usage/#CustomHookwithResolver
			},
			{
				href: '/persisting-resolver',
				label: 'Persisting Resolver',
			},
			{
				href: '/react-ref-id',
				label: 'React Ref & Id',
			},
		],
	},
	{
		label: 'Integrating Components',
		items: [
			{
				href: '/controlled-components',
				label: 'Controlled Components',
				// https://www.react-hook-form.com/advanced-usage/#ControlledmixedwithUncontrolledComponents
			},
			{
				href: '/components',
				label: 'Component Library',
				// https://www.react-hook-form.com/advanced-usage/#SmartFormComponent
			},
			{
				href: '/ui-library',
				label: 'UI Library',
				// https://www.react-hook-form.com/get-started/#IntegratingwithUIlibraries
			},
		],
	},
	{
		label: 'Complex Forms',
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
				href: '/virtualized-lists',
				label: 'Virtualized Lists',
				// https://www.react-hook-form.com/advanced-usage/#Workingwithvirtualizedlists
			},
			{
				href: '/ai-button',
				label: 'AI Button',
			},
			{
				href: '/wizard',
				label: 'Wizard',
			},
			{
				href: '/funnel',
				label: 'Funnel',
			},
		],
	},
	{
		label: 'Misc.',
		items: [
			{
				href: '/testing',
				label: 'Testing',
				// https://www.react-hook-form.com/advanced-usage/#TestingForm
			},
			{
				href: '/devtools',
				label: 'DevTools',
			},
			{
				href: '/accessibility',
				label: 'Accessibility',
				// https://www.react-hook-form.com/faqs/#Howtocreateanaccessibleinputerrorandmessage
			},
			{
				href: '/i18n',
				label: 'Internationalization',
				// https://www.react-hook-form.com/faqs/#Howtointernationalizeyourform
			},
			{
				href: '/cursor-rules',
				label: 'Cursor Rules 🐤',
			},
		],
	},
];

export const api = [
	{
		label: 'API Reference',
		items: [
			{
				href: '/useForm',
				label: 'useForm',
			},
		],
	},
];

export const sections = [
	{
		icon: PiFile,
		basePath: 'docs',
		label: 'Documentation',
		items: docs,
	},
	{
		icon: PiBookOpen,
		basePath: 'api',
		label: 'API Reference',
		items: api,
	},
	{
		icon: PiCodeBlock,
		basePath: 'examples',
		label: 'Examples',
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
