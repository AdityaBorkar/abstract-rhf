import Link from "next/link";

export default function Footer({ editLink }: { editLink: string }) {
	return (
		<div className="pt-4 text-sm flex flex-row justify-between gap-2 border-t-0 border-border">
			<div className="text-muted-foreground ">
				Made with 💗 by Aditya Borkar
			</div>
			<Link
				target="_blank"
				href={editLink}
				className="text-muted-foreground hover:text-pink-700"
			>
				Edit this page on GitHub
			</Link>
		</div>
	);
}
