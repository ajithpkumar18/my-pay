import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";
import mongoose from "mongoose";
import accRouter from "./routes/accounts.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
	console.log("hi");
	return;
});

app.use("/api/auth", router);
app.use("/api/accounts", accRouter);
app.listen(3000, async () => {
	try {
		await mongoose.connect(process.env.URI as string);
	} catch (err) {
		console.log(err);
	}
	console.log("server");
});
