import "./index.css";
import { useForm } from "formzen/rhf";
import { z } from "zod";

const schema = z.object({
	endpoint: z.string().url(),
	method: z.enum(["GET", "POST", "PUT", "DELETE"]),
});

export default function App() {
	const { Form, isPending } = useForm({ schema });

	return (
		<div className='relative z-10 mx-auto max-w-7xl p-8 text-center'>
			Hello World
		</div>
	);
}
