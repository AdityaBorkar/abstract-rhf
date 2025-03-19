export class FormzenError extends Error {
	constructor(
		message: string,
		context?: {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			stackTrace: any;
			docsLink: string;
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			cause: { code: string; values: any[] };
		},
	) {
		const { stackTrace, docsLink } = context || {};
		const details = [
			message,
			'. ',
			`Read more at: ${docsLink || 'https://formzen.com/docs'}`,
		].join('\n');

		super(details);
		this.name = 'FormzenError';
		Error.captureStackTrace(this, stackTrace);
	}
}

// TypeError
// ReferenceError

export class FormzenSchemaError extends TypeError {
	constructor(
		message: string,
		context?: {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			stackTrace: any;
			docsLink: string;
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			cause: { code: string; values: any[] };
		},
	) {
		const { stackTrace, docsLink } = context || {};
		const details = [
			message,
			'. ',
			`Read more at: ${docsLink || 'https://formzen.com/docs'}`,
		].join('\n');

		super(details);
		this.name = 'FormzenSchemaError';
		Error.captureStackTrace(this, stackTrace);
	}
}
