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
	// DIFF START
	const { getFieldMetadata } = useFormContext();
	if (forName) {
		const { label } = getFieldMetadata(forName);
		props.children = label;
	}
	// DIFF END
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
