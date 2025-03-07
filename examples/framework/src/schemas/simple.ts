import { z } from "zod";

export const simpleSchema = z.object({
	endpoint: z.string().url(),
	// method: z.enum(["GET", "POST", "PUT", "DELETE"]),
});
