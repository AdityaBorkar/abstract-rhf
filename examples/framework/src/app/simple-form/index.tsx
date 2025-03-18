import { processForm } from "@/actions/processForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { simpleSchema } from "@/schemas/simple";
import { ErrorText } from "@/components/ui/form-error";

// import { useForm } from "@/hooks/useForm";
import { useForm } from "formzen";
import { schemaResolver } from "formzen/resolvers/zod";

import { z } from "zod";

export default function SimpleForm() {
	// const { Form, isSubmitting, field } = useForm({
	// 	schema: simpleSchema,
	// 	onSubmit: processForm,
	// });
	const { Form, isSubmitting, field } = useForm({
		schema: simpleSchema,
		onSubmit: processForm,
		schemaResolver,
		submitResolver,
	});

	// Fully type-safe
	// TODO: Throw errors if fieldNames are not found in the schema
	// TODO: Async validation like GSTIN search

	return (
		<div className='relative z-10 mx-auto max-w-7xl p-8 text-center'>
			<div className='mx-auto mt-8 flex w-full max-w-2xl flex-col gap-4 text-left'>
				<Form className="">
					{/* <Field name="endpoint" component={<Input />} /> */}
					{/* <Field component="input" name="endpoint" {...params} /> */}
					{/* <select
						name="method"
						className="bg-[#fbf0df] text-[#1a1a1a] py-1.5 px-3 rounded-lg font-bold text-sm min-w-[0px] appearance-none cursor-pointer hover:bg-[#f3d5a3] transition-colors duration-100"
					>
						<option value="GET" className="py-1">
							GET
						</option>
						<option value="PUT" className="py-1">
							PUT
						</option>
					</select> */}
					<Label forName={field.endpoint} />
					<Input name="endpoint" placeholder="/api/hello" />
					<ErrorText forName="endpoint" />

					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Sending..." : "Send"}
					</Button>
				</Form>
			</div>
		</div>
	);
}

async function submitResolver(response: Promise<unknown>, error: unknown) {
	if (error) throw error;

	console.log({ response });
	const result = await response.data;
	if (result.status === "success") toast.success(result.toast);
	else toast.error(result.toast);

	return;
}

// TODO: How to do code splitting
// Register components for:
// forName, name
// button type="submit"
