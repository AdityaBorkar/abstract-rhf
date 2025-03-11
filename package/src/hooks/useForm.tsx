// TODO: Remove the below line
import type { z, ZodTypeAny } from "zod";

import type { ComponentProps } from "react";
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
	Schema extends ZodTypeAny, // ! DEPENDENT ON ZOD
	SchemaResolver extends ZodSchemaResolver<Schema>,
	onSubmitType extends (data: SchemaResolver["data"]) => Promise<unknown>,
	SubmitResolver extends (
		response: ReturnType<onSubmitType>,
		error: unknown,
	) => Promise<void>,
> {
	submitResolver: SubmitResolver;
	schemaResolver: SchemaResolver["functions"];
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

interface FormProps extends ComponentProps<"form"> {
	children: React.ReactNode;
}

export function useForm<
	Schema extends ZodTypeAny,
	SchemaResolver extends ZodSchemaResolver<Schema>,
	onSubmitType extends (data: SchemaResolver["data"]) => Promise<unknown>,
	SubmitResolver extends (
		response: ReturnType<onSubmitType>,
		error: unknown,
	) => Promise<void>,
>({
	schema,
	// onSubmit,
	defaultValues,
	schemaResolver,
	submitResolver,
	// persistenceResolver,
	// uid,
	// debug,
	// persist,
	// softErrors,
}: {
	schema: Schema;
	onSubmit: onSubmitType;
	submitResolver: SubmitResolver;
	// persistenceResolver: PersistenceResolver;
	schemaResolver: SchemaResolver["functions"];
	defaultValues?:
		| ((payload?: unknown) => Promise<Partial<SchemaResolver["data"]>>)
		| DefaultValues<Partial<SchemaResolver["data"]>>
		| undefined;
	uid: string;
	debug?: boolean;
	persist?: boolean;
	softErrors?: boolean;
	progressiveEnhancements?: boolean;
	// components: {
	// 	text: TextInput
	// 	...
	// },
}) {
	if (!schemaResolver) throw new Error("schemaResolver is required");

	const [isPending, startTransition] = useTransition();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const formMethods = useReactHookForm({
		defaultValues,
		resolver: schemaResolver.resolver(schema),
	});

	function Form({ children, ...props }: FormProps) {
		// TODO: Persistence

		// TODO: Memoize the functions

		const getFieldProperties = ((name: SchemaResolver["fieldNameEnum"]) => {
			if (!name) throw new Error("Field name is required");
			return formMethods.register(name); // !
		}) satisfies FormContextAdditionalType<
			SchemaResolver["fieldNameEnum"]
		>["getFieldProperties"];

		const getFieldError = ((name: SchemaResolver["fieldNameEnum"]) => {
			if (!name) throw new Error("Field name is required");
			return formMethods.formState.errors[name]?.message;
		}) satisfies FormContextAdditionalType<
			SchemaResolver["fieldNameEnum"]
		>["getFieldError"];

		const getFieldMetadata = ((name: SchemaResolver["fieldNameEnum"]) => {
			if (!name) throw new Error("Field name is required");
			const label = schema.shape[name].description;
			return { label };
		}) satisfies FormContextAdditionalType<
			SchemaResolver["fieldNameEnum"]
		>["getFieldMetadata"];

		const submitHandler = async (data: SchemaResolver["data"]) => {
			startTransition(async () => {
				setIsSubmitting(true);

				let response = undefined;
				let error = undefined;
				let success = false;
				try {
					response = await onSubmit(data);
					success = true;
				} catch (err) {
					error = err;
					success = false;
				}

				startTransition(async () => {
					await submitResolver(response as ReturnType<onSubmitType>, error);
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

	const field = schemaResolver.getFieldNameEnum(schema);

	const FieldComponent = {};

	return { Form, isSubmitting, field, FieldComponent, ...formMethods };
}
