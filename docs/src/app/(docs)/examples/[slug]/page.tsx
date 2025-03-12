import { readdirSync } from "node:fs";
import { join } from "node:path";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const { default: Post } = await import(`@/content/examples/${slug}.mdx`);

	return <Post />;
}

export function generateStaticParams() {
	const fileNames = readdirSync(join(process.cwd(), "src/content/examples"));
	const params = fileNames.map((fileName) => ({
		slug: fileName.slice(0, -4), // Removes ".mdx". Kindly do not use ".md" in content folder.
	}));
	return params;
}

export const dynamicParams = false;

// TODO: Open Graph
// TODO: SEO
