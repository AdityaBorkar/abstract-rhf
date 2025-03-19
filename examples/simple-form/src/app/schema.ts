import { z } from 'zod';

export const schema = z.object({
	// https://www.npmjs.com/package/zod-metadata
	name: z.string().min(1).describe('Name'), // .meta({ }),
	// ---
	// TODO: onServerValidate() + onClientValidate()
	username: z.string().min(1).describe('Username'),
	// ---
	email: z.string().email().describe('Email'),
	meals: z.object({
		breakfast: z.string().min(1),
		lunch: z.string().min(1),
		dinner: z.string().min(1),
	}),
	lunch: z.object({
		database: z.string().min(1),
		version: z.string().min(1),
	}),
	// transform values on submit
});

// TODO: Error Formatter
