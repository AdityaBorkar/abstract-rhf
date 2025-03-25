import type { Server, SocketAddress } from 'bun';
import type { BluntGlobalConfig, FileMetadata } from '#/blunt/types';

export async function CompileRoute({
	GLOBAL_CONFIG,
	request,
	server,
	files,
}: {
	GLOBAL_CONFIG: BluntGlobalConfig;
	request: {
		req: Request;
		ip: SocketAddress | null;
		path: string;
		isCrawler: boolean | undefined;
	};
	server: Server;
	files: FileMetadata[];
}) {
	const RouteFile = files.find((file) => file.type === 'route');
	if (!RouteFile)
		return new Response('[BLUNTJS] Internal Server Error', { status: 500 });

	const Route = await import(`#/src/routes/${RouteFile.path}`);
	return new Response('[BLUNTJS] Internal Server Error', { status: 500 });
}
