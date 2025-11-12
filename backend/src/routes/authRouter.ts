import express, { type Request, type Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../utils/jwt.js";
import { userRepo } from "../repos/userRepo.js";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).send({ error: "missing credential" });

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) return res.status(401).send({ error: "invalid google token" });

    const email = payload.email;
    const username = payload.name;

    if (!email || !username) return res.status(400).send({ error: "missing details" });

    let user = await userRepo.findUser({ email });
    if (!user) {
      user = await userRepo.createUser({
        email,
        username,
        password_hash: "",
        role: "user",
        created_at: new Date(),
        provider: "google",
      });
    }

    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: user.role,
    });

    res.send({ token });
  } catch {
    res.status(500).send({ error: "google authentication failed" });
  }
});

export default router;
