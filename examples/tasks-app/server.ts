import { serve } from 'blunt';

await serve({
	routesDir: './src/pages',
	port: 3001,
	// hostname: 'adityab.com',
	// tunnel: {
	// 	enabled: true,
	// 	subdomain: 'tasks',
	// },
	// keyFile: 'auto-generate',
	// keyFile: process.env.SSL_KEY_FILE || './key.pem',
	// certFile: 'auto-generate',
	// certFile: process.env.SSL_CERTIFICATE_FILE || './cert.pem',
	development: process.env.NODE_ENV !== 'production',
});
