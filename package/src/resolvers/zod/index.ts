import type { z, ZodTypeAny } from "zod";

import { ZodObject } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export interface ZodSchemaResolver<Schema extends z.ZodSchema> {
	data: z.infer<Schema>;
	fieldNameEnum: string; // TODO: Derive from schema
	functions: {
		resolver: typeof schemaResolver.resolver;
		getFieldNameEnum: typeof schemaResolver.getFieldNameEnum;
	};
}

export const schemaResolver = {
	resolver: zodResolver,
	getFieldNameEnum<Schema extends ZodTypeAny>(schema: Schema) {
		if (schema instanceof ZodObject) {
			const fieldNames = extractFieldNames(schema);
			return fieldNames as unknown as z.infer<Schema>;
		}
		throw new Error("Schema must be a ZodObject");
	},
};

// interface FieldDef {
// 	name: string | number | FieldDef[] | Record<string, FieldDef>;
// }

// type FieldDefs = Record<string, FieldDef>;

// type FieldName = string | Record<string, FieldName>;

// function getObjectDefinition(schema: z.ZodSchema) {
// 	// TODO: Extract Field Names and Properties
// 	// TODO: Typescript
// 	const shape: FieldDefs = {};
// 	const fieldNames: Record<string, FieldName> = {};
// 	for (const [key, value] of Object.entries(schema.shape)) {
// 		if (value instanceof ZodObject) {
// 			const obj = getObjectDefinition(value);
// 			shape[key] = obj.shape;
// 			fieldNames[key] = obj.fieldNames;
// 		}
// 		// If an array?
// 		else {
// 			shape[key] = key;
// 			fieldNames[key] = key;
// 		}
// 	}
// 	return { shape, fieldNames };
// }

// New function to properly extract field names
function extractFieldNames<Schema extends ZodTypeAny>(schema: Schema): any {
	const result: Record<string, any> = {};

	for (const [key, value] of Object.entries(schema.shape)) {
		if (value instanceof ZodObject) {
			result[key] = extractFieldNames(value);
		} else {
			result[key] = key;
		}
	}

	return result;
}
