import type { ZodSchema } from "zod";

export function validateFormData<Schema extends ZodSchema>(
	formData: FormData,
	schema: Schema,
) {
	const input = Object.fromEntries(formData.entries());
	const { data, error } = schema.safeParse(input);

	// if (error) throw new Error("Invalid form data");
	return data;
}
