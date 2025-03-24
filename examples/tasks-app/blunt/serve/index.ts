import { color } from 'bun' with { type: 'macro' };

import type { ServeOptions as BunServeOptions } from 'bun';

import { serve as BunServe, file } from 'bun';
import { renderToReadableStream, renderToString } from 'react-dom/server';

import { Router } from './builder';
import { jsx } from './builder/jsx';
import IndexHtml from './constants/index.html';
import { generateFiles } from './https/generateFiles';

interface ServeProps
	extends Omit<BunServeOptions, 'fetch' | 'websocket' | 'routes' | 'error'> {
	routesDir: string;
	keyFile?: string | 'auto-generate';
	certFile?: string | 'auto-generate';
}

export async function serve({ routesDir, ...props }: ServeProps) {
	if (props.keyFile === 'auto-generate' && props.certFile === 'auto-generate') {
		const { keyFile, certFile } = await generateFiles();
		props.keyFile = keyFile;
		props.certFile = certFile;
	}

	const router = await Router({ dir: routesDir });
	const server = BunServe({
		...props,
		// routes: router.routes.getAll(),
		// ! WORK ON ROUTER AND TS SUPPORT
		async fetch(req, server) {
			// server.timeout(req, 60)
			const ip = server.requestIP(req);

			const url = new URL(req.url);
			const path = url.pathname;

			// 	const files = router.match(path);
			// 	if (!files) return new Response('Not Found', { status: 404 });

			// 	const layouts = files.filter((file) => file.type === 'layout');
			// 	const page = files.filter((file) => file.type === 'page')[0];
			// 	console.log({ layouts, page });

			// 	const indexFile = file(IndexHtml.index);
			// 	const contents = await indexFile.bytes();

			// TODO: Execute files sequentially and share outputs. AstroJS + NextJS

			const GLOBAL_CONFIG = {
				ssr: true,
			};

			const PAGE_CONFIG = {
				ssr: true,
			};

			// TODO: Implement SPA/MPA.
			const implementSsr = PAGE_CONFIG.ssr ?? GLOBAL_CONFIG.ssr;
			const isCrawler = true; // ... depends on your bot detection strategy ...

			const BaseHtml = file(IndexHtml.index);
			const html = await BaseHtml.text();
			// const stream = await renderToReadableStream(jsx, {
			// 	// TODO: Use all options
			// 	// signal: controller.signal,
			// });
			const stream = await renderToString(jsx);
			// if (isCrawler || implementSsr) await stream.allReady;
			const ssr_html = html
				.replace('<!--ssr-outlet-->', stream.toString())
				.replace(
					'<!--ssr-head -->',
					'<script type="module" src="./entry-client.tsx" />',
					// TODO: Replace this with generated assets.
				);
			// TODO: replace `ssr-head` `ssr-assets`

			const result = await Bun.build({
				// entrypoints: ['../../src/pages/layout.tsx'],
				entrypoints: ['blunt/serve/constants/index.html'],
				outdir: './build',
				// banner: "use client"
				// define: {}
				// env
				minify: false,
				splitting: false,
			});
			console.log(result.outputs);

			return new Response(ssr_html, {
				status: 200,
				headers: { 'Content-Type': 'text/html' },
			});
			// twind
			//   routes: {
			//     "/api/posts": {
			//       // Different handlers per method
			//       GET: () => new Response("List posts"),
			//       POST: async req => {
			//         const post = await req.json();
			//         return Response.json({ id: crypto.randomUUID(), ...post });
			//       },
			//       PUT: async req => {
			//         const updates = await req.json();
			//         return Response.json({ updated: true, ...updates });
			//       },
			//       DELETE: () => new Response(null, { status: 204 }),
			//     },
			//   },
		},
		// routes: {
		// 	'/*': IndexHtml,
		// },
		async error(error) {
			console.error('Server error:', error);
			return new Response(`Internal Server Error: ${error.message}`, {
				status: 500,
				headers: { 'Content-Type': 'text/html' },
			});
		},
	});

	console.log(color('hotpink', 'ansi'));
	console.log('Blunt v1.2.3 | Bun v1.1.19');
	console.log(color('gray', 'ansi'));
	console.log('Server Starting. Server Started in 100ms.'); // TODO: Show time required to build the router and start the server
	console.log('Local Network  : ', server.url.href);
	console.log('Public Network : ', 'use --host to expose');
	// console.log('Public Network : ', server.url.href); // use --host to expose
	console.log('Environments   : ', '.env, .env.prod');

	console.log(color('white', 'ansi'));
	const RootLayout = router.files.match('/layout.tsx');
	if (!RootLayout) {
		console.log('RootLayout is not present in the routes directory');
	}
	const NotFound = router.files.match('/not-found.tsx');
	if (!NotFound) {
		console.log('NotFound is not present in the routes directory');
	}

	// TODO: Server console.log() support

	return server;

	// await server.stop();
	// await server.reload({ options })
}

// Store routes in HMR data to persist between updates
// const HMR_STATE = import.meta.hot?.data.HMR_STATE ?? {
// 	routesDir: '',
// 	router: null,
// 	server: null,
// };

// Store state for HMR
// import.meta.hot.data.HMR_STATE = { routesDir, router, server };

// Total refresh on change of `blunt.config.ts`, `.env`
