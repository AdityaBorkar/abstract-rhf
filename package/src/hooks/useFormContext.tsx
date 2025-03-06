import type { UseFormRegisterReturn } from "react-hook-form";

import { useFormContext as useReactHookFormContext } from "react-hook-form";

export function useFormContext() {
	type FormContextType = ReturnType<typeof useReactHookFormContext> & {
		getProps: (name: string) => UseFormRegisterReturn<string>;
	};

	return useReactHookFormContext() as FormContextType;
}
