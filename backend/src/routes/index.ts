import express from "express";
import { User } from "../db/userSchema.js";
import { signinData } from "../zodSchemas/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middlewares/auth.js";

export const router = express.Router();

router.post("/signup", async (req, res) => {
	console.log("request came");

	const data = req.body;
	const creds = signinData.safeParse({
		username: data.username,
		password: data.password,
	});

	if (creds.success) {
		const password = bcrypt.hashSync(data.password, 3);
		const user = await User.findOne({ username: creds.data.username });
		console.log(user);

		if (user) {
			console.log("user exists");

			res.status(409).json({ message: "User already exists" });
			console.log("res send");

			return;
		}

		await User.create({
			username: creds.data.username,
			password: password,
		});

		res.status(300).json({ message: "Signup Sucessfull" });
		return;
	}

	res.status(300).json({ message: "Incorrect input" });
	return;
});

router.post("/signin", async (req, res) => {
	const data = req.body;
	const creds = signinData.safeParse({
		username: data.username,
		password: data.password,
	});

	if (creds.success) {
		const user = await User.findOne({ username: creds.data.username });
		if (!user) {
			return;
		}
		const isUser = bcrypt.compareSync(
			creds.data.password as string,
			user.password as string
		);
		if (isUser) {
			const token = await jwt.sign(
				{ id: user._id, username: user.username },
				"qwertyy122"
			);
			res.status(200).json({
				message: "Sign in succesfull",
				token: token,
			});
			return;
		}

		res.status(300).json({ message: "Incorrect Credentials" });
	}
});

router.patch("/update", authMiddleware, async (req, res) => {
	const data = req.body;
	const username = req.headers["username"];
	const creds = signinData.safeParse({
		username: data.username,
		password: data.password,
	});

	if (creds.success) {
		const user = await User.findOne({ username: username });
		if (!user) {
			res.status(409).json({ message: "No such user to update" });
			return;
		}
		if (creds.data.password) {
			const isUser = bcrypt.compareSync(
				creds.data.password as string,
				user.password as string
			);
			if (isUser) {
				res.status(200).json({
					message: "password is same",
				});
				return;
			}
		}

		if (creds.data.username && username == creds.data.username) {
			res.status(400).json({
				message: "Name is same",
			});
			return;
		}

		const pass = bcrypt.hashSync(creds.data.password as string, 3);
		await User.updateOne(
			{ username: username },
			{ username: creds.data.username, password: pass }
		);

		res.status(200).json({ message: "Updated" });
		return;
	} else {
		res.status(400).json({
			message: "Invalid input",
		});
		return;
	}
});

export default router;
