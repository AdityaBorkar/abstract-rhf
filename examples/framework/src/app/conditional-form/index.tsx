import { APITester } from "./APITester";
import { processForm } from "@/actions/processForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/useForm";
import { useRef, type FormEvent } from "react";
import { z } from "zod";
import logo from "@/assets/logo.svg";
import reactLogo from "@/assets/react.svg";

const schema = z.object({
	endpoint: z.string().url(),
	method: z.enum(["GET", "POST", "PUT", "DELETE"]),
});

export default function SimpleForm() {
	const { Form, isSubmitting } = useForm({ schema, onSubmit: processForm });

	// Fully type-safe
	// TODO: Throw errors if fieldNames are not found in the schema
	// TODO: Async validation like GSTIN search

	const responseInputRef = useRef<HTMLTextAreaElement>(null);

	const testEndpoint = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const form = e.currentTarget;
			const formData = new FormData(form);
			const endpoint = formData.get("endpoint") as string;
			const url = new URL(endpoint, location.href);
			const method = formData.get("method") as string;
			const res = await fetch(url, { method });

			const data = await res.json();
			responseInputRef.current!.value = JSON.stringify(data, null, 2);
		} catch (error) {
			responseInputRef.current!.value = String(error);
		}
	};

	return (
		<div className="max-w-7xl mx-auto p-8 text-center relative z-10">
			<div className="mt-8 mx-auto w-full max-w-2xl text-left flex flex-col gap-4">
				<Form className="">
					<select
						name="method"
						className="bg-[#fbf0df] text-[#1a1a1a] py-1.5 px-3 rounded-lg font-bold text-sm min-w-[0px] appearance-none cursor-pointer hover:bg-[#f3d5a3] transition-colors duration-100"
					>
						<option value="GET" className="py-1">
							GET
						</option>
						<option value="PUT" className="py-1">
							PUT
						</option>
					</select>
					<Input
						name="endpoint"
						defaultValue="/api/hello"
						placeholder="/api/hello"
					/>
					<Button type="submit">Send</Button>
				</Form>
			</div>
		</div>
	);
}
