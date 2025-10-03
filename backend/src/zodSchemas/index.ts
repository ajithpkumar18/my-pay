import z from "zod";

export const signinData = z.object({
	username: z.string().min(3).max(30).optional(),
	password: z.string().min(3).max(30).optional(),
	firstName: z.string().min(3).max(50).optional(),
	lastName: z.string().min(3).max(50).optional(),
	// password: z.string().regex(/^[a-zA-Z0-9]+$/)
});
