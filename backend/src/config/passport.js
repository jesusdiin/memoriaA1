import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { PrismaClient } from "./../generated/prisma/index.js";

const prisma = new PrismaClient();

passport.use(
	new FacebookStrategy(
	{
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: process.env.CALLBACK_URL,
		profileFields: ["id", "displayName", "photos", "profileUrl"],
	},
	async function (accessToken, refreshToken, profile, done) {
		try {
			const existingUser = await prisma.user.findUnique({
				where: { facebookId: profile.id },
			});

			if (existingUser) return done(null, existingUser);

			console.log("Nuevo usuario de Facebook:", profile);
			const profileUrl = `https://facebook.com/${profile.id}`;

			const newUser = await prisma.user.create({
				data: {
					facebookId: profile.id,
					name: profile.displayName,
					photo: profile.photos[0].value,
					profileUrl: profileUrl
				},
			});

			return done(null, newUser);
		} catch (err) {
			return done(err);
		}
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await prisma.user.findUnique({ where: { id } });
	done(null, user);
});
