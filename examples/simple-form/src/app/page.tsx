import './index.css';

import { useForm } from 'formzen/rhf';
import { schemaResolver } from 'formzen/rhf/zod';
import { Toaster, toast } from 'sonner';

import { TextInputField } from '@/components/ui/Input';
import { $signup } from './action';
import { schema } from './schema';

export default function App() {
	const { Form, isSubmitting, field } = useForm({
		schema,
		onSubmit: $signup,
		schemaResolver,
		submitResolver,
	});

	// Example - for Create Data
	// Example - for Read Data - async / local
	// Example - for Update / Delete Data

	// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel
	// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
	// https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/Turning_off_form_autocompletion#managing_autofill_for_login_fields

	return (
		<div className="relative z-10 mx-auto max-w-7xl p-8 text-center">
			<Form
				method="get / post / dialog"
				action="url / react server action"
				onSubmit={() => {}}
				autoComplete="off"
				// What if onSubmit and action are both provided?
			>
				<TextInputField name={field.name} />
				<TextInputField name={field.email} />
				{/* <TextInputField name={field.meals.breakfast} /> */}

				<div className="flex flex-row gap-4">
					<button
						type="submit"
						formAction="delete endpoint"
						formNoValidate={true}
						disabled={isSubmitting}
					>
						Delete Data
					</button>
					<button type="submit" disabled={isSubmitting}>
						Update Data
					</button>
				</div>
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
