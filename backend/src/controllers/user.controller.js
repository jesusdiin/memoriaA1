import { getTopScores, saveScore } from "../services/user.service.js";
import jwt from "jsonwebtoken";

export const getScores = async (req, res) => {
	const scores = await getTopScores();
	res.json(scores);
};

export const postScore = async (req, res) => {
	console.log("Recibiendo score:", req.body);
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(401).json({ error: "Token faltante" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { tiempo } = req.body;
		const score = await saveScore(decoded.id, tiempo);
		res.json(score);
	} catch (err) {
		res.status(401).json({ error: "Token inválido" });
	}
};
