import { useForm } from "abstract-rhf";
import { schemaResolver } from "abstract-rhf/resolvers/zod";
import { toast } from "sonner";

import { processForm } from "@/actions/processForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { simpleSchema } from "@/schemas/simple";
import { ErrorText } from "@/components/ui/form-error";

// const components = {
// 	"text-input": Input,
// 	"number-input": Input,
// 	// "select-input": { wrapper: Select, option: Option },
// };

export default function SimpleForm() {
	const { Form, isSubmitting, field, FieldComponent } = useForm({
		schema: simpleSchema,
		onSubmit: processForm,
		schemaResolver,
		submitResolver,
		// components,
	});

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

					<div className="my-2 flex flex-row justify-between">
						<Label forName={field.endpoint} />
						<ErrorText forName="endpoint" />
					</div>
					<Input name="endpoint" placeholder="/api/hello" />

					<Button type="submit" disabled={isSubmitting}>
						{/* {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} */}
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
