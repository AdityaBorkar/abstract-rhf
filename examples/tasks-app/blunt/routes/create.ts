/**
 * Load all routes from the filesystem
 */
async function loadRoutes(
	files: string[],
	dir: string,
	routes: RoutesType,
	dynamicRoutes: RouteWithParams[],
) {
	// Clear existing routes
	for (const key of Object.keys(routes)) {
		delete routes[key];
	}
	dynamicRoutes.length = 0;

	for (const file of files) {
		if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue;

		try {
			await updateRoute(join(dir, file), dir, routes, dynamicRoutes);
		} catch (e) {
			console.error(
				`Failed to load route ${file}: ${e instanceof Error ? e.message : String(e)}`,
			);
		}
	}

	// Add catch-all route if not defined
	if (!routes['/*']) {
		routes['/*'] = async (req: Request) => {
			return new Response('Not Found', { status: 404 });
		};
	}
}

/**
 * Register a dynamic route with parameter extraction
 */
function registerDynamicRoute(
	segments: string[],
	handler: RouteFiles,
	routes: RoutesType,
	dynamicRoutes: RouteWithParams[],
	originalPath: string,
) {
	// Remove existing dynamic route with same path if exists
	const existingRouteIndex = dynamicRoutes.findIndex(
		(r) => r.originalPath === originalPath,
	);
	if (existingRouteIndex !== -1) {
		dynamicRoutes.splice(existingRouteIndex, 1);
	}

	const paramNames: string[] = [];
	const patternSegments = segments.map((segment) => {
		if (segment.startsWith('[') && segment.endsWith(']')) {
			// Catch-all parameter
			if (segment.startsWith('[...') && segment.endsWith(']')) {
				const paramName = segment.slice(4, -1);
				paramNames.push(paramName);
				return '(.*)';
			}

			// Optional catch-all parameter
			if (segment.startsWith('[[...') && segment.endsWith(']]')) {
				const paramName = segment.slice(5, -2);
				paramNames.push(paramName);
				return '(.*)';
			}

			// Regular parameter
			const paramName = segment.slice(1, -1);
			paramNames.push(paramName);
			return '([^/]+)';
		}
		return segment;
	});

	// Create regex pattern
	const pattern = new RegExp(`^/${patternSegments.join('/')}$`);

	// Add to dynamic routes
	dynamicRoutes.push({
		pattern,
		paramNames,
		handler,
		originalPath,
	});
}

/**
 * Create a request handler function for Bun.serve
 */
function createRequestHandler(
	routes: RoutesType,
	dynamicRoutes: RouteWithParams[],
) {
	return async (req: Request) => {
		try {
			const url = new URL(req.url);
			const matchResult = match(url.pathname);

			if (matchResult) {
				return await matchResult.handler(req, matchResult.params);
			}

			// Not found
			return new Response('Not Found', { status: 404 });
		} catch (error) {
			console.error('Error handling request:', error);
			return new Response(
				`Internal Server Error: ${error instanceof Error ? error.message : String(error)}`,
				{
					status: 500,
					headers: { 'Content-Type': 'text/plain' },
				},
			);
		}
	};

	function match(
		path: string,
	): { handler: RouteFiles; params?: RouteParams } | null {
		// First check static routes (faster)
		const normalizedPath =
			path === '/' ? '/' : path.endsWith('/') ? path.slice(0, -1) : path;
		const exactMatch = routes[normalizedPath];
		if (exactMatch) {
			return { handler: exactMatch };
		}

		// Then check dynamic routes
		for (const route of dynamicRoutes) {
			const match = normalizedPath.match(route.pattern);
			if (match) {
				const params: RouteParams = {};
				route.paramNames.forEach((name, i) => {
					params[name] = match[i + 1] || '';
				});
				return { handler: route.handler, params };
			}
		}

		// Check catch-all route
		if (routes['/*']) {
			return { handler: routes['/*'] };
		}

		return null;
	}
}
