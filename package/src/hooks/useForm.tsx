// TODO: Remove the below line
import type { ZodSchema } from "zod";

import type { DefaultValues } from "react-hook-form";
import type { ZodSchemaResolver } from "../resolvers/zod";
import type { FormContextAdditionalType } from "../hooks/useFormContext";

import { useState, useTransition } from "react";
import { FormProvider, useForm as useReactHookForm } from "react-hook-form";

/**
 * @param uid - Unique identifier for the form
 * @param schema - Zod schema for form validation
 * @param debug - Whether to enable debug mode
 * @param action - Function to handle form submission
 * @param defaultValues - Default values for form fields
 */
interface useFormProps<
	Schema extends ZodSchema, // ! DEPENDENT ON ZOD
	SchemaResolver extends ZodSchemaResolver<Schema>,
	onSubmitType extends (data: SchemaResolver["data"]) => Promise<unknown>,
	SubmitResolver extends (
		response: ReturnType<onSubmitType>,
		error: unknown,
	) => Promise<void>,
> {
	submitResolver: SubmitResolver;
	schemaResolver: SchemaResolver["resolver"];
	// persistenceResolver: PersistenceResolver;
	schema: Schema;
	defaultValues?:
		| ((payload?: unknown) => Promise<Partial<SchemaResolver["data"]>>)
		| DefaultValues<Partial<SchemaResolver["data"]>>
		| undefined;
	// uid: string;
	// debug?: boolean;
	// persist?: boolean;
	// softErrors?: boolean;
	onSubmit: onSubmitType;
	// components: {
	// 	text: TextInput
	// 	...
	// },
}

interface FormProps extends React.ComponentProps<"form"> {
	children: React.ReactNode;
}

export function useForm<
	Schema extends ZodSchema, // ! DEPENDENT ON ZOD
	SchemaResolver extends ZodSchemaResolver<Schema>,
	onSubmitType extends (data: SchemaResolver["data"]) => Promise<unknown>,
	SubmitResolver extends (
		response: ReturnType<onSubmitType>,
		error: unknown,
	) => Promise<void>,
>({
	onSubmit,
	defaultValues,
	schema,
	schemaResolver,
	submitResolver,
	// persistenceResolver,
	// uid,
	// debug,
	// persist,
	// softErrors,
}: useFormProps<Schema, SchemaResolver, onSubmitType, SubmitResolver>) {
	if (!schemaResolver) throw new Error("schemaResolver is required");

	const [isPending, startTransition] = useTransition();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const formMethods = useReactHookForm({
		defaultValues,
		resolver: schemaResolver(schema),
	});

	function Form({ children, ...props }: FormProps) {
		// TODO: Persistence

		// TODO: Memoize the functions

		// ! SchemaResolver["fieldNameEnum"]
		const getFieldProperties = ((name: "valid" | "aditya") => {
			return formMethods.register(name); // !
		}) satisfies FormContextAdditionalType["getFieldProperties"];

		const getFieldError = ((name: SchemaResolver["fieldNameEnum"]) => {
			return formMethods.formState.errors[name]?.message;
		}) satisfies FormContextAdditionalType["getFieldError"];

		const getFieldMetadata = ((name: SchemaResolver["fieldNameEnum"]) => {
			return { label: "Hello" }; // !
		}) satisfies FormContextAdditionalType["getFieldMetadata"];

		const submitHandler = async (data: SchemaResolver["data"]) => {
			startTransition(async () => {
				setIsSubmitting(true);
				const response = await onSubmit(data);
				startTransition(async () => {
					await submitResolver(response as ReturnType<onSubmitType>);
				});
				startTransition(() => {
					setIsSubmitting(false);
				});
			});
		};

		return (
			<FormProvider
				{...formMethods}
				{...{
					getFieldProperties,
					getFieldError,
					getFieldMetadata,
				}}
			>
				<form onSubmit={formMethods.handleSubmit(submitHandler)} {...props}>
					{children}
				</form>
			</FormProvider>
		);
	}

	return { Form, isSubmitting, ...formMethods };
}
