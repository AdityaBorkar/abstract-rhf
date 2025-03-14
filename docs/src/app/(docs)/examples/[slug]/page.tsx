import { readdirSync } from "node:fs";
import { join } from "node:path";
import { PiCaretRight } from "react-icons/pi";
import { SiCodesandbox, SiGithub, SiStackblitz } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import Link from "next/link";

import { examples } from "@/lib/navigation";
import Footer from "@/components/Footer";

const ALL_EXAMPLES = examples.flatMap(({ label: groupLabel, items }) =>
	items.map((item) => ({ groupLabel, ...item })),
);

export const dynamicParams = false;
export function generateStaticParams() {
	const fileNames = readdirSync(join(process.cwd(), "src/content/examples"));
	const params = fileNames.map((fileName) => {
		const slug = fileName.slice(0, -4); // Removes ".mdx". Kindly do not use ".md" in content folder.
		return { slug };
	});
	return params;
}

export default async function ExamplesLayout({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	// const { default: Page } = await import(`@/content/examples/${slug}.mdx`);

	const itemIndex = ALL_EXAMPLES.findIndex((item) => item.href === `/${slug}`);
	const item = ALL_EXAMPLES[itemIndex];

	const breadcrumbItems = [item?.groupLabel, item?.label];

	return (
		<div className="relative w-full scrollbar-gutter-stable mx-auto *:px-16">
			<div className="py-8">
				<div className="text-sm text-pink-600 font-medium mb-4">
					{breadcrumbItems.map((item) => (
						<span key={item}>
							{item}
							<PiCaretRight className="inline-block mx-1 -mt-0.5" />
						</span>
					))}
				</div>
				<div className="text-2xl font-medium mb-4">Heading</div>
				<div className="flex flex-row gap-2 items-center">
					<CodeLink href="https://github.com/AdityaBorkar/abstract-rhf">
						<SiGithub className="inline-block size-4 -mt-1 mr-1.5" />
						GitHub
					</CodeLink>
					<CodeLink href="https://github.com/AdityaBorkar/abstract-rhf">
						<VscVscode className="inline-block size-4.5 -mt-0.5 mr-1" />
						VS Code
					</CodeLink>
					<CodeLink href="https://github.com/AdityaBorkar/abstract-rhf">
						<SiCodesandbox className="inline-block size-4 -mt-1 mr-1.5" />
						CodeSandbox
					</CodeLink>
					<CodeLink href="https://github.com/AdityaBorkar/abstract-rhf">
						<SiStackblitz className="inline-block size-4 -mt-1 mr-1" />
						StackBlitz
					</CodeLink>
				</div>
			</div>
			<div className="grid grid-cols-3 border-b border-gray-200 pb-8">
				<div className="text-sm col-span-2">
					CODE file structure + code snippets
				</div>
				<div className="text-sm">Code Output</div>
			</div>
			<Footer
				editLink={`https://github.com/AdityaBorkar/abstract-rhf/edit/main/docs/src/content/examples/${slug}.mdx`}
			/>
		</div>
	);
}

function CodeLink({
	href,
	children,
}: { href: string; children: React.ReactNode }) {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="py-1.5 px-2 text-xs rounded-md cursor-alias font-medium bg-black text-white"
		>
			{children}
		</Link>
	);
}
