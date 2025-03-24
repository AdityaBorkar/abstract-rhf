/**
 * Update a specific route when its file changes
 */
async function updateRoute(
	fullPath: string,
	dir: string,
	routes: Routes,
	dynamicRoutes: RouteWithParams[],
) {
	const relativePath = relative(dir, fullPath);
	const filePath = relativePath.slice(
		0,
		relativePath.endsWith('.tsx') ? -4 : -3,
	);
	const pathSegments = filePath.split(/[\/\\]/); // Support both Unix and Windows paths

	// Skip non-route files
	if (!['route', 'page'].includes(pathSegments[pathSegments.length - 1])) {
		return;
	}

	// Create route path (without 'route' or 'page')
	const routePathSegments = pathSegments.slice(0, -1);

	// Check if this is a dynamic route
	const hasDynamicSegments = routePathSegments.some(
		(segment) => segment.startsWith('[') && segment.endsWith(']'),
	);

	// Get module
	const module = await import(fullPath);
	const handler = module.default || module.handler || module.get || module.post;

	if (!handler) {
		throw new Error(`No handler found in ${relativePath}`);
	}

	if (hasDynamicSegments) {
		// Handle dynamic route
		registerDynamicRoute(
			routePathSegments,
			handler,
			routes,
			dynamicRoutes,
			filePath,
		);
	} else {
		// Handle static route
		const routePath = `/${routePathSegments.join('/')}`;
		const normalizedPath = routePath === '/index' ? '/' : routePath;
		routes[normalizedPath] = handler;
	}
}
