import express from "express";
import { Accounts, User } from "../db/schema.js";
import { signinData } from "../zodSchemas/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middlewares/auth.js";

export const router = express.Router();

router.post("/signup", async (req, res) => {
	console.log("request came");

	const data = req.body;
	console.log(data);
	const creds = signinData.safeParse({
		username: data.username,
		password: data.password,
		firstName: data.firstName,
		lastName: data.lastName,
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

		const newuser = await User.create({
			username: creds.data.username,
			password: password,
			firstName: creds.data.firstName,
			lastName: creds.data.lastName,
		});

		const userId = newuser._id;

		await Accounts.create({
			userId,
			balance: 1 * Math.random() * 1000,
		});
		res.status(300).json({ message: "Signup Sucessfull" });
		return;
	}

	res.status(300).json({ message: "Incorrect input" });
	return;
});

router.post("/signin", async (req, res) => {
	const data = req.body;
	const { success } = signinData.safeParse({
		username: data.username,
		password: data.password,
	});

	if (success) {
		const user = await User.findOne({ username: data.username });
		if (!user) {
			return;
		}
		console.log(user.password, data.password);

		const isUser = bcrypt.compareSync(
			data.password as string,
			user.password as string
		);
		console.log(isUser);
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
	const { username, password, firstName, lastName } = req.body;
	const name = req.headers["username"];
	const { success } = signinData.safeParse({
		username,
		password,
		firstName,
		lastName,
	});

	if (success) {
		const user = await User.findOne({ username: username });
		if (!user) {
			res.status(409).json({ message: "No such user to update" });
			return;
		}

		const pass = bcrypt.hashSync(password as string, 3);
		await User.updateOne(
			{ username: username },
			{
				username,
				password: pass,
				firstName,
				lastName,
			}
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

router.get("/bulk", authMiddleware, async (req, res) => {
	const filter = req.query.filter;
	try {
		const users = await User.find({
			$or: [
				{
					username: {
						$regex: filter,
					},
				},
			],
		});

		res.json({
			user: users.map((user: any) => ({
				username: user.username,
				_id: user._id,
			})),
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Encountered error" });
		return;
	}
	res.status(400).json({ message: "No users found" });
});

export default router;
