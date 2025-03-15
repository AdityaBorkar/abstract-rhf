import { toast } from "sonner";
import { useForm as _useForm, useFormGroup as _useFormGroup } from "formzen";
import { schemaResolver } from "formzen/resolvers/zod";

// import { schemaResolver } from "forms/resolvers/standard-schema";
// import { persistenceResolver } from "formzen/resolvers/local-storage";

export function useForm(props: {
	schema: Parameters<typeof _useForm>[0]["schema"];
	onSubmit: Parameters<typeof _useForm>[0]["onSubmit"];
	defaultValues?: Parameters<typeof _useForm>[0]["defaultValues"];
}) {
	// TODO: Use integrated example for verySimple form case.
	// TODO: Use this example for `components` case only.
	return _useForm({
		...props,
		schemaResolver,
		submitResolver,
	});
}

// export function useFormGroups(props: Parameters<typeof _useFormGroup>[0]) {
// 	return _useFormGroup({
// 		...props,
// 		schemaResolver,
// 		submitResolver,
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

// TODO - Make a custom persistenceResolver() that uses jotai and react-hook-form integration
