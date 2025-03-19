'use client';

import { useState } from 'react';
import { PiCopy } from 'react-icons/pi';

export function CopyButton({ contents }: { contents: string }) {
	const [copied, setCopied] = useState(false);

	// TODO: Sparkle animation effect
	return (
		<button
			type="button"
			aria-label="Copy code"
			onClick={() => {
				navigator.clipboard.writeText(contents);
				setCopied(true);
				setTimeout(() => {
					setCopied(false);
				}, 2000);
			}}
			className="rounded-md border border-border bg-gray-100 px-3 py-1 text-gray-600 transition-colors hover:border-pink-300 hover:bg-pink-100 hover:text-pink-500"
		>
			<PiCopy className="-mt-0.5 inline-block" /> {copied ? 'Copied' : 'Copy'}
		</button>
	);
}
