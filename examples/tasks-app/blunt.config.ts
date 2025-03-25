// import type { BluntGlobalConfig } from './blunt/types';

// const config: BluntGlobalConfig = {
// 	ssr: true,
// 	streaming: true,
// 	timeout: 60,
// 	// pages: {
// 	// 	include: ['**/src/pages/*.tsx'],
// 	// 	exclude: ['**/~*', '**/components/*'],
// 	// },
// };

// export default config;

export default {
	ssr: true,
	streaming: true,
	timeout: 60,
	ppr: false,

	pages: {
		include: ['**/src/pages/*.tsx'],
		exclude: ['**/~*', '**/components/*'],
	},
	botDetection: true,
} as const;
