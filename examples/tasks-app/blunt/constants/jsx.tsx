import { Fragment, Profiler, StrictMode } from 'react';

import RootLayout from '#/src/pages/layout'; // !
import App from '#/src/pages/page'; // !

const config = {
	strictMode: true,
	profiler: false,
};

const StrictModeToggle = config.strictMode ? StrictMode : Fragment;
const ProfilerToggle = config.profiler ? Profiler : Fragment;
// Million Lint / React Scan / React DevTools

export const jsx = (
	<StrictModeToggle>
		{/* <ProfilerToggle id="root" onRender={() => {}}> */}
		<RootLayout>
			<App />
		</RootLayout>
		{/* </ProfilerToggle> */}
	</StrictModeToggle>
);
