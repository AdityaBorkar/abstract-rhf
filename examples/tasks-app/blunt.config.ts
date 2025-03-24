interface BluntConfig {
	ssr?: boolean; // default: false
	ppr?: boolean; // default: false
	spa?: boolean; // default: false
	pages?: {
		include?: string[];
		exclude?: string[];
	};
}

const config: BluntConfig = {
	ssr: true,
	ppr: true,
	// pages: {
	// 	include: ['**/src/pages/*.tsx'],
	// 	exclude: ['**/~*', '**/components/*'],
	// },
};

export default config;
