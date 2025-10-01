import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
	console.log("hi");
	return;
});

app.use("/api/auth", router);

app.listen(3000, async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/");
	} catch (err) {
		console.log(err);
	}
	console.log("server");
});
