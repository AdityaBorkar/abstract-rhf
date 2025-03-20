import './index.css';

import { useForm } from 'formzen/rhf';
import { schemaResolver } from 'formzen/rhf/zod';
import { Toaster, toast } from 'sonner';

import { NumberInputField } from '@/components/ui/Input';
import { $signup } from './action';
import { schema } from './schema';

export default function App() {
	const { Form, isSubmitting, field } = useForm({
		schema,
		onSubmit: $signup,
		schemaResolver,
		submitResolver,
	});

	return (
		<div className="relative z-10 mx-auto max-w-7xl p-8 text-center">
			<Form>
				<NumberInputField name={field.name} />
				<NumberInputField name={field.email} />
				{/* <TextInputField name={field.meals.breakfast} /> */}

				<button type="submit" disabled={isSubmitting}>
					Submit
				</button>
			</Form>
			<Toaster />
		</div>
	);
}

async function submitResolver(
	response: Promise<ActionResponse>,
	error: unknown,
) {
	const data = await response;
	if (data.success === true) toast.success('Form submitted successfully');
	else toast.error('Form submission failed');
}

type ActionResponse = {
	success: boolean;
};
