import { useFormContext } from './useFormContext';

export function useFormField(name: string) {
	const { getFieldError, registerField, getFieldMetadata } = useFormContext();

	const error = getFieldError(name);
	const formProps = registerField(name);
	const { label, ...metadata } = getFieldMetadata(name);

	return { formProps, error, label, metadata };
}
