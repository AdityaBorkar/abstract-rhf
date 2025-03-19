import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { PiCaretRight } from 'react-icons/pi';

import CodeExample from '@/components/CodeExample';
import Footer from '@/components/Footer';
import { examples } from '@/lib/navigation';

const ALL_EXAMPLES = examples.flatMap(({ label: groupLabel, items }) =>
	items.map((item) => ({ groupLabel, ...item })),
);

export const dynamicParams = false;
export function generateStaticParams() {
	const fileNames = readdirSync(join(process.cwd(), 'src/content/examples'));
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
		<div className="scrollbar-gutter-stable relative mx-auto w-full *:px-16">
			<div className="py-8">
				<div className="mb-4 font-medium text-pink-600 text-sm">
					{breadcrumbItems.map((item) => (
						<span key={item}>
							{item}
							<PiCaretRight className="-mt-0.5 mx-1 inline-block" />
						</span>
					))}
				</div>
				<div className="mb-2 font-medium text-2xl">Heading</div>
				<div className="text-base text-gray-500">
					Here comes some small talk with the description. Here you can explain
					what cases this example can be used for.
					<br />
					You must also consider SEO for this description.
					<br />
					Configuration Tags with Icons: Bun, React Hook Form, Zod, shadcn/ui,
					Tailwind CSS
				</div>
			</div>
			<div>
				<CodeExample />
			</div>
			<div className="mt-16 border-gray-200 border-b" />
			<Footer
				editLink={`https://github.com/AdityaBorkar/formzen/edit/main/docs/src/content/examples/${slug}.mdx`}
				className="py-2"
			/>
		</div>
	);
}
