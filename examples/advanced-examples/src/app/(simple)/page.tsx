"use client";

import { useForm } from "formzen/rhf";
import { schemaResolver } from "formzen/rhf/zod";
import { z } from "zod";

const schema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	meals: z.object({
		breakfast: z.string().min(1),
		lunch: z.string().min(1),
		dinner: z.string().min(1),
	}),
	lunch: z.object({
		database: z.string().min(1),
		version: z.string().min(1),
	}),
});

// We have omitted certain API options and renamed them to make it more intuitive. We are opinionated and believe that the best API is the one that is most intuitive and easiest to use.

export default function Home() {
	const { Form, Field } = useForm({
		schema,
		// onSubmit: action,
		schemaResolver,
		submitResolver,
		// validate: "onBlur" | "onChange"
		// validate: {
		// 	beforeSubmit: "onBlur",
		// 	afterSubmit: "onBlur",
		// },
		// debounce
		// values -> Reactive
		// context -> Validation Library
		// mode: "onBlur" // "onChange"
		// shouldUnregister defaults to `true`
		// shouldUseNativeValidation defaults to `true`
	});

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

	// next-safe-action
	// trpc
	// rest endpoint

	// lazy components

	// Atomic Examples
	// Real-World Examples
	// Form Components

	return (
		<div className="min-h-screen p-8 pb-20">
			<div>
				<Heading>Simple Example</Heading>

				<Heading>Signup Form</Heading>
				<Form>
					{/* <Field name="name" /> */}
					{/* <Field name="email" /> */}
					{/* select input */}
					{/* radio input */}
					{/* checkbox - tnc */}
					{/* username availability check */}
					{/*  Confirm Password - Passwords must match */}
					{/* reset forms */}
				</Form>

				<Heading>Feedback Form</Heading>
				{/* rating stars */}
				{/* textarea input */}

				<Heading>Persisting Forms</Heading>
				{/* Storing in LocalStorage / State */}

				<Heading>Send Email Form</Heading>
				{/* smart email input - like to: emails in gmail */}

				<Heading>Form Drafts</Heading>
				{/* Form Drafts */}

				<Heading>Multi Step Forms</Heading>
				{/* Multi Step Forms */}
				{/* Multi Step Forms with SET VALUES / PREFILL VALUES */}

				<Heading>Invoicing Form</Heading>
				{/* watch based fields - totaling of items */}
				{/* conditional fields - like hsc/ssc */}

				<Heading>Update Forms</Heading>
				{/* Submit only dirty fields (this can be used to submit changes only) */}

				<Heading>Delete Forms</Heading>
				{/* Delete */}

				<Heading>Form Context</Heading>
				{/* Accessing form context */}

				<Heading>Usage with React Hooks</Heading>
				{/* usage with useActionState */}
			</div>
		</div>
	);
}

function Heading({ children }: { children: React.ReactNode }) {
	return <h1 className='font-bold text-2xl'>{children}</h1>;
}

function submitResolver(data: any) {
	console.log(data);
}
