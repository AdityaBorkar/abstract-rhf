"use client";

import type { IconType } from "react-icons";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SiGithub, SiJsr, SiNpm, SiX } from "react-icons/si";
import { PiSun } from "react-icons/pi";

import Search from "@/components/Search";
import { sections } from "./navigation";
import { cn } from "@/lib/utils";

// TODO: Offline Access

export default function Layout({ children }: { children: React.ReactNode }) {
	const path = usePathname();
	const sectionKey = path.split("/")[1];
	const section = sections.find((s) => s.basePath === sectionKey);

	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/service-worker.js")
				.catch(console.error);
		}
	}, []);

	// TODO: add color theme
	return (
		<div
			className={cn(
				"[--sidebar-width:16rem] [--header-height:3rem]",
				"grid grid-cols-[var(--sidebar-width)_auto] grid-rows-[var(--header-height)_auto] h-screen bg-neutral-200/50",
			)}
		>
			<header className="col-span-2 items-center grid grid-cols-3 border-b border-border justify-between">
				<div className="flex flex-row items-center px-8 w-[var(--sidebar-width)]">
					<Link href="/" className="text-lg font-bold text-center">
						abstract-rhf
					</Link>
					<div className="text-sm ml-4 py-1 px-3 rounded-full bg-muted-foreground text-white">
						v 0.1
					</div>
				</div>

				<Search />

				<div className="items-center justify-end px-8  flex flex-row">
					<SocialLink
						href="https://github.com/AdityaBorkar/abstract-rhf"
						icon={SiGithub}
					/>
					<SocialLink
						href="https://www.npmjs.com/package/abstract-rhf"
						icon={SiNpm}
					/>
					<SocialLink
						href="https://jsr.dev/abstract-rhf"
						icon={SiJsr}
						iconClass="py-1"
					/>
					<SocialLink href="https://x.com/adityab_tech" icon={SiX} />
					<button type="button" className="ml-4">
						<PiSun className="size-9 py-2" />
					</button>
				</div>
			</header>

			<nav className="relative border-r-2 border-border">
				<div className="flex flex-col py-2 px-4 border-b border-border">
					{sections.map(({ label, basePath, icon: Icon }) => (
						<Link
							key={label}
							href={`/${basePath}`}
							className="text-sm py-2 px-4 rounded-md text-muted-foreground hover:text-primary"
						>
							<Icon className="mr-2 size-5 -mt-1 inline-block" />
							{label}
						</Link>
					))}
				</div>

				<div className="flex flex-col px-4 my-2 text-sm ">
					{section?.items.map(({ items, label }) => {
						return (
							<div key={label} className="contents">
								<div className="font-medium text-pink-800 mt-2 px-4 py-1">
									{label}
								</div>
								{items.map(({ href, label }) => (
									<Link
										key={href}
										href={`${section?.basePath}${href}`}
										className="py-1 px-4 rounded-md text-muted-foreground hover:text-primary"
									>
										{label}
									</Link>
								))}
							</div>
						);
					})}
				</div>

				<div className="absolute bottom-0 left-0 py-2 right-0 w-full">
					<Link
						href="/ai-form-builder"
						className="text-sm text-center w-full block py-2 px-4 rounded-md text-muted-foreground hover:text-primary"
					>
						AI Form Builder
					</Link>
				</div>
			</nav>

			<main className="bg-neutral-100 px-16 py-4 overflow-auto">
				{children}
			</main>
		</div>
	);
}

function SocialLink({
	href,
	icon: Icon,
	iconClass,
}: { href: string; icon: IconType; iconClass?: string }) {
	return (
		<Link
			target="_blank"
			href={href}
			className="hover:bg-neutral-200 rounded cursor-alias px-2"
		>
			<Icon
				className={cn(
					"text-neutral-500 hover:text-neutral-900 size-9 py-2",
					iconClass,
				)}
			/>
		</Link>
	);
}
