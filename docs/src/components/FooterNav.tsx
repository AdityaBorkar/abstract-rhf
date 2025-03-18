import Link from "next/link";

export default function FooterNav({
	prevItem,
	nextItem,
}: {
	prevItem: { href: string; label: string };
	nextItem: { href: string; label: string };
}) {
	return (
		<div className='mt-16 flex flex-row justify-between border-border border-t py-4'>
			{prevItem ? (
				<Link
					href={`/docs${prevItem.href}`}
					className='w-full max-w-56 rounded-md border border-border px-4 py-3 no-underline transition-colors hover:border-pink-500 hover:bg-pink-100/50 '
				>
					<div className='font-normal text-neutral-500 text-xs'>
						{/* Arrow appearing animation */}
						Previous Page
					</div>
					<div className='truncate pt-0.5 font-medium text-pink-700 text-sm'>
						{prevItem?.label}
					</div>
				</Link>
			) : (
				<div />
			)}
			{nextItem ? (
				<Link
					href={`/docs${nextItem.href}`}
					className='w-full max-w-56 rounded-md border border-border px-4 py-3 text-right no-underline transition-colors hover:border-pink-500 hover:bg-pink-100/50'
				>
					<div className='font-normal text-neutral-500 text-xs'>
						{/* Arrow appearing animation */}
						Next Page
					</div>
					<div className='truncate pt-0.5 font-medium text-pink-700 text-sm'>
						{nextItem?.label}
					</div>
				</Link>
			) : (
				<div />
			)}
		</div>
	);
}
