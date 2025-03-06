import { toast } from "sonner";
import {
	useForm as _useForm,
	useFormGroup as _useFormGroup,
} from "abstract-rhf";
import { schemaResolver } from "abstract-rhf/resolvers/zod";
import { persistenceResolver } from "abstract-rhf/resolvers/local-storage";

// import { schemaResolver } from "forms/resolvers/standard-schema";
// import { persistenceResolver } from "forms/resolvers/jotai";

export function useForm(props: Parameters<typeof _useForm>[0]) {
	return _useForm({
		...props,
		// schemaResolver,
		submitResolver,
		// persistenceResolver,
		// components: {
		// 	text: TextInput
		// 	...
		// },
	});
}

// export function useFormGroups(props: Parameters<typeof _useFormGroup>[0]) {
// 	return _useFormGroup({
// 		schemaResolver,
// 		submitResolver,
// 		persistenceResolver,
// 		// components: {
// 		// 	text: TextInput
// 		// 	...
// 		// },
// 		...props,
// 	});
// }

async function submitResolver(response: Promise<unknown>, error: unknown) {
	if (error) throw error;

	console.log({ response });
	const result = await response.data;
	if (result.status === "success") toast.success(result.toast);
	else toast.error(result.toast);

	return;
}

// TODO - Make a custom persistenceResolver() that uses jotai and react-hook-form
// TODO: Async validation like GSTIN search
