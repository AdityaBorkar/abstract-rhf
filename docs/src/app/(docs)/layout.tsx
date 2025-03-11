"use client";

import Link from "next/link";
import { SiGithub, SiJsr, SiNpm } from "react-icons/si";

import Search from "@/components/Search";
import { sections } from "./navigation";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
	const path = usePathname();
	const sectionKey = path.split("/")[1];
	const section = sections.find((s) => s.basePath === sectionKey);
	console.log({ section, sectionKey });
	// Choose your tools
	// Create Schema
	// Register Fields
	// Reset and Submit Button
	return (
		<div className="grid grid-cols-[16rem_auto] min-h-screen">
			<nav className="relative bg-background/80 px-4 border-r-2 border-border backdrop-blur-sm">
				<div className="text-center mx-auto py-2 mb-4">
					<Link href="/" className="text-lg font-bold">
						abstract-rhf (canary)
					</Link>
					<div className="justify-center items-center text-neutral-500 flex flex-row gap-1">
						<Link
							target="_blank"
							href="https://github.com/AdityaBorkar/abstract-rhf"
							className="hover:bg-neutral-200 rounded cursor-alias"
						>
							<SiGithub className="size-9 py-2" />
						</Link>
						<Link
							target="_blank"
							href="https://www.npmjs.com/package/abstract-rhf"
							className="hover:bg-neutral-200 rounded cursor-alias"
						>
							<SiNpm className="size-9 py-2" />
						</Link>
						<Link
							target="_blank"
							href="https://jsr.dev/abstract-rhf"
							className="hover:bg-neutral-200 rounded cursor-alias"
						>
							<SiJsr className="size-9 py-1" />
						</Link>
						{/* (theme) */}
					</div>
				</div>

				<Search />

				<div className="flex flex-col py-4 border-b border-border">
					{sections.map(({ label, basePath, icon: Icon }) => (
						<Link
							key={label}
							href={`/${basePath}`}
							className="text-sm py-2 px-4 rounded-md bg-accent text-muted-foreground hover:text-primary"
						>
							<Icon className="mr-2 size-5 -mt-1 inline-block" />
							{label}
						</Link>
					))}
				</div>

				<div className="flex flex-col my-4">
					{section?.items.map(({ href, label }) => (
						<Link
							key={href}
							href={`${section?.basePath}/${href}`}
							className="text-sm py-1 px-4 rounded-md bg-accent text-muted-foreground hover:text-primary"
						>
							{label}
						</Link>
					))}
				</div>

				<div className="absolute bottom-0 left-0 py-2 right-0 w-full">
					<Link
						href="/ai-form-builder"
						className="text-sm text-center w-full block py-2 px-4 rounded-md bg-accent text-muted-foreground hover:text-primary"
					>
						AI Form Builder
					</Link>
				</div>
			</nav>
			<main className="flex-1 container px-16 py-4">{children}</main>
		</div>
	);
}

// How to use random button
// How to use AI button
