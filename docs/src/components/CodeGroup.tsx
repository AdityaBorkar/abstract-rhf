// "use client";

// import { Children, createElement, useState } from "react";

// export default function CodeGroup({ children }: { children: React.ReactNode }) {
//     const names -
// 	const snippets = Children.map(children, (child) => {\

// 		if (typeof child !== "object") return child;
// 		const { name, children } = child?.props;
//         // TODO: Introduce some kind of type-safety / checks
// 		// if (!name) {
// 		// 	console.log({ child });
// 		// 	throw new Error("CodeSnippet must have a name prop");
// 		// }
// 		if (!name) return null;
// 		return {
// 			name,
// 			jsx: createElement(child?.type, { key: name, children }),
// 		};
// 	});

// 	const [index, setIndex] = useState(0);

// 	return (
// 		<div className="flex flex-col gap-4">
// 			<div>
// 				{snippets.map((snippet, i) => (
// 					<button key={snippet.name}>{snippet.name}</button>
// 				))}
// 			</div>
// 			<div>{snippets[index].jsx}</div>
// 		</div>
// 	);
// }
