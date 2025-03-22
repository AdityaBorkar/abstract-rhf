import { serve } from 'blunt';

const server = await serve({
	routesDir: './src/pages',
	port: 3001,
	// hostname: 'adityab.com',
	// keyFile: 'auto-generate',
	// certFile: 'auto-generate',
	development: process.env.NODE_ENV !== 'production',
});

console.log('Server Started: ', server.url.href);

// tunnel: {
// 	enabled: true,
// 	subdomain: 'tasks',
// },
// keyFile: process.env.SSL_KEY_FILE || './key.pem',
// certFile: process.env.SSL_CERTIFICATE_FILE || './cert.pem',
