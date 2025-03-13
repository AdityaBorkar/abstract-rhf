import { readdirSync } from "node:fs";
import { join } from "node:path";
import { PiCaretRight } from "react-icons/pi";

import { docs } from "@/lib/navigation";
import Footer from "@/components/Footer";
import TableOfContents from "@/components/TableOfContents";
import FooterNav from "@/components/FooterNav";

const ALL_DOCS = docs.flatMap(({ label: groupLabel, items }) =>
	items.map((item) => ({ groupLabel, ...item })),
);

export const dynamicParams = false;
export function generateStaticParams() {
	const fileNames = readdirSync(join(process.cwd(), "src/content/docs"));
	const params = fileNames.map((fileName) => {
		const slug = fileName.slice(0, -4); // Removes ".mdx". Kindly do not use ".md" in content folder.
		return { slug };
	});
	return params;
}

export default async function DocumentationLayout({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const { default: Page } = await import(`@/content/docs/${slug}.mdx`);

	const itemIndex = ALL_DOCS.findIndex((item) => item.href === `/${slug}`);
	const item = ALL_DOCS[itemIndex];
	const nextItem = ALL_DOCS[itemIndex + 1];
	const prevItem = ALL_DOCS[itemIndex - 1];

	const breadcrumbItems = [item?.groupLabel, item?.label];

	return (
		<div className="relative grid grid-cols-[44rem_20rem] scrollbar-gutter-stable *:py-8 mx-auto w-fit">
			<div>
				<div className="text-sm text-pink-600 font-medium mb-8">
					{breadcrumbItems.map((item) => (
						<span key={item}>
							{item}
							<PiCaretRight className="inline-block mx-1 -mt-0.5" />
						</span>
					))}
				</div>
				<div className="prose max-w-full w-full min-h-[calc(100vh-var(--header-height))]">
					<Page />
					<FooterNav prevItem={prevItem} nextItem={nextItem} />
				</div>
				<Footer
					editLink={`https://github.com/AdityaBorkar/abstract-rhf/edit/main/docs/src/content/docs/${slug}.mdx`}
				/>
			</div>
			<div className="px-8">
				<div className="sticky top-8 text-sm">
					<TableOfContents />
					{/* <div>SPONSORSHIPS / ADS / PARTNERS</div> */}
				</div>
			</div>
		</div>
	);
}
