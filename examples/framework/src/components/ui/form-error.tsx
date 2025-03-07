import { useFormContext } from "abstract-rhf";

export function ErrorText({ forName }: { forName: string }) {
	const { getFieldError } = useFormContext();
	const error = getFieldError(forName)?.toString();
	return <p className="text-red-500">{error}</p>;
}
