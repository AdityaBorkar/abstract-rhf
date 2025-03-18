'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function CodeExample() {
	const [activeTab, setActiveTab] = useState(1);
	const tabs = ['hook.tsx', 'form.tsx', 'schema.ts', 'action.ts'];

	return (
		<div className="grid grid-cols-3 divide-x divide-border rounded-lg border border-border bg-white">
			<div className="col-span-2 text-sm">
				<div>
					<div className="relative flex flex-row border-border border-b p-1 font-medium text-xs">
						{tabs.map((tab) => (
							<button
								key={tab}
								type="button"
								aria-label={`Switch to ${tab}`}
								onClick={() => setActiveTab(tabs.indexOf(tab))}
								className={cn(
									'relative rounded-md px-3 py-1 font-medium text-sm transition-colors',
									activeTab === tabs.indexOf(tab)
										? 'bg-pink-600 text-white'
										: 'text-gray-500 hover:text-pink-500',
								)}
							>
								{tab}
							</button>
						))}
					</div>
					<div className="p-4">
						<div className="font-mono text-sm">
							{/* Code content will go here */}
							<div className="text-gray-700">{/* Your code here */}</div>
						</div>
					</div>
					<div className="absolute top-2 right-2">
						<button
							type="button"
							aria-label="Copy code"
							className="p-2 text-gray-500 transition-colors hover:text-pink-500"
						>
							<svg
								className="h-5 w-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 5H6a2 2 0 00-2 2v11a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-center bg-gray-50 text-sm">
				<div className="p-4 text-gray-700">Code Output</div>
			</div>
		</div>
	);
}
