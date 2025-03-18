import { readdirSync } from "node:fs";
import { join } from "node:path";
import { PiCaretRight, PiCode } from "react-icons/pi";
import { SiCodesandbox, SiGithub } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import Link from "next/link";

import { examples } from "@/lib/navigation";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import CodeExample from "@/components/CodeExample";

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
		<div className='scrollbar-gutter-stable relative mx-auto w-full *:px-16'>
			<div className="py-8">
				<div className='mb-4 font-medium text-pink-600 text-sm'>
					{breadcrumbItems.map((item) => (
						<span key={item}>
							{item}
							<PiCaretRight className='-mt-0.5 mx-1 inline-block' />
						</span>
					))}
				</div>
				<div className='mb-4 font-medium text-2xl'>Heading</div>
				<div className='flex flex-row items-center gap-2'>
					<CodeLink
						href="https://github.com/AdityaBorkar/formzen"
						className="bg-pink-700"
					>
						<PiCode className='-mt-1 mr-1 inline-block size-4' />
						Source Code
					</CodeLink>
					<CodeLink href="https://vscode.dev" className="bg-[#0078d4]">
						<VscVscode className='-mt-0.5 mr-1 inline-block size-4.5' />
						VS Code
					</CodeLink>
					<CodeLink
						href="https://github.com/AdityaBorkar/formzen"
						className="bg-gray-800"
					>
						<SiGithub className='-mt-1 mr-1.5 inline-block size-4' />
						GitHub Codespaces
					</CodeLink>
					{
						// ! Blocked by https://github.com/oven-sh/bun/issues/18255
					}
					<CodeLink href="https://github.com/AdityaBorkar/formzen">
						<SiCodesandbox className='-mt-1 mr-1.5 inline-block size-4' />
						CodeSandbox
					</CodeLink>
					{/*
					// ! StackBlitz uses Node.js in the browser, hence not compatible with our Bun Examples.
					<CodeLink href="https://github.com/AdityaBorkar/formzen">
						<SiStackblitz className="inline-block size-4 -mt-1 mr-1" />
						StackBlitz
					</CodeLink>
					*/}
				</div>
			</div>
			<div className="py-4">
				<CodeExample />
			</div>
			<div className='mt-8 border-gray-200 border-b' />
			<Footer
				editLink={`https://github.com/AdityaBorkar/formzen/edit/main/docs/src/content/examples/${slug}.mdx`}
			/>
		</div>
	);
}

function CodeLink({
	href,
	children,
	className,
}: { href: string; children: React.ReactNode; className?: string }) {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				'hover:-translate-y-0.5 cursor-alias rounded-md bg-black px-2 py-1.5 font-medium text-white text-xs transition-all',
				className,
			)}
		>
			{children}
		</Link>
	);
}
