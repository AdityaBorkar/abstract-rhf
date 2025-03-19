import type {
	FieldError,
	FieldErrorsImpl,
	Merge,
	UseFormRegisterReturn,
} from 'react-hook-form';

import { useFormContext as useReactHookFormContext } from 'react-hook-form';

export type FormContextAdditionalType<
	FieldName extends string,
	// ! DO TYPE-SAFETY for `FieldName`
> = {
	registerField: (name: FieldName) => UseFormRegisterReturn<FieldName>;
	getFieldMetadata: (name: FieldName) => {
		label?: string;
		[key: string]: unknown;
	}; // ! DO TYPE-SAFETY for above record.
	getFieldError: (name: FieldName) =>
		| string
		| undefined
		| FieldError
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		| Merge<FieldError, FieldErrorsImpl<any>>;
};

export function useFormContext() {
	type FormContextType = ReturnType<typeof useReactHookFormContext> &
		FormContextAdditionalType<string>; // ! DO TYPE-SAFETY

	return useReactHookFormContext() as FormContextType;
}
