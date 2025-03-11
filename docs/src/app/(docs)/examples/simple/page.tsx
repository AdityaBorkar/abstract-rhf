import { readFileSync } from "node:fs";
import { join } from "node:path";
import Form from "./form";

const BASE_PATH = join(process.cwd(), "src/app/(docs)/examples");

export default async function SimpleForm() {
	const code = readFileSync(join(BASE_PATH, "simple/form.tsx"), "utf-8");

	return (
		<div className="grid grid-cols-2 gap-4">
			<div>
				<Form />
			</div>
			<div>{code}</div>
		</div>
	);
}
