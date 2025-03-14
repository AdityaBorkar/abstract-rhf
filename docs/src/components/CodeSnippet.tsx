export default function CodeSnippet({
	name,
	children,
}: { name: string; children: React.ReactNode }) {
	return (
		<div className="rounded-md bg-gray-100 p-4">
			<div className="text-sm font-medium  text-gray-700">{name}</div>
			<div className="mt-2 text-sm text-gray-500">{children}</div>
		</div>
	);
}

// TODO: ADD COPY BUTTON AND SYNTAX HIGHLIGHTING, WITH FILENAME AS HEADER.
