import { z } from "zod";

export const simpleSchema = z.object({
	endpoint: z.string().url().describe("Endpoint URL"),
	method: z.enum(["GET", "POST", "PUT", "DELETE"]).describe("HTTP Method"),
});
