import { useFormContext } from "formzen";

export function ErrorText({ forName }: { forName: string }) {
	const { getFieldError } = useFormContext();
	const error = getFieldError(forName)?.toString();
	return <div className="text-red-500 text-sm font-medium">{error}</div>;
}
