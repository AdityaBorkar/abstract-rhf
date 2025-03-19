import { useFormContext, useFormField } from 'formzen/rhf';

export function TextInputField({ name }: { name: string }) {
	const {
		getFieldError,
		registerField: getFieldProperties,
		getFieldMetadata,
	} = useFormContext();
	const formProps = getFieldProperties(name);
	const { label } = getFieldMetadata(name);
	const error = getFieldError(name);

	return (
		<div>
			<label htmlFor={name}>{label || ''}</label>
			<input type="text" id={name} {...formProps} />
		</div>
	);
}

export function NumberInputField({ name }: { name: string }) {
	const { formProps, error, label, metadata } = useFormField(name);

	return (
		<div className="mt-4 border">
			<label htmlFor={name}>{label || ''}</label>
			<input id={name} className="block bg-gray-800" {...formProps} />
		</div>
	);
}
