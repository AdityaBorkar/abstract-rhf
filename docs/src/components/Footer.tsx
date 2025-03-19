import Link from 'next/link';

import { cn } from '@/lib/utils';

export default function Footer({
	editLink,
	className,
}: { editLink: string; className?: string }) {
	return (
		<div
			className={cn(
				'flex flex-row justify-between gap-2 border-border border-t-0 text-sm',
				className,
			)}
		>
			<Link
				target="_blank"
				href="https://adityaborkar.com"
				className="cursor-alias py-2 text-muted-foreground hover:text-pink-700"
			>
				Made with 💗 by Aditya Borkar
			</Link>
			<Link
				target="_blank"
				href={editLink}
				className="cursor-alias py-2 text-muted-foreground hover:text-pink-700"
			>
				Edit this page on GitHub
			</Link>
		</div>
	);
}
