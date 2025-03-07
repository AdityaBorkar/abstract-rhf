import type {
	FieldError,
	FieldErrorsImpl,
	Merge,
	UseFormRegisterReturn,
} from "react-hook-form";

import { useFormContext as useReactHookFormContext } from "react-hook-form";

export type FormContextAdditionalType = {
	getFieldProperties: (
		name: "aditya" | "valid", // !EDIT
	) => UseFormRegisterReturn<string>;
	getFieldMetadata: (name: string) => unknown; // ! DO TYPE-SAFETY
	getFieldError: (
		name: string,
	) =>
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined;
};

export function useFormContext() {
	type FormContextType = ReturnType<typeof useReactHookFormContext> &
		FormContextAdditionalType;

	return useReactHookFormContext() as FormContextType;
}
