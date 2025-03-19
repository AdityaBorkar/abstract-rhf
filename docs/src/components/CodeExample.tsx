'use client';

import { useState } from 'react';
import { PiCode, PiFiles } from 'react-icons/pi';
import { SiCodesandbox, SiGithub } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { CopyButton } from './CopyButton';

export default function Codebox() {
	const [activeTab, setActiveTab] = useState(1);
	const tabs = ['hook.tsx', 'form.tsx', 'schema.ts', 'action.ts'];

	return (
		<div
			className={cn(
				'grid rounded-lg border border-border',
				'grid-rows-[fit-content_1fr] xl:grid-cols-[auto_28rem] xl:grid-rows-1 2xl:grid-cols-[auto_32rem]',
			)}
		>
			<div
				className={cn(
					'flex items-center justify-center border-border text-sm',
					'border-b xl:order-2 xl:border-b-0 xl:border-l',
				)}
			>
				<div className="p-4 text-gray-700">Code Output</div>
			</div>
			<div className={cn('text-sm', 'xl:order-1')}>
				<div>
					<div className=" flex flex-row border-border border-b font-medium text-xs">
						<div className="mr-4 ml-[3px] border-border border-r px-3 py-2">
							<PiFiles className="size-5 text-gray-500" />
						</div>
						{tabs.map((tab) => (
							<button
								key={tab}
								type="button"
								aria-label={`Switch to ${tab}`}
								onClick={() => setActiveTab(tabs.indexOf(tab))}
								className={cn(
									'my-1 rounded-md px-2.5 py-1 font-medium text-sm transition-colors',
									activeTab === tabs.indexOf(tab)
										? 'bg-pink-600 text-white'
										: 'text-gray-500 hover:text-pink-600',
								)}
							>
								{tab}
							</button>
						))}
						<button
							type="button"
							className="my-1 mr-2 ml-auto rounded-md bg-gray-200 px-3 text-gray-500 hover:bg-pink-200 hover:text-pink-700"
						>
							<PiCode className="-mt-0.5 mr-1.5 inline-block size-4" />
							Open With
							{/* TODO: Dropdown with  */}
						</button>

						<div className="flex hidden flex-row flex-wrap items-center gap-2">
							<CodeLink
								href="https://github.com/AdityaBorkar/formzen"
								className="bg-pink-700"
							>
								<PiCode className="-mt-1 mr-1 inline-block size-4" />
								Source Code
							</CodeLink>
							<CodeLink href="https://vscode.dev" className="bg-[#0078d4]">
								<VscVscode className="-mt-0.5 mr-1 inline-block size-4.5" />
								VS Code
							</CodeLink>
							<CodeLink
								href="https://github.com/AdityaBorkar/formzen"
								className="bg-gray-800"
							>
								<SiGithub className="-mt-1 mr-1.5 inline-block size-4" />
								GitHub Codespaces
							</CodeLink>
							{
								// ! Blocked by https://github.com/oven-sh/bun/issues/18255
							}
							<CodeLink href="https://github.com/AdityaBorkar/formzen">
								<SiCodesandbox className="-mt-1 mr-1.5 inline-block size-4" />
								CodeSandbox
							</CodeLink>
							{/*
					// ! StackBlitz uses Node.js in the browser, hence not compatible with our Bun Examples.
					<CodeLink href="https://github.com/AdityaBorkar/formzen">
						<SiStackblitz className="inline-block size-4 -mt-1 mr-1" />
						StackBlitz
					</CodeLink>
					*/}
						</div>
					</div>
					<div className="relative">
						<div className="grid min-h-[40rem] grid-cols-[3rem_auto] gap-2 font-mono text-sm *:py-4">
							{/* Code content will go here */}
							<div className="border-border border-r px-2 text-right text-gray-400">
								1
							</div>
							<div className="text-gray-700">{/* Your code here */}</div>
						</div>
						<div className="absolute top-2 right-2">
							<CopyButton contents="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function CodeLink({
	href,
	children,
	className,
}: { href: string; children: React.ReactNode; className?: string }) {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				'hover:-translate-y-0.5 inline-block cursor-alias rounded-md bg-black px-2 py-1.5 font-medium text-white text-xs transition-all',
				className,
			)}
		>
			{children}
		</Link>
	);
}
