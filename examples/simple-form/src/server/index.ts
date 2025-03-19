import { serve } from "bun";
import index from "./index.html";

const server = serve({
	routes: {
		// Serve index.html for all unmatched routes.
		"/*": index,

		// API Routes
		"/api/submission": {
			async GET(req) {
				return Response.json({
					message: "Hello, world!",
					method: "GET",
				});
			},
			async PUT(req) {
				return Response.json({
					message: "Hello, world!",
					method: "PUT",
				});
			},
		},
	},

	development: process.env.NODE_ENV !== "production",
	port: 3001,
});

console.log(`🚀 Server running at ${server.url}`);
