import { Fragment, StrictMode } from 'react';

import RootLayout from '#/src/pages/layout'; // !
import App from '#/src/pages/page'; // !
// import '#/src/pages/index.css';// !

const config = {
	strictMode: true,
};

const StrictModeToggle = config.strictMode ? StrictMode : Fragment;
// Million Lint / React Scan / React DevTools
// <Profiler>?

export const jsx = (
	<StrictModeToggle>
		<RootLayout>
			<App />
		</RootLayout>
	</StrictModeToggle>
);

// <html lang="en">
// 	<head>
// 		<meta charSet="UTF-8" />
// 		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
// 		<title>Tasks App</title>
// 		{/* <link
// 			rel="shortcut icon"
// 			type="image/ico"
// 			href="/src/assets/favicon.ico"
//             /> */}
// 		<link rel="stylesheet" href="tailwindcss" />

// 		<link rel="stylesheet" href="../../src/pages/index.css" />
// 	</head>
//             </html>

// ReactDOM.hydrate(<App />, document.getElementById("root"));
