import type * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";
import { useFormContext } from "formzen"; // DIFF

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
				'flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
				className,
			)}
			{...props}
		/>
	);
}

export { Label };
