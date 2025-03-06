import type { z } from "zod";
import type { zodResolver } from "@hookform/resolvers/zod";

export interface ZodSchemaResolver<Schema extends z.ZodSchema> {
	data: z.infer<Schema>;
	resolver: typeof zodResolver;
	fieldNameEnum: string; // TODO: Derive from schema
}

export function schemaResolver(props: { schema: z.ZodSchema }) {
	const { schema } = props;
	return;
}
