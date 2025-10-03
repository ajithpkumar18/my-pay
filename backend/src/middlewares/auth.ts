import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers["token"];

	console.log("Auth middleware");
	try {
		console.log("trying");

		if (token) {
			console.log("there is a token", token);

			const valid = jwt.verify(token as string, "qwertyy122");
			console.log("valid", valid);
			req.headers["username"] = (valid as any).username as string;
			req.headers["id"] = (valid as any).id;
			next();
			return;
		}
	} catch (err) {
		console.log(err);
	}
	res.status(400).json({ message: "Invalid token" });
	return;
};
