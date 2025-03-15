"use server";

import { validateFormData } from "formzen";
import { simpleSchema } from "@/schemas/simple";

export async function processForm(formData: FormData) {
	console.log({ formData });
	const data = validateFormData(formData, simpleSchema);
	// const endpoint = formData.get("endpoint") as string;
	// const method = formData.get("method") as string;
}
