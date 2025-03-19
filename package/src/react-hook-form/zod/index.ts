import type { ZodTypeAny, z } from 'zod';
import type {
	infer_FieldMetadataObject,
	infer_FieldNameEnum,
} from './getFieldsData';

import { zodResolver } from '@hookform/resolvers/zod';
import { getFieldsData } from './getFieldsData';

export type ZodSchema = ZodTypeAny;

export type Infer<Schema extends ZodSchema> = z.infer<Schema>;

export const schemaResolver = { resolver: zodResolver, getFieldsData };

export { validateFormData } from './validateFormData';

export interface ZodSchemaResolver<Schema extends ZodSchema> {
	api: typeof schemaResolver;
	schema: z.infer<Schema>;
	fieldName: infer_FieldNameEnum<z.infer<Schema>>;
	fieldMetadata: infer_FieldMetadataObject<z.infer<Schema>>;
}
