import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { PrismaClient } from "./../generated/prisma/index.js";
import { getTopScores, saveScore } from "../services/user.service.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/facebook", passport.authenticate("facebook"));

router.get(
	"/facebook/callback",
	passport.authenticate("facebook", {
		session: false,
		failureRedirect: "/",
	}),
	(req, res) => {
		const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

		res.redirect(`http://localhost:5500/index.html?token=${token}`);
	}	
);

router.get("/me", async (req, res) => {
	const token = req.headers.authorization?.split(" ")[1];
	
	if (!token) return res.status(401).json({ error: "No autorizado" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await prisma.user.findUnique({
		where: { id: decoded.id },
		select: {
			id: true,
			name: true,
			photo: true,
			profileUrl: true,
		},
	});

		res.json(user);
	} catch (err) {
	res.status(401).json({ error: "Token inválido" });
	}
});

export default router;
