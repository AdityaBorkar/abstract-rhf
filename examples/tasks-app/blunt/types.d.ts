type FileMetadata = {
	type: 'page' | 'layout' | 'middleware' | 'template';
	path: string;
};

type Files = {
	[key: string]: FileMetadata;
	match: (path: string) => FileMetadata[] | null;
};

type Routes = {
	[key: string]: FileMetadata[];
	match: (path: string) => FileMetadata[] | null;
	getAll: () => { path: string; files: FileMetadata[] }[];
};

interface RouterInstance {
	files: Files;
	routes: Routes;
}
