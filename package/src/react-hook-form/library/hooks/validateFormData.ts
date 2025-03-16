import type { ZodSchema } from "zod";

export function validateFormData<Schema extends ZodSchema>(
	formData: FormData,
	schema: Schema,
) {
	// Convert FormData to object
	const input: Record<string, FormDataEntryValue> = {};
	for (const key of Object.keys(formData)) {
		input[key] = formData[key] as FormDataEntryValue;
	}

	// Safe Parse validate using Zod
	const { success, data, error } = schema.safeParse(input);
	if (!success) throw new Error("Invalid form data");
	return data;
}
