import "./index.css";
// import { useForm } from "@forms/react";
import { z } from "zod";

const schema = z.object({
	endpoint: z.string().url(),
	method: z.enum(["GET", "POST", "PUT", "DELETE"]),
});

export default function App() {
	const { Form, isPending } = useForm({ schema });

	return (
		<div className="max-w-7xl mx-auto p-8 text-center relative z-10">
			Hello World
		</div>
	);
}
