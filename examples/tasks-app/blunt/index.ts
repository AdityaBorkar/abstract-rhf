export * from './serve';

// * Register CLI commands
// dev
// start
// build

// * Explore:
// use() hook works OOTB
// metadata? sitemaps?
// headers, cookies, redirects, middlewares
// React Server Components
// SSR, SSG, ISR, getStaticProps replaced generateStaticSlugs, getServerSideProps, SPA, MPA
// public folder
// manifest.json.ts
// userAgent, earlyHints
// Production Builds - serverless + server
// websockets?
// Automatic route prefetching
// Typesafe JSON-first Search Params state management APIs
// Path and Search Parameter Schema Validation
// Search Param Navigation APIs
// Custom Search Param parser/serializer support
// Search param middleware
// Route matching/loading middleware
// Server Functions / RPCs
// scrollRestoration (opt-in redirect)

// Following things are not yet supported, but PLANNED:
// Image Optimization: https://bun.sh/docs/api/html-rewriter
// Font Optimization: https://bun.sh/docs/api/html-rewriter
// Script Optimization: https://bun.sh/docs/api/html-rewriter
// Streaming, Partial Prerendering
// https://bun.sh/docs/bundler/plugins
// https://bun.sh/docs/api/ffi
// Cache Support. Everything is dynamic by default.
// React Compiler
// Metadata Viewer, Astro-Nextjs Toolbar, Unlighthouse
// Eject functionality

// Following features are NOT PLANNED:
// Parallel and Intercepted Routes
// Draft Mode, Multi-Zone Deployments

// Focus to beat @mapl/web
// Results:
// 1000 routes:
// + @mapl/app: 67ms
// + @mapl/web: 39ms
// 10 routes, 1 middlewares:
// + @mapl/app: 40ms
// + @mapl/web: 2ms

// Bundle size:
// @mapl/app: 14kB
// @mapl/web: 5.8kB
