import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";
import { useFormContext } from "abstract-rhf"; // DIFF

function Label(
	{
		className,
		forName,
		...props
	}: React.ComponentProps<typeof LabelPrimitive.Root> & { forName?: string }, // DIFF
) {
	const { getFieldMetadata } = useFormContext(); // DIFF
	if (forName) {
		// DIFF
		const { label } = getFieldMetadata(forName); // DIFF
		props.children = label; // DIFF
	} // DIFF
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={cn(
				"flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

export { Label };
