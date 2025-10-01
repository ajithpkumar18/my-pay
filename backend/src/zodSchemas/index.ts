import z from "zod";

export const signinData = z.object({
	username: z.string().optional(),
	password: z.string().optional(),
	// password: z.string().regex(/^[a-zA-Z0-9]+$/)
});
