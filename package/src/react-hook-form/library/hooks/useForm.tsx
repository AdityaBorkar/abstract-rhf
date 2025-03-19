import type { ComponentProps } from 'react';
import type { DefaultValues } from 'react-hook-form';
import type { ZodSchema, ZodSchemaResolver } from '../../zod';
import type { FormContextAdditionalType } from '../hooks/useFormContext';

import { useState, useTransition } from 'react';
import { FormProvider, useForm as useReactHookForm } from 'react-hook-form';

import { FormzenError } from '@/utils/form/error';

type FormSchemaEnum = ZodSchema;

type Resolve_FormSchemaResolver<SchemaType extends FormSchemaEnum> =
	SchemaType extends ZodSchema ? ZodSchemaResolver<SchemaType> : never;

type FormSubmissionHandler<SchemaData> =
	| ((data: SchemaData) => Promise<unknown>)
	| ((data: FormData) => Promise<unknown>);

/**
 * TODO: Write these docs
 *
 * @param uid - Unique identifier for the form
 * @param schema - Zod schema for form validation
 * @param debug - Whether to enable debug mode
 * @param action - Function to handle form submission
 * @param defaultValues - Default values for form fields
 */
interface useFormProps<
	Schema extends FormSchemaEnum,
	SchemaResolver extends Resolve_FormSchemaResolver<Schema>,
	onSubmitType extends FormSubmissionHandler<SchemaResolver['schema']>,
	SubmitResolver extends (
		response: ReturnType<onSubmitType>,
		error: unknown,
	) => Promise<void>,
> {
	// id: string;
	schema: Schema;
	defaultValues?:
		| ((payload?: unknown) => Promise<Partial<SchemaResolver['schema']>>)
		| DefaultValues<Partial<SchemaResolver['schema']>>
		| undefined;
	onSubmit: onSubmitType;
	submitResolver: SubmitResolver;
	schemaResolver: SchemaResolver['api'];
	// persistenceResolver: PersistenceResolver;
	components: {
		text: React.ComponentType; // TODO: Add type-safety to `name`
	};
	// debug?: boolean;
	// persist?: boolean;
	// softErrors?: boolean;
	disableBrowserValidation?: boolean;
	disableProgressiveEnhancements?: boolean;
}

interface FormProps extends ComponentProps<'form'> {
	// TODO: disallow `action`, `method`, `enctype`
	children: React.ReactNode;
}

export function useForm<
	Schema extends ZodSchema,
	SchemaResolver extends Resolve_FormSchemaResolver<Schema>,
	onSubmitType extends (data: SchemaResolver['schema']) => Promise<unknown>,
	SubmitResolver extends (
		response: ReturnType<onSubmitType>,
		error: unknown,
	) => Promise<void>,
>({
	// id,
	schema,
	onSubmit,
	defaultValues,
	schemaResolver,
	submitResolver,
	// persistenceResolver,
	components,
	// debug,
	// persist,
	// softErrors,
	disableBrowserValidation = false,
	disableProgressiveEnhancements = false,
}: useFormProps<Schema, SchemaResolver, onSubmitType, SubmitResolver>) {
	if (!schemaResolver)
		throw new FormzenError('Missing required parameter: `schemaResolver`', {
			stackTrace: useForm,
			cause: { code: 'NotProvided', values: [schemaResolver] },
			docsLink: 'https://formzen.com/docs/useForm#error-schemaresolver',
		});

	const [, startTransition] = useTransition();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const formMethods = useReactHookForm({
		defaultValues,
		resolver: schemaResolver.resolver(schema),
		progressive: !disableProgressiveEnhancements,
		shouldUseNativeValidation: !disableBrowserValidation,
	});

	type FieldNameEnum = SchemaResolver['fieldName'];
	const { fieldNames, fieldMetadata } = schemaResolver.getFieldsData(schema);

	const FieldComponent = {};

	function Form({ children, ...props }: FormProps) {
		// TODO: Memoize the functions

		const registerField: FormContextAdditionalType<FieldNameEnum>['registerField'] =
			(name: FieldNameEnum) => {
				if (!name)
					// !
					throw new FormzenError(
						'Field name is not valid. Use any of the following values: ...',
						{
							stackTrace: registerField,
							cause: { code: 'NotProvided', values: [name] },
							docsLink: 'https://formzen.com/docs/useForm#error-fieldname',
						},
					);

				return formMethods.register(name);
			};

		const getFieldError: FormContextAdditionalType<FieldNameEnum>['getFieldError'] =
			(name: FieldNameEnum) => {
				if (!name)
					// !
					throw new FormzenError(
						'Field name is not valid. Use any of the following values: ...',
						{
							stackTrace: getFieldError,
							cause: { code: 'NotProvided', values: [name] },
							docsLink: 'https://formzen.com/docs/useForm#error-fieldname',
						},
					);

				return formMethods.formState.errors[name]?.message;
			};

		const getFieldMetadata: FormContextAdditionalType<FieldNameEnum>['getFieldMetadata'] =
			(name: FieldNameEnum) => {
				if (!name)
					// !
					throw new FormzenError(
						'Field name is not valid. Use any of the following values: ...',
						{
							stackTrace: getFieldMetadata,
							cause: { code: 'NotProvided', values: [name] },
							docsLink: 'https://formzen.com/docs/useForm#error-fieldname',
						},
					);
				// const metadata = fieldMetadata.get(name);
				const metadata = { label: 'wip' };
				return metadata;
			};

		const submitHandler = async (data: SchemaResolver['schema']) => {
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
					registerField,
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

	return {
		Form,
		isSubmitting,
		field: fieldNames,
		FieldComponent,
		...formMethods,
	};
}
