http://github.com/oven-sh/bun/issues/17490
https://github.com/oven-sh/bun/issues/17521
https://github.com/oven-sh/bun/issues/17490
https://github.com/oven-sh/bun/issues/5822

https://github.com/oven-sh/bun/issues/14324
https://github.com/oven-sh/bun/issues/14763

Advantages - Ultra-fast refresh, no lock-in, easy-routing
All of next.js features without the hell of Vercel.
This is the first preview of the lite-framework for Bun. We shall only work with Bun. We request for your feedback to build for developers.
This might be the best framework for indie hackers and side projects.
Performance equivalent to GoLang / Rust. Make a test using Anton YouTube, once it's feature complete.

Compare with:
- AstroJS
- NextJS
- Remix
- Hono.js
- https://mantou.gitbook.io/docs
- Elysia.js

Get yourself listed at https://github.com/SaltyAom/bun-http-framework-benchmark

Serve index.html for all unmatched routes.
.md and .mdx support out-of-box support with remark and rehype.
middleware, layout, template, page, loading, not-found, error, default, instrumentation
[dynamic], [...dynamic-catch-all], [[...dynamic-catch-all-optional]]
(folder-ignore-routing-folder)
_folder-ignore-routing-path
Metadata?
This pattern can be used anywhere:
favicon.ico.ts -> favicon.ico
robots.txt.ts -> robots.txt
sitemap.xml.ts -> sitemap.xml
SSG? SSR?
i18n support built-in
.gaurd() -> validations and auth like services
Resserve: _static, _actions
Inbuilt-TRPC and next-safe-actions like router for API routes with Server Actions
ssr and rsc
https://github.com/graphql-hive/graphql-yoga
https://github.com/ardatan/graphql-mesh
A type-safe approach to context (inspired by Apollo Server's context)
File Serving (with content-type selection, caching headers, ETag, etc)
react-scan
million-lint
biome.json
https://github.com/simylein/fluxify

Deploy on:
- Cloudflare using our dashboard. Bring your own keys.
- Anywhere using SST

Blocked By:
- Detect incorrect usages of "use server" and "use client"*
- Warn against usages of "use server" and "use client" when server components are disabled.*


Two Patterns:
1. nextjs-app-router
2. nextjs-pages-router
3. route-name.get.ts, route-name.ws.ts, ...
4. integrate with SST and deploy to Cloudflare.

// TODO: Auto generate api-swagger documentation
// merge() {},
//  {
// 	// Server Actions? -> With a linting rule that actions must start with $
// 	// Support Server Side Rendering?
// 	// API Routes?
// 	'/api/submission': {
// 		async GET(req) {
// 			return Response.json({
// 				message: 'Hello, world!',
// 				method: 'GET',
// 			});
// 		},
// 		async PUT(req) {
// 			return Response.json({
// 				message: 'Hello, world!',
// 				method: 'PUT',
// 			});
// 		},
// 	},
// 	fetch: router,
//         router.match("/settings?foo=bar");

// // =>
// {
//   filePath: "/Users/colinmcd94/Documents/bun/fun/pages/settings.tsx",
//   kind: "dynamic",
//   name: "/settings",
//   pathname: "/settings?foo=bar",
//   src: "https://mydomain.com/_next/static/pages/settings.tsx",
//   query: {
//     foo: "bar"
//   }

// },
