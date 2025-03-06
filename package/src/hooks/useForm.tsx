// TODO: Remove the below line
import type { ZodSchema } from "zod";

import type { DefaultValues } from "react-hook-form";
import type { ZodSchemaResolver } from "../resolvers/zod";

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
	schemaResolver: SchemaResolver["resolver"];
	submitResolver: SubmitResolver;
	// persistenceResolver: PersistenceResolver;
	uid: string;
	schema: Schema;
	defaultValues:
		| ((payload?: unknown) => Promise<Partial<SchemaResolver["data"]>>)
		| DefaultValues<Partial<SchemaResolver["data"]>>
		| undefined;
	debug?: boolean;
	persist?: boolean;
	softErrors?: boolean;
	onSubmit: onSubmitType;
}

export function useForm<
	Schema extends ZodSchema, // ! DEPENDENT ON ZOD
	SchemaResolver extends ZodSchemaResolver<Schema>,
	onSubmitType extends (data: SchemaResolver["data"]) => Promise<unknown>,
	SubmitResolver extends (response: ReturnType<onSubmitType>) => Promise<void>,
>({
	onSubmit,
	defaultValues,
	schema,
	schemaResolver,
	submitResolver,
	// persistenceResolver,
	uid,
	debug,
	persist,
	softErrors,
}: useFormProps<Schema, SchemaResolver, onSubmitType, SubmitResolver>) {
	const [isPending, startTransition] = useTransition();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const formMethods = useReactHookForm({
		defaultValues,
		resolver: schemaResolver(schema),
	});

	function Form({ children }: { children: React.ReactNode }) {
		// TODO: Persistence

		async function getFieldProperties(name: SchemaResolver["fieldNameEnum"]) {
			return formMethods.register(name);
		}

		async function submitHandler(data: SchemaResolver["data"]) {
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
		}

		return (
			// @ts-expect-error `getFieldProperties` is not typed
			<FormProvider {...formMethods} getFieldProperties={getFieldProperties}>
				<form onSubmit={formMethods.handleSubmit(submitHandler)}>
					{children}
				</form>
			</FormProvider>
		);
	}

	return { Form, isSubmitting };
}
