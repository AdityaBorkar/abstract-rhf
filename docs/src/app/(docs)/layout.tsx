'use client';

import type { IconType } from 'react-icons';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PiSun } from 'react-icons/pi';
import { SiGithub, SiJsr, SiNpm, SiX } from 'react-icons/si';

import Search from '@/components/Search';
import {
	GITHUB_STARS,
	JSR_DOWNLOADS,
	NPM_DOWNLOADS,
	PACKAGE_VERSIONS,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import { sections } from '../../lib/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
	const path = usePathname();
	const currentPath = path.split('/').pop();

	const sectionKey = path.split('/')[1];
	const section = sections.find((s) => s.basePath === sectionKey);

	useEffect(() => {
		// TODO: Better Offline Support
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker
				.register('/service-worker.js')
				.catch(console.error);
		}
	}, []);

	return (
		<div
			className={cn(
				'[--header-height:3rem] [--sidebar-width:18rem]',
				'grid h-screen grid-cols-[var(--sidebar-width)_auto] grid-rows-[var(--header-height)_auto] bg-neutral-200/50',
			)}
		>
			<header className="col-span-2 grid grid-cols-3 items-center justify-between border-border border-b">
				<div className="flex w-[var(--sidebar-width)] flex-row items-center px-10">
					<Link href="/" className="text-center font-bold text-lg">
						formzen
					</Link>
					<div className="ml-3 rounded-full bg-pink-700 px-2 py-1 font-semibold text-white text-xs">
						{PACKAGE_VERSIONS[0].label}
					</div>
				</div>

				<Search />

				<div className="flex flex-row items-center justify-end px-8">
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

			<nav className="relative overflow-y-auto border-border border-r-2 pb-8">
				<div className="flex flex-col border-border border-b px-6 py-2">
					{sections.map(({ label, basePath, icon: Icon }) => (
						<Link
							key={label}
							href={`/${basePath}`}
							className="rounded-md px-4 py-2 text-muted-foreground text-sm hover:text-primary"
						>
							<Icon className="-mt-1 mr-2 inline-block size-5" />
							{label}
						</Link>
					))}
				</div>

				<div className="my-2 flex flex-col px-6 text-sm ">
					{section?.items.map(({ items, label }) => {
						return (
							<div
								key={label}
								className={cn(
									'relative flex flex-col',
									'after:absolute after:top-9 after:left-5 after:h-[calc(100%-2.25rem)] after:border-border after:border-l',
								)}
							>
								<div className="mt-2 px-4 py-1 text-neutral-700">{label}</div>
								{items.map(({ href, label }) => (
									<Link
										key={href}
										href={`/${section?.basePath}${href}`}
										className={cn(
											'relative ml-6 rounded-md px-2 py-1 text-muted-foreground hover:bg-pink-100 hover:text-primary',
											`/${currentPath}` === href &&
												'before:-left-1 z-10 text-pink-700 before:absolute before:top-0.5 before:h-6 before:border-pink-600 before:border-r',
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

			<main className="overflow-auto bg-neutral-100">{children}</main>
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
			className="group relative cursor-alias rounded px-1 hover:bg-neutral-200"
		>
			<Icon
				className={cn(
					'size-9 py-2 text-neutral-500 group-hover:text-neutral-900',
					iconClass,
				)}
			/>
			<div className="-bottom-11 -left-[50%] absolute w-fit whitespace-nowrap rounded-full bg-pink-700 px-3 py-1.5 text-sm text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
				{tooltip}
			</div>
		</Link>
	);
}
