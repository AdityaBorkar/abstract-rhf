import Link from "next/link";

export default function FooterNav({
	prevItem,
	nextItem,
}: {
	prevItem: { href: string; label: string };
	nextItem: { href: string; label: string };
}) {
	return (
		<div className="mt-16 border-t border-border py-4 flex flex-row justify-between">
			{prevItem ? (
				<Link
					href={`/docs${prevItem.href}`}
					className="max-w-56 no-underline w-full hover:border-pink-500 hover:bg-pink-100/50 transition-colors border border-border rounded-md py-3 px-4 "
				>
					<div className="text-xs font-normal text-neutral-500">
						{/* Arrow appearing animation */}
						Previous Page
					</div>
					<div className="text-sm font-medium pt-0.5 truncate text-pink-700">
						{prevItem?.label}
					</div>
				</Link>
			) : (
				<div />
			)}
			{nextItem ? (
				<Link
					href={`/docs${nextItem.href}`}
					className="max-w-56 no-underline w-full hover:border-pink-500 hover:bg-pink-100/50 transition-colors border border-border rounded-md py-3 px-4 text-right"
				>
					<div className="text-xs font-normal text-neutral-500">
						{/* Arrow appearing animation */}
						Next Page
					</div>
					<div className="text-sm font-medium pt-0.5 truncate text-pink-700">
						{nextItem?.label}
					</div>
				</Link>
			) : (
				<div />
			)}
		</div>
	);
}
