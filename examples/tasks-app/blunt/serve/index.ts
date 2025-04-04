import type { ServeOptions as BunServeOptions } from 'bun';
import type { BluntGlobalConfig } from '../types';

import { color } from 'bun' with { type: 'macro' };
import { serve as BunServe } from 'bun';

import { Router } from './builder';
import { handleError } from './compiler/handleError';
import { handleFetch } from './compiler/handleFetch';
import { generateHttps } from './utils/generateHttps';
import { prepareWorkspace } from './utils/prepareWorkspace';

interface ServeProps
	extends Omit<BunServeOptions, 'fetch' | 'websocket' | 'routes' | 'error'> {
	routesDir: string;
	keyFile?: string | 'auto-generate';
	certFile?: string | 'auto-generate';
}

declare global {
	var BLUNTJS: {
		GLOBAL_CONFIG: BluntGlobalConfig;
		ENV_FILES: string[];
		router: Awaited<ReturnType<typeof Router>>;
	};
}

export async function serve({ routesDir, ...props }: ServeProps) {
	// Performance and Logging
	const SERVER_BUILD_START = performance.now();
	console.log(color('hotpink', 'ansi'));
	console.log('Blunt v1.2.3 | Bun v1.1.19');
	console.log(color('gray', 'ansi'));
	console.log('Server Starting...');

	// Prepare Workspace
	prepareWorkspace();

	// Expose Host
	const EXPOSE_HOST = false;
	if (EXPOSE_HOST) {
		//  TODO: Figure out how to expose the host
	}

	// Implement HTTPS
	if (props.keyFile === 'auto-generate' && props.certFile === 'auto-generate') {
		const { keyFile, certFile } = await generateHttps();
		props.keyFile = keyFile;
		props.certFile = certFile;
	}

	// *** HMR START ***

	// Build Config, Router and Server
	const GLOBAL_CONFIG = (await import('#/blunt.config')).default;
	const ENV_FILES = ['.env', '.env.prod'];
	const router = await Router({ dir: routesDir });
	globalThis.BLUNTJS = { GLOBAL_CONFIG, ENV_FILES, router };
	const server = BunServe({
		...props,
		fetch: handleFetch,
		error: handleError,
		// TODO: Implement Websockets
	});

	// Mandatory File Checks
	// const RootLayout = router.files.match('layout.tsx');
	// if (!RootLayout) {
	// 	console.log(
	// 		color('red', 'ansi'),
	// 		'❌ RootLayout is not present in the pages directory',
	// 	);
	// }
	// const NotFound = router.files.match('not-found.tsx');
	// if (!NotFound) {
	// 	console.log(
	// 		color('red', 'ansi'),
	// 		'❌ NotFound is not present in the pages directory',
	// 	);
	// }

	// *** HMR END ***

	// Performance and Logging
	const SERVER_BUILD_END = performance.now();
	const SERVER_BUILD_TIME = (SERVER_BUILD_END - SERVER_BUILD_START).toFixed(2);
	console.log(`Server Started in ${SERVER_BUILD_TIME}ms`);
	console.log('Local Network  : ', server.url.href);
	console.log(
		'Public Network : ',
		EXPOSE_HOST ? server.url.href : 'use --host to expose',
	);
	console.log('Environments   : ', ENV_FILES.join(', '));

	console.log(color('white', 'ansi'));
	return server;
}

// TODO: HMR Support
// Store routes in HMR data to persist between updates
// const HMR_STATE = import.meta.hot?.data.HMR_STATE ?? {
// 	routesDir: '',
// 	router: null,
// 	server: null,
// };

// Store state for HMR
// import.meta.hot.data.HMR_STATE = { routesDir, router, server };

// Total refresh on change of `blunt.config.ts`, `.env`

// await server.stop();
// await server.reload({ options })
