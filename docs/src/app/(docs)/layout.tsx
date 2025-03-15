"use client";

import type { IconType } from "react-icons";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SiGithub, SiJsr, SiNpm, SiX } from "react-icons/si";
import { PiSun } from "react-icons/pi";

import Search from "@/components/Search";
import { sections } from "../../lib/navigation";
import { cn } from "@/lib/utils";
import {
	GITHUB_STARS,
	NPM_DOWNLOADS,
	JSR_DOWNLOADS,
	PACKAGE_VERSIONS,
} from "@/lib/constants";

export default function Layout({ children }: { children: React.ReactNode }) {
	const path = usePathname();
	const currentPath = path.split("/").pop();

	const sectionKey = path.split("/")[1];
	const section = sections.find((s) => s.basePath === sectionKey);

	useEffect(() => {
		// TODO: Better Offline Support
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/service-worker.js")
				.catch(console.error);
		}
	}, []);

	return (
		<div
			className={cn(
				"[--sidebar-width:18rem] [--header-height:3rem]",
				"grid grid-cols-[var(--sidebar-width)_auto] grid-rows-[var(--header-height)_auto] h-screen bg-neutral-200/50",
			)}
		>
			<header className="col-span-2 items-center grid grid-cols-3 border-b border-border justify-between">
				<div className="flex flex-row items-center px-10 w-[var(--sidebar-width)]">
					<Link href="/" className="text-lg font-bold text-center">
						formzen
					</Link>
					<div className="text-xs ml-3 py-1 px-2 rounded-full bg-pink-700 font-semibold text-white">
						{PACKAGE_VERSIONS[0].label}
					</div>
				</div>

				<Search />

				<div className="items-center justify-end px-8  flex flex-row">
					<SocialLink
						href="https://github.com/AdityaBorkar/formzen"
						icon={SiGithub}
						tooltip={`${GITHUB_STARS}+ stars`}
					/>
					<SocialLink
						href="https://www.npmjs.com/package/formzen"
						icon={SiNpm}
						tooltip={`${NPM_DOWNLOADS}+ downloads`}
					/>
					<SocialLink
						href="https://jsr.dev/formzen"
						icon={SiJsr}
						tooltip={`${JSR_DOWNLOADS}+ downloads`}
						iconClass="py-1"
					/>
					<SocialLink
						href="https://x.com/adityab_tech"
						icon={SiX}
						tooltip="Follow for Updates!"
					/>
					<button type="button" className="ml-4">
						<PiSun className="size-9 py-2" />
					</button>
				</div>
			</header>

			<nav className="relative border-r-2 pb-8 overflow-y-auto border-border">
				<div className="flex flex-col py-2 px-6 border-b border-border">
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

				<div className="flex flex-col px-6 my-2 text-sm ">
					{section?.items.map(({ items, label }) => {
						return (
							<div
								key={label}
								className={cn(
									"flex flex-col relative",
									"after:h-[calc(100%-2.25rem)] after:border-l after:border-border after:absolute after:left-5 after:top-9",
								)}
							>
								<div className="text-neutral-700 mt-2 px-4 py-1">{label}</div>
								{items.map(({ href, label }) => (
									<Link
										key={href}
										href={`/${section?.basePath}${href}`}
										className={cn(
											"ml-6 py-1 px-2 rounded-md text-muted-foreground hover:bg-pink-100 hover:text-primary relative",
											`/${currentPath}` === href &&
												"text-pink-700 before:content-[''] before:absolute before:-left-1 z-10 before:top-0.5 before:border-r before:border-pink-600 before:h-6",
										)}
									>
										{label}
									</Link>
								))}
							</div>
						);
					})}
				</div>
			</nav>

			<main className="bg-neutral-100 overflow-auto">{children}</main>
		</div>
	);
}

function SocialLink({
	href,
	icon: Icon,
	iconClass,
	tooltip,
}: { href: string; icon: IconType; iconClass?: string; tooltip: string }) {
	return (
		<Link
			target="_blank"
			href={href}
			className="group relative hover:bg-neutral-200 rounded cursor-alias px-1"
		>
			<Icon
				className={cn(
					"text-neutral-500 group-hover:text-neutral-900 size-9 py-2",
					iconClass,
				)}
			/>
			<div className="absolute whitespace-nowrap -bottom-11 -left-[50%] w-fit py-1.5 px-3 rounded-full bg-pink-700 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
				{tooltip}
			</div>
		</Link>
	);
}
