'use server';

import { validateFormData } from 'formzen/rhf/zod';
import { schema } from './schema';

export async function $signup(formData: FormData) {
	// const [data, errors] = await schema.validateFormData(formData);
	// OR:
	const { data, error } = await validateFormData(formData, schema);
	// if (error) throw error;

	console.log({ data, formData });

	const username = data.username;
	return Response.redirect(`/${username}/games`, 301);
}
