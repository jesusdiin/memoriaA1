import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "cookie-session";
import "./config/passport.js";

import authRoutes from "./routes/auth.routes.js";
import { getScores, postScore } from "./controllers/user.controller.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.use(
  session({ secret: "ya_unificalas_magazo", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.get("/scores", getScores);
app.post("/scores", postScore);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
