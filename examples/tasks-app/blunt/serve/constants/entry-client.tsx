import { createRoot, hydrateRoot } from 'react-dom/client';

import { jsx } from '../builder/jsx';

function start() {
	const element = document.getElementById('root');
	if (!element) return;

	// window.implementSsr = true;
	const implementSsr = true;

	if (implementSsr) {
		hydrateRoot(element, jsx);
	} else {
		const root = createRoot(element);
		root.render(jsx);
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', start);
} else {
	start();
}
