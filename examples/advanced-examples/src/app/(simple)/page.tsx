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

	return (
		<div className="min-h-screen p-8 pb-20">
			<div>
				<Heading>Barbenheimer Registration</Heading>

				<Heading>Select database for your next Pookie Project!</Heading>

				<Heading>Pookie Score Calculator</Heading>

				<Form>
					{/* <Field name="name" /> */}
					{/* <Field name="email" /> */}
				</Form>
			</div>
		</div>
	);
}

function Heading({ children }: { children: React.ReactNode }) {
	return <h1 className="text-2xl font-bold">{children}</h1>;
}

function submitResolver(data: any) {
	console.log(data);
}
