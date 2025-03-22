type RouteFiles = {
	type: 'page' | 'layout' | 'middleware' | 'template';
	path: string;
};

type RoutesType = Record<string, RouteFiles[]>;

interface RouterInstance {
	routes: RoutesType;
	// getServer: (options?: { port?: number; development?: boolean }) => Server;
	// match: (path: string) => { handler: RouteFiles; params?: RouteParams } | null;
}
