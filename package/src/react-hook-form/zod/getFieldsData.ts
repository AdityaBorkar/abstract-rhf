import type { FieldMetadata } from '@/utils/schema/type';
import type { NestedRecord } from '@/utils/type-utils';
import type { Infer, ZodSchema } from './index';

import { ZodObject } from 'zod';

import { FormzenSchemaError } from '@/utils/form/error';

type infer_FieldNameObject<Schema extends ZodSchema['_output']> = {
	[K in keyof Schema]: [K] extends object
		? infer_FieldNameEnum<Schema[K]>
		: string;
};

export type infer_FieldNameEnum<
	T,
	Prefix extends string = '',
> = T extends object
	? {
			[K in keyof T]: K extends string
				? T[K] extends object
					? infer_FieldNameEnum<
							T[K],
							`${Prefix}${Prefix extends '' ? '' : '.'}${K}`
						>
					: `${Prefix}${Prefix extends '' ? '' : '.'}${K}`
				: never;
		}[keyof T]
	: never;

export type infer_FieldMetadataObject<Schema extends ZodSchema['_output']> =
	never;

export function getFieldsData<Schema extends ZodSchema>(schema: Schema) {
	if (!(schema instanceof ZodObject))
		throw new FormzenSchemaError('Schema must be a ZodObject', {
			stackTrace: getFieldsData,
			cause: { code: 'NotZodObject', values: [schema] },
			docsLink: 'https://formzen.com/docs/useForm#error-schemaresolver',
		});

	return getFieldData(schema) as {
		fieldNames: infer_FieldNameObject<Infer<Schema>>;
		fieldMetadata: infer_FieldMetadataObject<Infer<Schema>>;
	};
}

function getFieldData<Schema extends ZodSchema>(
	schema: Schema,
	prefix?: string,
) {
	const fieldNames: NestedRecord<string> = {};
	const fieldMetadata: NestedRecord<FieldMetadata> = {};

	// @ts-expect-error "shape" is not typed in zod
	for (const [key, fieldData] of Object.entries(schema.shape)) {
		const fieldName = prefix ? `${prefix}.${key}` : key;
		if (fieldData instanceof ZodObject) {
			const f = getFieldData(fieldData, fieldName);
			fieldNames[key] = f.fieldNames;
			fieldMetadata[key] = f.fieldMetadata;
		} else {
			fieldNames[key] = fieldName;
			fieldMetadata[key] = parseFieldData(fieldData);
		}
	}

	return { fieldNames, fieldMetadata };
}

function parseFieldData(fieldData: unknown) {
	// TODO: WIP
	return { type: 'text' } as const;
}
