import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

export interface ZodSchemaResolver<Schema extends z.ZodSchema> {
	data: z.infer<Schema>;
	fieldNameEnum: string; // TODO: Derive from schema
	resolver: typeof zodResolver;
}

export const schemaResolver = zodResolver;
