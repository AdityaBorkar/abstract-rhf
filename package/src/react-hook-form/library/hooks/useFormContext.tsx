import type {
	FieldError,
	FieldErrorsImpl,
	Merge,
	UseFormRegisterReturn,
} from "react-hook-form";

import { useFormContext as useReactHookFormContext } from "react-hook-form";

export type FormContextAdditionalType<FieldName extends string> = {
	getFieldProperties: (name: FieldName) => UseFormRegisterReturn<FieldName>;
	getFieldMetadata: (name: FieldName) => unknown; // ! DO TYPE-SAFETY
	getFieldError: (
		name: FieldName,
	) =>
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined;
};

export function useFormContext() {
	type FormContextType = ReturnType<typeof useReactHookFormContext> &
		FormContextAdditionalType<string>; // ! DO TYPE-SAFETY

	return useReactHookFormContext() as FormContextType;
}
