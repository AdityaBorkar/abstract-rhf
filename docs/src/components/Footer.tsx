import Link from "next/link";

export default function Footer({ editLink }: { editLink: string }) {
	return (
		<div className='flex flex-row justify-between gap-2 border-border border-t-0 text-sm'>
			<Link
				target="_blank"
				href="https://adityaborkar.com"
				className='py-2 text-muted-foreground hover:text-pink-700'
			>
				Made with 💗 by Aditya Borkar
			</Link>
			<Link
				target="_blank"
				href={editLink}
				className='py-2 text-muted-foreground hover:text-pink-700'
			>
				Edit this page on GitHub
			</Link>
		</div>
	);
}
