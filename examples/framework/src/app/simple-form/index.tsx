import { processForm } from "@/actions/processForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@/hooks/useForm";
import { simpleSchema } from "@/schemas/simple";
import { ErrorText } from "@/components/ui/form-error";

import type { z } from "zod";

export default function SimpleForm() {
	const { Form, isSubmitting, field } = useForm({
		schema: simpleSchema,
		onSubmit: processForm,
	});

	const x: z.infer<typeof field> = {
		endpoint: "hello",
	};
	console.log({ field });
	// field.

	// Fully type-safe
	// TODO: Throw errors if fieldNames are not found in the schema
	// TODO: Async validation like GSTIN search

	return (
		<div className="max-w-7xl mx-auto p-8 text-center relative z-10">
			<div className="mt-8 mx-auto w-full max-w-2xl text-left flex flex-col gap-4">
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
					<Label forName={field.hello} />
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

// TODO: How to do code splitting
// Register components for:
// forName, name
// button type="submit"
