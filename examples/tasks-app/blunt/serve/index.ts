import type { ServeOptions as BunServeOptions } from 'bun';
import { serve as BunServe, file } from 'bun';
import { Router } from './builder';
import IndexHtml from './builder/index.html';
import { generateFiles } from './https/generateFiles';

interface ServeProps
	extends Omit<BunServeOptions, 'fetch' | 'websocket' | 'routes' | 'error'> {
	routesDir: string;
	keyFile?: string | 'auto-generate';
	certFile?: string | 'auto-generate';
}

export async function serve({ routesDir, ...props }: ServeProps) {
	// Store routes in HMR data to persist between updates
	const HMR_STATE = import.meta.hot?.data.HMR_STATE ?? {
		routesDir: '',
		router: null,
		server: null,
	};

	if (props.keyFile === 'auto-generate' && props.certFile === 'auto-generate') {
		const { keyFile, certFile } = await generateFiles();
		props.keyFile = keyFile;
		props.certFile = certFile;
	}

	const router = await Router({ dir: routesDir });
	// layout.tsx, not-found.tsx, page.ts ARE MANDATORY
	// not-found.ts is present in a path that does not contain a page. Hence, the route is never reachable.

	const server = BunServe({
		...props,
		async fetch(req) {
			const url = new URL(req.url);
			const path = url.pathname;

			const files = router.match(path);
			if (!files) return new Response('Not Found', { status: 404 });

			const layouts = files.filter((file) => file.type === 'layout');
			const page = files.filter((file) => file.type === 'page')[0];
			console.log({ layouts, page });
			// First: layouts then pages.

			// TODO: Execute files sequentially and share outputs. AstroJS + NextJS
			return new Response(file(IndexHtml));
		},
		async error(error) {
			console.error('Server error:', error);
			return new Response(`Internal Server Error: ${error.message}`, {
				status: 500,
				headers: { 'Content-Type': 'text/plain' },
			});
		},
	});

	// Store state for HMR
	import.meta.hot.data.HMR_STATE = { routesDir, router, server };

	return server;
}
