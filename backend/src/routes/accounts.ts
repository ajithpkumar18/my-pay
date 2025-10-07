import express, { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { Accounts } from "../db/schema.js";
import mongoose from "mongoose";

const accRouter = express.Router();

accRouter.get("/balance", authMiddleware, async (req, res) => {
	const id = req.headers["id"];
	console.log(id);

	const username = req.headers["username"];

	try {
		const bal = await Accounts.findOne({ userId: id });
		console.log(bal);

		res.status(200).json({ balance: bal });
		return;
	} catch (err) {
		console.log(err);
	}

	res.status(400).json({ message: "Encountered an error" });
	return;
});

accRouter.post("/transfer", authMiddleware, async (req, res) => {
	const session = await mongoose.startSession();
	const { amount, to } = req.body;
	const id = req.headers["id"];
	session.startTransaction();
	try {
		console.log(id);

		const Acc = await Accounts.findOne({ userId: id }).session(session);
		console.log(Acc);

		if (!Acc || Acc?.balance! < amount) {
			await session.abortTransaction();
			res.status(400).json({ message: "1st have an account" });
			return;
		}
		const toAcc = await Accounts.findOne({ userId: to }).session(session);
		console.log("2nd Account", toAcc);

		if (!toAcc) {
			await session.abortTransaction();
			res.status(400).json({ message: "2nd account" });
			return;
		}

		await Accounts.updateOne(
			{ userId: id },
			{ $inc: { balance: -amount } }
		).session(session);
		await Accounts.updateOne(
			{ userId: to },
			{ $inc: { balance: amount } }
		).session(session);

		await session.commitTransaction();
		res.status(200).json({
			message: "Tranfer Successfull",
		});
		return;
	} catch (err) {
		await session.abortTransaction();
		console.log(err);
		res.status(400).json({
			message: "Tranfer Failed",
		});
		return;
	}
});

export default accRouter;
